from flask import Blueprint, request, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_sqlalchemy import SQLAlchemy

auth = Blueprint('auth', __name__)
dbName = "database.db"

@auth.route('/login', methods=['GET', 'POST'])
def login():
    pass


@auth.route('/logout', methods=['GET', 'POST'])
def login():
    pass


@auth.route('/sign-up', methods=['GET', 'POST'])
def login():
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
            new_user = User(first_name=first_name, last_name=last_name, phone_number=phone_number,
                            password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            message = {"SUCESS": "Account created."}
            return jsonify(message)


# new route to retrieve information from the add shift page (volunteerAdd.js) then communicate that to the database
@auth.route('/VolunteerAdd', methods=['GET', 'POST'])
def newShift():
    # TODO: Add a function to remove a record from the database
    # TODO: Gonna have to talk to Tim about his code and getting the data from volunteerAdd.js over to here
    # ^ Until then, I'm just gonna be sending test data to the DB
    firstName = "Frank"
    lastName = "Sawyer"
    phoneNumber = "7088000222"  # TODO: phone number is listed in the form on /VolunteerAdd but does not exist in the Database itself
    date = "10/27/2025"
    timeIn = "4:20"
    timeOut = "8:20"
    shiftId = 1
    hours = 4
    group = "Broncos"
    zone = "Pantry"
    totalVol = 1               #TODO: Verify that volunteer field is in fact the number of volunteers in the shift
    # admin = User(username='admin', email='admin@example.com')
    testShift = shift(id=shiftId, date=date, fullname=firstName + ' ' + lastName, activity=zone, time_in=timeIn, time_out=timeOut, hours=hours, group=group, volunteer=totalVol)
    # TODO: verify that this is actually pushing the data to the db
    db.session.add(testShift)
    db.session.commit()
    message = {"SUCESS": "Shift created."}
    return jsonify(message)