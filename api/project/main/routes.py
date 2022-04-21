from flask import Blueprint,jsonify
from postmanager.manager import PostManager

main = Blueprint('main', __name__)

post_manager = PostManager.setup_local()

@main.route('/api')
def index():

    return {'main':'Main PostManager API root resource'}

@main.route('/api/posts')
def list_all():
    meta_data = {"title":"first"}
    content = {
        "Header": "The best life",
        "Paragraph":"Thank you for being there"
    }

    post = post_manager.new_post(meta_data,content)

    # post_manager.save_post(post)

    return jsonify([post.to_json(),post.to_json(),post.to_json(),post.to_json()])