from flask import Blueprint, jsonify
from project import post_manager

main = Blueprint("main", __name__)


@main.route("/api")
def index():

    return {"main": "Main PostManager API root resource"}


@main.route("/api/posts")
def list_all():
    meta_data = {"title": "first"}
    content = {"Header": "The best life", "Paragraph": "Thank you for being there"}

    post = post_manager.new_post(meta_data, content)

    index = post_manager.index

    # post_manager.save_post(post)

    return jsonify(index)
