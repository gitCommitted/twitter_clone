from .db import db
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    tweetId = db.Column(db.Integer, db.ForeignKey('tweets.id'))
    created_on = db.Column(db.Date, default=datetime.utcnow)
    updated_on = db.Column(db.Date, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='likes')
    tweet = db.relationship('Tweet', back_populates='likes')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'tweetId': self.tweetId,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }
