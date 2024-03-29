from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'password'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .views import views
    from .auth import auth
    from .shift import shift

    app.register_blueprint(views, url_prefix='/')
    
    app.register_blueprint(auth, url_prefix='/auth')

    app.register_blueprint(shift, url_prefix='/shift')



    from .models import User, Shift

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    #login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
    return app
