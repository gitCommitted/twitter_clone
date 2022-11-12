from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(255))
    pic = db.Column(db.String(255))
    image = db.Column(db.String(255))
    verified = db.Column(db.Boolean, nullable=False, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    tweets = db.relationship('Tweet', back_populates='user',cascade='all, delete-orphan')
    replies = db.relationship('Reply', back_populates='user',cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user',cascade='all, delete-orphan')
    follows = db.relationship('Follower', back_populates='user',cascade='all, delete-orphan', foreign_keys='Follower.userId')
    followers = db.relationship('Follower', back_populates='follower',cascade='all, delete-orphan', foreign_keys='Follower.followerId')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "pic": self.pic,
            "image": self.image,
            "verified": self.verified
        }
