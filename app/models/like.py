from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .db import add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    like_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id'), ondelete='CASCADE'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.post_id'), ondelete='CASCADE'), nullable=False)

    def __init__(self, user_id, post_id):
        self.user_id = user_id
        self.post_id = post_id

    def to_dict(self):
        return {
            'like_id': self.like_id,
            'user_id': self.user_id,
            'post_id': self.post_id
        }
