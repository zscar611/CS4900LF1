from website import create_app
from flask import Flask, request, jsonify
from flask_cors import CORS

app = create_app()
CORS(app, origins='http://localhost:3000')
if __name__ == '__main__':
    app.run(debug=True)  # set to false at end of semester
