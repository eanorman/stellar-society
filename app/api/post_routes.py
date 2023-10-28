from flask import Blueprint, jsonify, session, request
from app.models import Post, db, Friendship, Comment, Like
from app.forms import PostForm
from flask_login import current_user, login_required
from sqlalchemy import or_, and_
from app.models import Photo
from app.forms import CommentForm
import boto3
import os
from botocore.exceptions import NoCredentialsError

post_routes = Blueprint('post', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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


# Like a Post By Post ID
@post_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def like_post(id):
    user_id = current_user.user_id
    post_id = id
    like = Like(user_id, post_id)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

#Delete A Like By Post ID
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

#Delete A Post by Post ID
@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    user = current_user.user_id
    post = Post.query.filter_by(user_id=user, post_id=id).first()
    if post:
        photos = Photo.query.filter_by(post_id=id).all()
        s3 = boto3.client('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_KEY"))

        for photo in photos:
            try:
                key = photo.image.split('/')[-1]
                s3.delete_object(Bucket='stellar-society', Key=key)
                db.session.delete(photo)
            except NoCredentialsError:
                print("No AWS credentials found")
        comments = Comment.query.filter_by(post_id=id).all()
        for comment in comments:
            db.session.delete(comment)
        likes = Like.query.filter_by(post_id=id).all()
        for like in likes:
           db.session.delete(like)

        db.session.delete(post)
        db.session.commit()
        return "Successfully deleted"
    else:
        return "Post not found", 404

#Post a Comment By Post ID
@post_routes.route('/<int:id>', methods=["POST"])
@login_required
def post_comment(id):
    user = current_user.user_id
    post_id = id
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=user,
            post_id=id,
            content=form.data['content']
            )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 201
    else:
        return jsonify({"error": "Invalid form data", "errors": form.errors}), 400

#Update a Post By Post ID
@post_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def update_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        if post and post.user_id == current_user.user_id:
            post.content = form.data['content']
            db.session.commit()
            return post.to_dict()
        else:
            return jsonify({"error": "Post not found or unauthorized"}), 404
