from . import db
from flask_login import UserMixin


class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date(), nullable=False)
    full_name = db.Column(db.String(150), nullable=False)
    activity = db.Column(db.String(150), nullable=False)
    time_in = db.Column(db.Time(), nullable=False)
    time_out = db.Column(db.Time(), nullable=True)
    checked_in = db.Column(db.Boolean(), nullable=False)
    checked_out = db.Column(db.Boolean(), nullable=False)
    hours = db.Column(db.Integer, nullable=True)
    group = db.Column(db.String(150), nullable=True)
    volunteer = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    # store phone numbers as 10 characters no non-numeric characters will need to clean, can have same phone number
    phone_number = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    # unsure if I should merge these two
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    date_of_birth = db.Column(db.String(10), nullable=False)
    shifts = db.relationship('Shift')
