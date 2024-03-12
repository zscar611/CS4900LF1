from flask import Blueprint, jsonify


views = Blueprint('views', __name__)


@views.route('/')
def home():
    return jsonify({"message": "hi"})

    
