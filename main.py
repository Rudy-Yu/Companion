import os
import sys
import logging
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from sqlalchemy import text
from src.models.database import db
from src.routes.auth import auth_bp
from src.routes.user import user_bp
from src.routes.companion import companion_bp

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = 'rental-kompanion-secret-key-2024'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string-rental-kompanion'
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@localhost:3306/mydb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # Enable SQL query logging

# Initialize extensions
CORS(app, 
     resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
jwt = JWTManager(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(companion_bp, url_prefix='/api/companions')

# Create tables
with app.app_context():
    try:
        logger.info("Creating database tables...")
        db.create_all()
        logger.info("Database tables created successfully!")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")
        raise

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

@app.route('/api/health')
def health_check():
    try:
        # Test database connection using text()
        db.session.execute(text('SELECT 1'))
        return {'status': 'healthy', 'message': 'Rental Kompanion API is running', 'database': 'connected'}
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        return {'status': 'unhealthy', 'message': 'Database connection failed', 'error': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

