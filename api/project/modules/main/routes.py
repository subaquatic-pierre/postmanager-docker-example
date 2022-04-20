from flask import Blueprint, request

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return '<h1>Hello, world!</1>'