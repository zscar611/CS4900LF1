from flask import Blueprint, jsonify

views = Blueprint('views', __name__)


@views.route('/')
def home():
    users = [{'name': 'paul', 'age': 67}, {'name': 'judy', 'age': 78}]
    return jsonify(users)
