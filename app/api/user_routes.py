from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import ProfilePictureForm
import boto3
import os


user_routes = Blueprint('users', __name__)
s3 = boto3.client('s3', aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_KEY"))


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/add-profile-photo', methods=['POST'])
@login_required
def add_profile_picture(id):
    user = User.query.get(id)
    form = ProfilePictureForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        uploaded_file = form.profile_picture.data
        unique_filename = f"user_{user.id}_profile_picture.jpg"

        try:
            s3.upload_fileobj(uploaded_file, 'stellar-society', unique_filename)

            user.profile_picture = f"https://stellar-society.s3.us-east-2.amazonaws.com/{unique_filename}"
            db.session.commit()
            return user.to_dict()
        except Exception as e:
             return jsonify({"error": f"Failed to upload the profile picture to S3: {str(e)}"}), 500
    return jsonify({"error": "Failed to update the profile picture.", "errors": form.errors}), 400
