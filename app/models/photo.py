from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .db import add_prefix_for_prod


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    photo_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id'), ondelete='CASCADE'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.post_id'), ondelete='CASCADE'), nullable=False)
    image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


    def to_dict(self):
        return {
            'photo_id': self.photo_id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'image': self.image,
            'created_at': self.created_at
        }
