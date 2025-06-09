from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'user' or 'companion'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    companion_profile = db.relationship('CompanionProfile', backref='user', uselist=False)
    bookings = db.relationship('Booking', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class CompanionProfile(db.Model):
    __tablename__ = 'companion_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    display_name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)
    hourly_rate = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    services = db.relationship('CompanionService', backref='companion_profile', lazy=True)
    bookings = db.relationship('Booking', backref='companion_profile', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'display_name': self.display_name,
            'bio': self.bio,
            'hourly_rate': self.hourly_rate,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class CompanionService(db.Model):
    __tablename__ = 'companion_services'
    
    id = db.Column(db.Integer, primary_key=True)
    companion_profile_id = db.Column(db.Integer, db.ForeignKey('companion_profiles.id'), nullable=False)
    service_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'companion_profile_id': self.companion_profile_id,
            'service_type': self.service_type,
            'description': self.description,
            'price': self.price,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    companion_profile_id = db.Column(db.Integer, db.ForeignKey('companion_profiles.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('companion_services.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in hours
    total_price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 'pending', 'confirmed', 'completed', 'cancelled'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    service = db.relationship('CompanionService', backref='bookings')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'companion_profile_id': self.companion_profile_id,
            'service_id': self.service_id,
            'booking_date': self.booking_date.isoformat(),
            'duration': self.duration,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 