from flask import Blueprint, request, jsonify
from .models import Shift, User
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

@shift.route('/add', methods=['GET', 'POST']) # decorator
def add():  
    if request.method == 'POST':
        date = request.form.get("date")
        full_name = request.form.get("full_name")
        id = request.form.get("id")
        activity = request.form.get("area")
        time_in = request.form.get("time_in")
        time_out = request.form.get("time_out")
        group = request.form.get("group")

        if len(date) != 10:
            message = {"ERROR": "Invalid date."}
            return jsonify(message), 400
       
       # user = User.query.filter(
        #        User.first_name.like(id)
        #).first()

        #if not user:
         #   message = {"ERROR": "Volunteer does not exist."}
          #  return jsonify(message), 400
        
        # parse and change date and times
        date = date.replace("-", "/")

        def to_mil_time(normal_time):
            hour = int(normal_time[:2])
            meridian = normal_time[8:]
            if (hour == 12):
                hour = 0
            if (meridian == 'PM'):
                hour += 12
            return str(hour) + normal_time[2:8]
        
        print(to_mil_time(time_in))

        return "hi"



        

            

        
