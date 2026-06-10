from flask import Flask
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)

    app.config.from_object(config_class)

    from app.api.v1.users import users_bp
    app.register_blueprint(users_bp)

    return app