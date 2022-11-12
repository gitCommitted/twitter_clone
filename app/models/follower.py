from .db import db
from datetime import datetime

class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    followerId = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_on = db.Column(db.Date, default=datetime.utcnow)
    updated_on = db.Column(db.Date, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='follows')
    follower = db.relationship('User', back_populates='followers')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'followerId': self.followerId,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }
