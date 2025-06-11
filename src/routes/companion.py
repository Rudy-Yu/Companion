from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.database import db, User, CompanionProfile, CompanionService

companion_bp = Blueprint('companion', __name__)

@companion_bp.route('/', methods=['GET'])
@jwt_required()
def get_companions():
    try:
        companions = CompanionProfile.query.filter_by(is_available=True).all()
        return jsonify([companion.to_dict() for companion in companions]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/<int:companion_id>', methods=['GET'])
def get_companion(companion_id):
    try:
        companion = CompanionProfile.query.get(companion_id)
        if not companion:
            return jsonify({'error': 'Companion not found'}), 404
        return jsonify(companion.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_my_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Not authorized'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        return jsonify(companion.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Not authorized'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        data = request.get_json()
        
        # Update companion fields
        if 'display_name' in data:
            companion.display_name = data['display_name']
        if 'description' in data:
            companion.description = data['description']
        if 'hourly_rate' in data:
            companion.hourly_rate = data['hourly_rate']
        if 'is_available' in data:
            companion.is_available = data['is_available']
        
        db.session.commit()
        
        return jsonify(companion.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/services', methods=['GET'])
@jwt_required()
def get_my_services():
    try:
        current_user_id = get_jwt_identity()
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        services = CompanionService.query.filter_by(companion_profile_id=companion.id).all()
        return jsonify([service.to_dict() for service in services]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/services', methods=['POST'])
@jwt_required()
def add_service():
    try:
        current_user_id = get_jwt_identity()
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['service_type', 'description', 'price']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new service
        new_service = CompanionService(
            companion_profile_id=companion.id,
            service_type=data['service_type'],
            description=data['description'],
            price=data['price']
        )
        
        db.session.add(new_service)
        db.session.commit()
        
        return jsonify(new_service.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 