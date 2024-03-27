from flask import Blueprint, request, jsonify
from .models import Shift, User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import datetime
import json


shift = Blueprint('shift', __name__)



def convert_to_military_time(time_str):
        # Split the time string into hours, minutes, and AM/PM indicator
        time_parts = time_str.split(':')
        hours = int(time_parts[0])
        minutes = int(time_parts[1][:2])
        period = time_parts[1][-2:]

        # Convert to military time
        if period.upper() == 'PM' and hours != 12:
            hours += 12
        elif period.upper() == 'AM' and hours == 12:
            hours = 0

        # Format military time as HH:MM
        military_time = '{:02d}:{:02d}:00'.format(hours, minutes)
        return military_time
        
def convert_to_standard_time(time_str):
        # Split the time string into hours, minutes, and AM/PM indicator
        time_parts = time_str.split(':')
        hours = int(time_parts[0])
        minutes = int(time_parts[1][:2])
        period = time_parts[1][-2:]

        # Convert to military time
        if period.upper() == 'PM' and hours != 12:
            hours += 12
        elif period.upper() == 'AM' and hours == 12:
            hours = 0

        # Format military time as HH:MM
        military_time = '{:02d}:{:02d}:00'.format(hours, minutes)
        return military_time
        
def serialize_shift(shift):
    shift_to_return = {}
    shift_to_return['full_name'] = shift.full_name
    shift_to_return['date'] = str(shift.date)
    shift_to_return['activity'] = shift.activity
    shift_to_return['time_in'] = str(shift.time_in)
    shift_to_return['time_out'] = str(shift.time_out)
    shift_to_return['hours'] = shift.hours
    shift_to_return['group'] = shift.group
    shift_to_return['volunteer'] = shift.volunteer
    shift_to_return['id'] = shift.id

    return shift_to_return

# QUERY FUNCTIONS

# A query for all shifts of a given user
def userShifts(userName): # Not tested yet
    shiftList = Shift.query.filter(
        Shift.full_name.like(userName) # TODO: We should probably search for users using their ID rather than username in the event of duplicate names
    )
    shiftsScheduled = []
    for x in shiftList:
        shiftsScheduled.append(serialize_shift(x))
    return jsonify(shiftsScheduled)

# A query for any given shifts in a given day (regardless of clocked in or out)
@shift.route('/scheduledToday', methods=['GET'])
def shiftOnGivenDay():
    day = datetime.date.today()
    givenDay = Shift.query.filter(
    Shift.date.like(day) 
    )
    scheduledVolunteers = []
    for x in givenDay:
        scheduledVolunteers.append(serialize_shift(x))
    return jsonify(scheduledVolunteers)


# A query for shifts that are checked in
@shift.route('/checkedIn', methods=['GET'])
def checkedIn():
    day = datetime.date.today()
    givenDay = Shift.query.filter(
    Shift.date.like(day) & Shift.checked_in == True
    )
    scheduledVolunteers = []
    for x in givenDay:
        scheduledVolunteers.append(serialize_shift(x))
    return jsonify(scheduledVolunteers)


# A query for shifts that are checked out
@shift.route('/checkedOut', methods=['GET'])
def checkedOut():
    day = datetime.date.today()
    givenDay = Shift.query.filter(
    Shift.date.like(day) & Shift.checked_out == True
    )
    scheduledVolunteers = []
    for x in givenDay:
        scheduledVolunteers.append(serialize_shift(x))
    return jsonify(scheduledVolunteers)

@shift.route('/activate', methods=['GET', 'POST'])
def activate():
    if request.method == 'POST':
        # check if shift exists
        id = request.form.get("id")
        print(id) 
        shift = Shift.query.filter_by(id=id).first()
        if shift:
            # format current time to match time in database
            time_in = datetime.datetime.now()
            time_in = datetime.time(time_in.hour, time_in.minute, 0)
            shift = Shift.query.filter_by(id=id).update({Shift.checked_in:True, Shift.time_in:time_in})
            db.session.commit()
            message = {"SUCCESS": "Shift checked in"}
            return jsonify(message), 200
        else:
            message = {"ERROR": "Shift id not found"}
            return jsonify(message), 400
        
@shift.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        id = request.form.get("id")
        shift = Shift.query.filter_by(id=id).first()
        if shift:
            # format current time to match time in database
            time_out = datetime.datetime.now()
            time_out = datetime.time(time_out.hour, time_out.minute, 0)
            hours = float(str(time_out.hour - shift.time_in.hour) + '.' + str(time_out.minute - shift.time_in.minute))
            shift = Shift.query.filter_by(id=id).update({Shift.checked_in:False, Shift.checked_out:True, Shift.time_out:time_out, Shift.hours:hours})
            db.session.commit()
            message = {"SUCCESS": "Shift checked out"}
            return jsonify(message), 200
        else:
            message = {"ERROR": "Shift id not found"}
            return jsonify(message), 400

        


        




@shift.route('/add', methods=['GET', 'POST'])
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
        elif len(time_in) < 7 or len(time_in) > 8:
            message = {"ERROR": "Invalid time in."}
            return jsonify(message), 400
        elif len(time_out) < 7 or len(time_out) > 8:
            message = {"ERROR": "Invalid time out."}
            return jsonify(message), 400
       
        user = User.query.filter_by(id=id).first()

        if not user:
            message = {"ERROR": "Volunteer does not exist."}
            return jsonify(message), 400
        
        # parse and change date and times
        date = date.split('-')
        date = datetime.datetime(int(date[0]), int(date[1]), int(date[2]))

        time_in = convert_to_military_time(time_in).split(":")
        time_out = convert_to_military_time(time_out).split(":")
        time_in = datetime.time(int(time_in[0]), int(time_in[1]), 0)
        time_out = datetime.time(int(time_out[0]), int(time_out[1]), 0)

        shift = Shift.query.filter(
            Shift.volunteer.like(id),
            Shift.date.like(date),
            Shift.time_in.like(time_in),
            Shift.time_out.like(time_out)
        ).first()

        print(shift)

        if shift:
            message = {"ERROR": "Shift is already scheduled"}
            return jsonify(message), 400

        new_shift= Shift(date=date, full_name=full_name, volunteer=id, activity=activity, time_in=time_in, time_out=time_out, group=group, checked_in=False, checked_out=False)                                                                           
        db.session.add(new_shift)
        db.session.commit()

        message = {"SUCCESS": "Volunteer shift scheduled"}
        return jsonify(message), 201

    


        

            

        
