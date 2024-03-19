from flask import Blueprint, request, jsonify
from .models import Shift
from . import db
from flask_sqlalchemy import SQLAlchemy

shift = Blueprint('shift', __name__)

# new route to retrieve information from the add shift page (volunteerAdd.js) then communicate that to the database
@shift.route('/add', methods=['GET', 'POST'])
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