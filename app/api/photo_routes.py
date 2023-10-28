from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import boto3
from app.models import db, Photo
import os


photo_routes = Blueprint('photos', __name__)
s3 = boto3.client('s3', aws_access_key_id=os.environ.get(
    "AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_KEY"))



@photo_routes.route('/upload_image', methods=['POST'])
def upload_image():
    file = request.files['image']
    filename = secure_filename(file.filename)

    s3.upload_fileobj(file, 'stellar-society', filename)


    image_url = f'https://stellar-society.s3.amazonaws.com/{filename}'


    user_id = request.form.get('user_id')
    post_id = request.form.get('post_id')


    photo = Photo(user_id=user_id, post_id=post_id, image=image_url)
    db.session.add(photo)
    db.session.commit()


    return jsonify({'url': image_url}), 200


@photo_routes.route('/<int:post_id>/photos', methods=['GET'])
def get_photos(post_id):
    photos = Photo.query.filter_by(post_id=post_id).all()
    photo_urls = [photo.image for photo in photos]
    return jsonify(photo_urls)
