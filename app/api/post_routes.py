from flask import Blueprint, jsonify, session, request
from app.models import Post, db, Friendship
from app.forms import PostForm
from flask_login import current_user, login_required
from sqlalchemy import or_, and_

post_routes = Blueprint('post', __name__)

## Get All Logged In User & Friend's Posts
@post_routes.route('/')
@login_required
def get_posts():
    user_posts = Post.query.filter_by(user_id=current_user.user_id).order_by(Post.created_at.desc()).all()
    friend_ids1 = [friendship.friend_id for friendship in Friendship.query.filter(and_(Friendship.user_id == current_user.user_id, Friendship.status == "ACCEPTED")).all()]
    friend_ids2 = [friendship.user_id for friendship in Friendship.query.filter(and_(Friendship.friend_id == current_user.user_id, Friendship.status == "ACCEPTED")).all()]
    friend_ids = friend_ids1 + friend_ids2

    friend_posts = Post.query.filter(Post.user_id.in_(friend_ids)).order_by(Post.created_at.desc()).all()

    feed_posts = user_posts + friend_posts
    feed_posts.sort(key=lambda post: post.created_at, reverse=True)

    feed_posts_dict = [post.to_dict() for post in feed_posts]

    return jsonify(feed_posts_dict)


# Get Post By ID
@post_routes.route('/<int:id>')
@login_required
def get_specific_post(id):
    post = Post.query.get(id)
    return post.to_dict()
