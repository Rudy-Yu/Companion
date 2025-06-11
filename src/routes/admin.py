from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.database import db, User
from src.utils.mock_data import create_mock_data

admin_bp = Blueprint('admin', __name__)

def admin_required(fn):
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
            
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper

@admin_bp.route('/populate-mock-data', methods=['POST'])
@admin_required
def populate_mock_data():
    try:
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create mock data
        mock_data = create_mock_data()
        
        return jsonify({
            'message': 'Mock data created successfully',
            'data': {
                'admin': mock_data['admin'].to_dict(),
                'users_count': len(mock_data['users']),
                'companions_count': len(mock_data['companions'])
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    try:
        from src.models.database import CompanionProfile, CompanionService, Booking, Payment
        
        stats = {
            'total_users': User.query.filter_by(role='user').count(),
            'total_companions': User.query.filter_by(role='companion').count(),
            'total_bookings': Booking.query.count(),
            'total_revenue': db.session.query(db.func.sum(Payment.amount))
                .filter(Payment.status == 'settlement')
                .scalar() or 0,
            'pending_bookings': Booking.query.filter_by(status='pending').count(),
            'completed_bookings': Booking.query.filter_by(status='completed').count(),
            'cancelled_bookings': Booking.query.filter_by(status='cancelled').count()
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/companions', methods=['GET'])
@admin_required
def get_companions():
    try:
        companions = User.query.filter_by(role='companion').all()
        return jsonify([companion.to_dict() for companion in companions]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/bookings', methods=['GET'])
@admin_required
def get_all_bookings():
    try:
        from src.models.database import Booking
        bookings = Booking.query.all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/payments', methods=['GET'])
@admin_required
def get_all_payments():
    try:
        from src.models.database import Payment
        payments = Payment.query.all()
        return jsonify([payment.to_dict() for payment in payments]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400 