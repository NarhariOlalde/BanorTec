from helpers.db import mongo
import json
import random

def generate_random_user():
    filename = "data/usuarios.json"
    users = read_json_from_file(filename)

    user = users[random.randint(0, 2)]

    return {
        "userId": user["userId"],
        "userName" : user["Alias"],
    }

def get_user(userId):
    # Read MongoDB database
    users = list(mongo.db.users.find())

    # Get the matching user
    matching_user = [user for user in users if user["userId"] == userId]

    # Return user
    return matching_user[0]

def read_json_from_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data