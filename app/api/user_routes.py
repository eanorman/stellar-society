from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Post, db
from app.forms import ProfilePictureForm
from app.forms import PostForm
from flask_login import current_user
import boto3
import os


user_routes = Blueprint('users', __name__)
s3 = boto3.client('s3', aws_access_key_id=os.environ.get(
    "AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_KEY"))

## View All Users Information
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

## View User Information
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#Get Posts By User ID
@user_routes.route('<int:id>/posts')
@login_required
def user_posts(id):
    user_posts = Post.query.filter_by(user_id=id).order_by(Post.created_at.desc()).all()
    posts_to_dict = [post.to_dict() for post in user_posts]

    return jsonify(posts_to_dict)

## Add A Profile Photo
@user_routes.route('/<int:id>/add-profile-photo', methods=['POST'])
@login_required
def add_profile_picture(id):
    user = User.query.get(id)
    form = ProfilePictureForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        uploaded_file = form.profile_picture.data
        unique_filename = f"user_{user.user_id}_profile_picture.jpg"

        try:
            s3.upload_fileobj(
                uploaded_file, 'stellar-society', unique_filename)

            user.profile_picture = f"https://stellar-society.s3.us-east-2.amazonaws.com/{unique_filename}"
            db.session.commit()
            return user.to_dict()
        except Exception as e:
            return jsonify({"error": f"Failed to upload the profile picture to S3: {str(e)}"}), 500
    return jsonify({"error": "Failed to update the profile picture.", "errors": form.errors}), 400

#Update Profile Photo
@user_routes.route('/<int:id>/update-profile-photo', methods=['PUT'])
@login_required
def update_profile_picture(id):
    user = User.query.get(id)
    form = ProfilePictureForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        uploaded_file = form.profile_picture.data
        unique_filename = f"user_{user.user_id}_profile_picture.jpg"

        try:
            s3.upload_fileobj(
                uploaded_file, 'stellar-society', unique_filename)

            user.profile_picture = f"https://stellar-society.s3.us-east-2.amazonaws.com/{unique_filename}"
            db.session.commit()
            return user.to_dict()
        except Exception as e:
            return jsonify({"error": f"Failed to upload the profile picture to S3: {str(e)}"}), 500
    return jsonify({"error": "Failed to update the profile picture.", "errors": form.errors}), 400


## Create A New Post
@user_routes.route('/<int:id>/post', methods=['POST'])
@login_required
def add_post(id):
    if id != current_user.user_id:
        return jsonify({"error": "Unauthorized"}), 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            post = Post(
                user_id=current_user.user_id,
                content=form.data['content']
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid form data", "errors": form.errors}), 400

## Delete User Account
@user_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    if id != current_user.user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(current_user.user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return "Successfully deleted"
    else:
        return "User not found", 404

## Search For A User
@user_routes.route('/search', methods=["POST"])
@login_required
def user_search():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({"Error": ['Query was not sent in JSON']}), 400
    user_by_first_name = User.query.filter(User.first_name.ilike(f"%{query}%")).all()
    user_by_last_name = User.query.filter(User.last_name.ilike(f"%{query}%")).all()
    user_by_username = User.query.filter(User.username.ilike(f"%{query}%")).all()

    if not user_by_first_name and not user_by_last_name and not user_by_username:
        return jsonify({"Error": ['No users found']})

    first_name_dicts = []
    last_name_dicts = []
    username_dicts = []

    if len(user_by_first_name):
        first_name_dicts = [s.to_dict() for s in user_by_first_name]
    if len(user_by_last_name):
        last_name_dicts = [s.to_dict() for s in user_by_last_name]
    if len(user_by_username):
        username_dicts = [s.to_dict() for s in user_by_username]

    combined_dicts = first_name_dicts + last_name_dicts + username_dicts
    if not combined_dicts:
        return jsonify({"Error": ["No users found"]})

    unique_dicts = list({d['user_id']: d for d in combined_dicts}.values())
    return jsonify({"results": unique_dicts})
