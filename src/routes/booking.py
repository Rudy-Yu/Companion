from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from src.models.database import db, Booking, CompanionProfile, CompanionService
from src.schemas.validation import BookingSchema, BookingUpdateSchema

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    try:
        data = request.get_json()
        schema = BookingSchema()
        validated_data = schema.load(data)
        
        # Get current user
        current_user_id = get_jwt_identity()
        
        # Check if companion exists
        companion = CompanionProfile.query.get(validated_data['companion_profile_id'])
        if not companion:
            return jsonify({'error': 'Companion not found'}), 404
            
        # Check if service exists
        service = CompanionService.query.get(validated_data['service_id'])
        if not service:
            return jsonify({'error': 'Service not found'}), 404
            
        # Calculate total price
        duration = (validated_data['end_time'] - validated_data['start_time']).total_seconds() / 3600
        total_price = float(service.price_per_hour) * duration
        
        # Create booking
        booking = Booking(
            user_id=current_user_id,
            companion_profile_id=validated_data['companion_profile_id'],
            service_id=validated_data['service_id'],
            start_time=validated_data['start_time'],
            end_time=validated_data['end_time'],
            total_price=total_price,
            notes=validated_data.get('notes')
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify(booking.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@booking_bp.route('', methods=['GET'])
@jwt_required()
def get_bookings():
    try:
        current_user_id = get_jwt_identity()
        bookings = Booking.query.filter_by(user_id=current_user_id).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@booking_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
            
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        return jsonify(booking.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@booking_bp.route('/<int:booking_id>', methods=['PUT'])
@jwt_required()
def update_booking(booking_id):
    try:
        data = request.get_json()
        schema = BookingUpdateSchema()
        validated_data = schema.load(data)
        
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
            
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Update booking
        for key, value in validated_data.items():
            setattr(booking, key, value)
            
        db.session.commit()
        return jsonify(booking.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@booking_bp.route('/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
            
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        if booking.status == 'completed':
            return jsonify({'error': 'Cannot cancel completed booking'}), 400
            
        booking.status = 'cancelled'
        db.session.commit()
        
        return jsonify(booking.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400 