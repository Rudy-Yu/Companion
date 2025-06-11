from flask import Flask
from src.models.database import db, User, CompanionProfile
from src.config import Config
import bcrypt

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    # Create admin user
    admin_password = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    admin_user = User(
        name='Admin',
        email='admin@example.com',
        phone='081234567890',
        password_hash=admin_password,
        role='admin',
        is_verified=True,
        description='System Administrator'
    )
    db.session.add(admin_user)
    db.session.commit()
    print('Admin user created successfully!')

    # Create companion user
    companion_password = bcrypt.hashpw('companion123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    companion_user = User(
        name='Anisa',
        email='anisa@example.com',
        phone='081234567891',
        password_hash=companion_password,
        role='companion',
        description='Professional companion with 2 years of experience'
    )
    db.session.add(companion_user)
    db.session.commit()

    # Create companion profile
    companion_profile = CompanionProfile(
        user_id=companion_user.id,
        display_name='Anisa',
        description='Professional companion with 2 years of experience in various events and gatherings',
        age=25,
        gender='Female',
        location='Jakarta',
        hourly_rate=100000,
        is_available=True,
        verification_status='verified'
    )
    db.session.add(companion_profile)
    db.session.commit()
    print('Companion user and profile created successfully!') 