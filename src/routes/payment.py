from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.database import db, Booking, Payment
from src.schemas.validation import PaymentSchema
import requests
import os
import time
from datetime import datetime

payment_bp = Blueprint('payment', __name__)

# Midtrans configuration
MIDTRANS_SERVER_KEY = os.environ.get('MIDTRANS_SERVER_KEY')
MIDTRANS_CLIENT_KEY = os.environ.get('MIDTRANS_CLIENT_KEY')
MIDTRANS_IS_PRODUCTION = os.environ.get('MIDTRANS_IS_PRODUCTION', 'false').lower() == 'true'

@payment_bp.route('/create', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        data = request.get_json()
        schema = PaymentSchema()
        validated_data = schema.load(data)
        
        # Get current user
        current_user_id = get_jwt_identity()
        
        # Get booking
        booking = Booking.query.get(validated_data['booking_id'])
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
            
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Create Midtrans transaction
        midtrans_data = {
            'transaction_details': {
                'order_id': f'ORDER-{booking.id}-{int(time.time())}',
                'gross_amount': int(booking.total_price)
            },
            'customer_details': {
                'first_name': booking.user.name,
                'email': booking.user.email,
                'phone': booking.user.phone
            },
            'item_details': [{
                'id': booking.service.id,
                'price': int(booking.service.price_per_hour),
                'quantity': int((booking.end_time - booking.start_time).total_seconds() / 3600),
                'name': booking.service.service_name
            }]
        }
        
        # Call Midtrans API
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Basic {MIDTRANS_SERVER_KEY}'
        }
        
        response = requests.post(
            'https://api.midtrans.com/v1/transactions',
            headers=headers,
            json=midtrans_data
        )
        
        if response.status_code != 201:
            return jsonify({'error': 'Payment gateway error'}), 500
            
        payment_data = response.json()
        
        # Create payment record
        payment = Payment(
            booking_id=booking.id,
            amount=booking.total_price,
            payment_method=validated_data['payment_method'],
            transaction_id=payment_data['transaction_id'],
            status='pending',
            payment_url=payment_data['redirect_url']
        )
        
        db.session.add(payment)
        db.session.commit()
        
        return jsonify({
            'payment_id': payment.id,
            'payment_url': payment.payment_url
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@payment_bp.route('/callback', methods=['POST'])
def payment_callback():
    try:
        data = request.get_json()
        
        # Verify signature
        signature = request.headers.get('X-Signature')
        if not verify_signature(data, signature):
            return jsonify({'error': 'Invalid signature'}), 400
            
        # Update payment status
        payment = Payment.query.filter_by(
            transaction_id=data['transaction_id']
        ).first()
        
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
            
        payment.status = data['transaction_status']
        payment.payment_time = datetime.utcnow()
        
        # Update booking status
        if data['transaction_status'] == 'settlement':
            payment.booking.status = 'confirmed'
        elif data['transaction_status'] in ['expire', 'cancel', 'deny']:
            payment.booking.status = 'cancelled'
            
        db.session.commit()
        
        return jsonify({'status': 'success'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@payment_bp.route('/status/<int:payment_id>', methods=['GET'])
@jwt_required()
def get_payment_status(payment_id):
    try:
        current_user_id = get_jwt_identity()
        payment = Payment.query.get(payment_id)
        
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
            
        if payment.booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        return jsonify(payment.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400 