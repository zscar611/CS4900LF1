from flask import Blueprint, request, jsonify
from .models import Shift
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

shift = Blueprint('shift', __name__)

# TODO: Query functions are designed but need to be implemented and tested
# A query for any shifts that has an in time but does not have an out time (clocked in or has not begun)
def incompleteShifts():
    clockedIn = Shift.query.filter(
    Shift.out_time.like('NULL')
    )

# A query for any shifts that has both in and out times (completed shift)
def completedShifts():
    clockedIn = Shift.query.filter(
    Shift.out_time.like(not 'NULL')
    )

# A query for any given shifts in a given day (regardless of clocked in or out)
def shiftOnGivenDay(day):
    givenDay = Shift.query.filter(
    Shift.date.like(day)
    )

@shift.route('/ScheduleVolunteer') # decorator
def home():  # will run every time the directory is entered
    # TODO: phone number is listed in the form on /VolunteerAdd but does not exist in the Database itself
    first_name = request.form.get()
    last_name = request.form.get()
    phone_number = request.form.get()
    date = request.form.get()
    time_in = request.form.get()
    # TODO: determine how the following 6 values will be entered into the DB
    timeOut = "8:20"
    shiftId = 1  # Shift ID is the only required value in the DB
    hours = 4
    group = "Broncos"
    zone = "Pantry"
    totalVol = 1  #TODO: Verify that volunteer field is in fact the number of volunteers in the shift given that it is a group

    newShift = Shift(first_name=first_name, last_name=last_name, phone_number=phone_number,
                    date=date, time_in=time_in)
    db.session.add(newShift)
    db.session.commit()
    message = {"SUCCESS": "Shift created."}
    return jsonify(message)
