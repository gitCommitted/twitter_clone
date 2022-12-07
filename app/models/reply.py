from .db import db
from flask_login import login_required, current_user

from datetime import datetime
from .user import User

class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    tweetId = db.Column(db.Integer, db.ForeignKey('tweets.id'))
    body = db.Column(db.String(200), nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.utcnow)
    updated_on = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='replies')
    tweet = db.relationship('Tweet', back_populates='replies')


    def get_user(self):
        user = User.query.filter(User.id == self.userId).first()
        return user.username

    def get_userPic(self):
        user = User.query.filter(User.id == self.userId).first()
        return user.pic

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.get_user(),
            'userPic': self.get_userPic(),
            'tweetId': self.tweetId,
            'body': self.body,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }
    
    def to_dict2(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.get_user(),
            'userPic': self.get_userPic(),
            'tweetId': self.tweetId,
            'body': self.body,
            'created_on': self.created_on,
            'updated_on': self.updated_on,

        }
