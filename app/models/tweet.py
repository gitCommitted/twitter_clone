from .db import db
from .like import Like
from .user import User
from .follower import Follower
from datetime import datetime
from flask_login import current_user

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

    def get_userPic(self):
        user = User.query.filter(User.id == self.userId).first()
        return user.pic
    
    def get_userVerified(self):
        user = User.query.filter(User.id == self.userId).first()
        return user.verified

    def get_likes(self):
        return len(self.likes)
    
    def you_liked(self):
        liked = True
        getLikes = Like.query.filter(Like.userId == current_user.id).filter(Like.tweetId == self.id).first()
        if getLikes is None:
            liked = False
        return liked
    
    def you_follow(self):
        follow = True
        getFollow = Follower.query.filter(Follower.followerId == current_user.id).filter(Follower.userId == self.userId).first()
        if getFollow is None:
            follow = False
        return follow

    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.get_user(),
            'userPic': self.get_userPic(),
            'userVerified': self.get_userVerified(),
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
            'userPic': self.get_userPic(),
            'userVerified': self.get_userVerified(),
            'youFollow': self.you_follow(),
            'body': self.body,
            "image": self.image,
            'created_on': self.created_on,
            'updated_on': self.updated_on,
            'Replies' : [reply.to_dict2() for reply in self.replies],
            'Likes' : 
            {
                "total": self.get_likes(), 
                "youLiked":self.you_liked()
            }
        }
