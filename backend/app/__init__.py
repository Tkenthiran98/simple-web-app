from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()  # Declare mongo object globally

def create_app():
    app = Flask(__name__)

    # Set the MongoDB URI
    app.config["MONGO_URI"] = "mongodb://localhost:27017/todo_db"

    # Initialize PyMongo
    mongo.init_app(app)
    app.mongo = mongo  # Make mongo accessible via app

    # Enable CORS
    CORS(app)  # Allow all origins

    # Register Blueprints
    from app.routes.todo_routes import todo_routes
    app.register_blueprint(todo_routes, url_prefix='/api')

    return app
