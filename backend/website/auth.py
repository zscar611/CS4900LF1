import json
from flask import Blueprint, request, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_sqlalchemy import SQLAlchemy

auth = Blueprint('auth', __name__)

@auth.route('/all', methods=['GET'])
def all():
   
   users = User.query.all()
   all_users = []
   for user in users:
    all_users += {"first name": user.first_name, "last name": user.last_name}
    
    return json.dumps(all_users)
       

@auth.route('/login', methods=['GET', 'POST'])
def login():
    pass


@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    pass


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        phone_number = request.form.get('phone_number')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        if len(phone_number) != 10:
            message = {"ERROR": "Invalid phone number."}
            return jsonify(message)
        elif len(first_name) < 2:
            message = {"ERROR": "First name must be greater than 2 characters."}
            return jsonify(message)
        elif len(last_name) < 2:
            message = {"ERROR": "Last name must be greater than 2 characters."}
            return jsonify(message)
        elif len(password1) < 12:
            message = {"ERROR": "Password must be over 12 characters."}
            return jsonify(message)
        elif password1 != password2:
            message = {"ERROR": "Passwords do not match."}
            return jsonify(message)
        else:
            new_user = User(first_name=first_name, last_name=last_name, phone_number=phone_number, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            message = {"SUCESS": "Account created."}
            return jsonify(message)
    elif request.method == 'GET':
        return jsonify({"message": "hi"}), 200