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
from src.routes.booking import booking_bp
from src.routes.payment import payment_bp
from src.routes.admin import admin_bp

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app(config_name=None):
    """Application factory pattern"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    
    # Reverting to hardcoded configuration
    app.config['SECRET_KEY'] = 'rental-kompanion-secret-key-2024'
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string-rental-kompanion'
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@localhost:3306/rental_kompanion"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    
    # CORS configuration
    if config_name == 'production':
        # Strict CORS for production
        allowed_origins = os.environ.get('ALLOWED_ORIGINS', '').split(',')
        CORS(app, 
             resources={r"/api/*": {"origins": allowed_origins}},
             supports_credentials=True,
             allow_headers=["Content-Type", "Authorization"],
             methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    else:
        # Permissive CORS for development
        CORS(app, 
             resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
             supports_credentials=True,
             allow_headers=["Content-Type", "Authorization"],
             methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(companion_bp, url_prefix='/api/companions')
    app.register_blueprint(booking_bp, url_prefix='/api/bookings')
    app.register_blueprint(payment_bp, url_prefix='/api/payments')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Create tables
    with app.app_context():
        try:
            logger.info("Creating database tables...")
            db.create_all()
            logger.info("Database tables created successfully!")
        except Exception as e:
            logger.error(f"Error creating database tables: {str(e)}")
            raise
    
    # Routes
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
            # Test database connection
            db.session.execute(text('SELECT 1'))
            return {'status': 'healthy', 'message': 'Rental Kompanion API is running', 'database': 'connected'}
        except Exception as e:
            logger.error(f"Database connection error: {str(e)}")
            return {'status': 'unhealthy', 'message': 'Database connection failed', 'error': str(e)}, 500
    
    @app.route('/api/admin/populate-mock-data', methods=['POST'])
    def populate_mock_data():
        """Endpoint untuk populate mock data"""
        try:
            from src.mock_data import create_mock_data
            result = create_mock_data()
            return {'message': 'Mock data created successfully', 'data': result}, 201
        except Exception as e:
            logger.error(f"Error creating mock data: {str(e)}")
            return {'error': str(e)}, 500
    
    # Error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return {'error': 'Bad request'}, 400

    @app.errorhandler(401)
    def unauthorized(error):
        return {'error': 'Unauthorized'}, 401

    @app.errorhandler(403)
    def forbidden(error):
        return {'error': 'Forbidden'}, 403

    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Not found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'error': 'Internal server error'}, 500
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])

