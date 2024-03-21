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
        all_users.append({"first name": user.first_name, "last name": user.last_name})
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
        date_of_birth = request.form.get('date_of_birth')

        # auto generate password
        password = last_name.lower()[:3] + first_name.lower()[:3] + date_of_birth[:2] + date_of_birth[6:]

        # check for duplicates
        user = User.query.filter(
        User.first_name.like(first_name),
        User.last_name.like(last_name),
        User.phone_number.like(phone_number)
        ).first()

        if user:
            message = {"ERROR": "User already exists"}
            return jsonify(message), 400
        
        # error checking
        if len(phone_number) != 10:
            message = {"ERROR": "Invalid phone number."}
            return jsonify(message), 400
        elif len(first_name) < 2:
            message = {"ERROR": "First name must be greater than 2 characters."}
            return jsonify(message), 400
        elif len(last_name) < 2:
            message = {"ERROR": "Last name must be greater than 2 characters."}
            return jsonify(message), 400
        elif len(date_of_birth) != 10:
            message = {"ERROR": "Invalid date of birth"}
            return jsonify(message), 400
        else:
            new_user = User(first_name=first_name, last_name=last_name, phone_number=phone_number, date_of_birth=date_of_birth, password=generate_password_hash(password, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            message = {"SUCESS": "Account created."}
            return jsonify(message), 201 
    elif request.method == 'GET':
        message = {"FORMAT": "first_name = string over 2 chars, last_name = string over 2 chars, phone_number = string of 10 chars, date_of_birth = string of 10 chars"}
        return jsonify(message), 200