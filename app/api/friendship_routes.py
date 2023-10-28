from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Friendship
from flask_login import current_user

friendship_routes = Blueprint('friendships', __name__)

#Send a friend request
@friendship_routes.route('/send_friend_request', methods=['POST'])
@login_required
def send_friend_request():
    user_id = current_user.user_id
    data = request.get_json()
    new_friendship = Friendship(user_id=user_id, friend_id=data['friend_id'], status='PENDING')
    db.session.add(new_friendship)
    db.session.commit()
    return jsonify(new_friendship.to_dict()), 201

#Check friendship status
@friendship_routes.route('/check_friendship/<int:friend_id>')
@login_required
def check_friend_status(friend_id):
    user_id = current_user.user_id
    friendship = Friendship.query.filter((Friendship.user_id == user_id) & (Friendship.friend_id == friend_id) | (Friendship.user_id == friend_id) & (Friendship.friend_id == user_id)).first()
    if friendship is None:
        return jsonify({'status': 'No friendship found'})
    else:
        return jsonify(friendship.to_dict()), 200


#Check pending friend requests
@friendship_routes.route('/get_pending_requests')
@login_required
def get_pending_requests():
    user_id = current_user.user_id
    pending_requests = Friendship.query.filter_by(friend_id=user_id, status='PENDING').all()
    if not pending_requests:
        return jsonify({'status': 'No pending requests'})
    else:
        return jsonify([request.to_dict() for request in pending_requests]), 200

#Accept friend request
@friendship_routes.route('/accept_friend_request/<int:friendship_id>', methods=['PUT'])
@login_required
def accept_friend_request(friendship_id):
    friendship = Friendship.query.get(friendship_id)
    if friendship is None:
        return jsonify({'status': 'No friendship found'}), 404
    else:
        friendship.status = 'ACCEPTED'
        db.session.commit()
        return jsonify(friendship.to_dict()), 200

#Reject friend request
@friendship_routes.route('/reject_friend_request/<int:friendship_id>', methods=['PUT'])
@login_required
def reject_friend_request(friendship_id):
    friendship = Friendship.query.get(friendship_id)
    if friendship is None:
        return jsonify({'status': 'No friendship found'}), 404
    else:
        friendship.status = 'REJECTED'
        db.session.commit()
        return jsonify(friendship.to_dict()), 200

#Delete friendship
@friendship_routes.route('/delete_friendship/<int:friendship_id>', methods=['DELETE'])
@login_required
def delete_friendship(friendship_id):
    friendship = Friendship.query.get(friendship_id)
    if friendship is None:
        return jsonify({'status': 'No friendship found'}), 404
    else:
        db.session.delete(friendship)
        db.session.commit()
        return jsonify({'status': 'Friendship deleted'}), 200
