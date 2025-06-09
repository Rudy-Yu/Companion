from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from src.models.database import db, User, CompanionProfile

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validasi input
        required_fields = ['name', 'email', 'phone', 'password', 'role']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Cek apakah email sudah terdaftar
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password
        password_hash = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Buat user baru
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            password_hash=password_hash,
            role=data['role']
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        # Jika role adalah companion, buat companion profile
        if data['role'] == 'companion':
            companion_profile = CompanionProfile(
                user_id=new_user.id,
                display_name=data['name'],
                hourly_rate=50000  # Default rate
            )
            db.session.add(companion_profile)
            db.session.commit()
        
        # Buat access token
        access_token = create_access_token(identity=new_user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validasi input
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Cari user berdasarkan email
        user = User.query.filter_by(email=data['email']).first()
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verifikasi password
        if not bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Buat access token
        access_token = create_access_token(identity=user.id)
        
        # Ambil companion profile jika user adalah companion
        companion_profile = None
        if user.role == 'companion':
            companion_profile = CompanionProfile.query.filter_by(user_id=user.id).first()
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict(),
            'companion_profile': companion_profile.to_dict() if companion_profile else None
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Ambil companion profile jika user adalah companion
        companion_profile = None
        if user.role == 'companion':
            companion_profile = CompanionProfile.query.filter_by(user_id=user.id).first()
        
        return jsonify({
            'user': user.to_dict(),
            'companion_profile': companion_profile.to_dict() if companion_profile else None
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Dalam implementasi sederhana, logout hanya mengembalikan pesan
    # Untuk implementasi yang lebih aman, bisa menggunakan token blacklist
    return jsonify({'message': 'Logout successful'}), 200 