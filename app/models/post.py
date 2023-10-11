from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .db import add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)



    def to_dict(self):
        return {
            'post_id': self.post_id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at
        }
