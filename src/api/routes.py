from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from api.models import db, User
from api.utils import generate_sitemap, APIException

app = Flask(__name__)
CORS(app)

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    # Ruta existente para el manejo de "hello"
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    
    if user is None or user.password != password:
        return jsonify({"message": "Invalid email or password"}), 401
    
    return jsonify({"message": "Login successful"}), 200

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# Resto de las rutas y configuración de la API

if __name__ == '__main__':
    app.run()
