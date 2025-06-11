from flask import Flask
from src.models.database import db, User
from src.config import Config
import bcrypt

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    # Create admin user
    password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    admin = User(
        name='Admin',
        email='admin@rentalkompanion.com',
        phone='081234567890',
        password_hash=password_hash,
        role='admin',
        description='System Administrator'
    )
    db.session.add(admin)
    db.session.commit()
    print('Admin user created successfully!') 