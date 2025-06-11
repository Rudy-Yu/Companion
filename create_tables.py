from flask import Flask
from src.models.database import db
from src.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    print("Creating all tables...")
    db.create_all()
    print("All tables have been created successfully!") 