from flask import Blueprint, jsonify, session, request
from app.models import Post, db, Friendship, Comment, Like
from app.forms import PostForm
from flask_login import current_user, login_required
from sqlalchemy import or_, and_
from app.forms import CommentForm

comment_routes = Blueprint('comment', __name__)

#Update a Comment By Comment ID
@comment_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        if comment and comment.user_id == current_user.user_id:
            comment.content = form.data['content']
            db.session.commit()
            return comment.to_dict()
        else:
            return jsonify({"error": "Comment not found or unauthorized"}), 404


#Delete a Comment By Comment ID
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment and comment.user_id == current_user.user_id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Comment deleted successfully"}), 200
    else:
        return jsonify({"error": "Comment not found or unauthorized"}), 404
