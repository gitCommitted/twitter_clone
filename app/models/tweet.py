from .db import db
from .answer import Answer
from .comment import Comment
from .vote import Vote
from .user import User
from datetime import datetime

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    body = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(255))
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)


    user = db.relationship('User', back_populates='tweets')
    replies = db.relationship('Reply', back_populates='tweet',cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='tweet',cascade='all, delete-orphan')

    def get_user(self):
        user = User.query.filter(User.id == self.userId).first()
        return user.username

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.get_user(),
            'body': self.body,
            'image': self.image,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }

    def to_dict2(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.get_user(),
            'body': self.body,
            "image": self.image,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
            'Replies' : [reply.to_dict2() for reply in self.replies]
        }
