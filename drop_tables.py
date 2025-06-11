from flask import Flask
from src.models.database import db
from src.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("All tables have been dropped successfully!") 