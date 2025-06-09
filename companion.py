from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.database import db, User, CompanionProfile, CompanionService

companion_bp = Blueprint('companion', __name__)

@companion_bp.route('/', methods=['GET'])
def get_all_companions():
    try:
        # Query parameters untuk filtering
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        service_type = request.args.get('service_type')
        location = request.args.get('location')
        min_rating = request.args.get('min_rating', type=float)
        
        # Base query
        query = CompanionProfile.query.filter_by(is_available=True, verification_status='verified')
        
        # Apply filters
        if service_type:
            query = query.join(CompanionService).filter(CompanionService.service_type == service_type)
        
        if location:
            query = query.filter(CompanionProfile.location.ilike(f'%{location}%'))
        
        if min_rating:
            query = query.filter(CompanionProfile.rating >= min_rating)
        
        # Pagination
        companions = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'companions': [companion.to_dict() for companion in companions.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': companions.total,
                'pages': companions.pages,
                'has_next': companions.has_next,
                'has_prev': companions.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/<int:companion_id>', methods=['GET'])
def get_companion_detail(companion_id):
    try:
        companion = CompanionProfile.query.get(companion_id)
        
        if not companion:
            return jsonify({'error': 'Companion not found'}), 404
        
        return jsonify({'companion': companion.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_companion_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Access denied'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        return jsonify({'companion': companion.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_companion_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Access denied'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        data = request.get_json()
        
        # Update fields yang diizinkan
        allowed_fields = ['display_name', 'age', 'gender', 'location', 'description', 'hourly_rate', 'is_available']
        for field in allowed_fields:
            if field in data:
                setattr(companion, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Companion profile updated successfully',
            'companion': companion.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/services', methods=['GET'])
@jwt_required()
def get_companion_services():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Access denied'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        services = CompanionService.query.filter_by(companion_id=companion.id).all()
        
        return jsonify({
            'services': [service.to_dict() for service in services]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/services', methods=['POST'])
@jwt_required()
def add_companion_service():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'companion':
            return jsonify({'error': 'Access denied'}), 403
        
        companion = CompanionProfile.query.filter_by(user_id=current_user_id).first()
        
        if not companion:
            return jsonify({'error': 'Companion profile not found'}), 404
        
        data = request.get_json()
        
        # Validasi input
        required_fields = ['service_type', 'service_name', 'price_per_hour']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Buat service baru
        new_service = CompanionService(
            companion_id=companion.id,
            service_type=data['service_type'],
            service_name=data['service_name'],
            price_per_hour=data['price_per_hour'],
            price_per_day=data.get('price_per_day'),
            description=data.get('description')
        )
        
        db.session.add(new_service)
        db.session.commit()
        
        return jsonify({
            'message': 'Service added successfully',
            'service': new_service.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@companion_bp.route('/<int:companion_id>/services', methods=['GET'])
def get_companion_services_by_id(companion_id):
    try:
        companion = CompanionProfile.query.get(companion_id)
        
        if not companion:
            return jsonify({'error': 'Companion not found'}), 404
        
        services = CompanionService.query.filter_by(companion_id=companion_id, is_available=True).all()
        
        return jsonify({
            'services': [service.to_dict() for service in services]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

