from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friendship(db.Model):
    __tablename__ = 'friendships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    friendship_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id'), ondelete='CASCADE'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id'), ondelete='CASCADE'), nullable=False)
    status = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            'friendship_id': self.friendship_id,
            'user_id': self.user_id,
            'friend_id': self.friend_id,
            'status': self.status
        }
