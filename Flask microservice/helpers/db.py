from flask import Flask, request
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config["MONGO_URI"] = "mongodb+srv://a01284184:XySS8mEdp6wLhbI9@cluster0.hswkuw9.mongodb.net/Banorte?retryWrites=true&w=majority"
    mongo.init_app(app)

    return app