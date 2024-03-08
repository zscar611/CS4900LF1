from flask import Blueprint, jsonify


views = Blueprint('views', __name__)


@views.route('/users')
def home():
    return "hi"

    
