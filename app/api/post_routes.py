from flask import Blueprint, jsonify, session, request
from app.models import Post, db, Friendship, Comment, Like
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

# Get Comments By Post ID
@post_routes.route('/<int:id>/comments')
@login_required
def get_post_comments(id):
    comments = Comment.query.filter_by(post_id=id).order_by(Comment.created_at.desc()).all()
    comments_dict = [comment.to_dict() for comment in comments]
    return jsonify(comments_dict)

# Get Post By ID
@post_routes.route('/<int:id>')
@login_required
def get_specific_post(id):
    post = Post.query.get(id)
    return post.to_dict()


# Get Likes By Post ID
@post_routes.route('/<int:id>/likes')
@login_required
def get_post_likes(id):
    likes = Like.query.filter_by(post_id=id).all()
    likes_dict = [like.to_dict() for like in likes]
    return jsonify(likes_dict)


# Post A Like By Post ID
@post_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def like_post(id):
    user_id = current_user.user_id
    post_id = id
    like = Like(user_id, post_id)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@post_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def delete_like(id):
    user = current_user.user_id
    like = Like.query.filter_by(user_id=user, post_id=id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return "Successfully deleted"
    else:
        return "Like not found", 404
