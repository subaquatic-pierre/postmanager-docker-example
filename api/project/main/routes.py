from flask import Blueprint
from postmanager.manager import PostManager

main = Blueprint('main', __name__)

post_manager = PostManager.setup_local()

@main.route('/api')
def index():
    meta_data = {"title":"first"}
    content = {
        "Header": "The best life",
        "Paragraph":"Thank you for being there"
    }

    post = post_manager.new_post(meta_data,content)

    post_manager.save_post(post)

    return post.to_json()