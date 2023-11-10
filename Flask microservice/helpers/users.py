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
    # Read the users info
    filename = "data/usuarios.json"
    users = read_json_from_file(filename)
    # Get the matching user
    matching_user = [user for user in users if user["_userId"] == userId]
    # Return user
    return matching_user[0]

def read_json_from_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data