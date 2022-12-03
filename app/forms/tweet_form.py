from flask import Flask, Blueprint, jsonify, request
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User, db, Tweet, Like, Follower, Reply

class TweetForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), Length(min=1, max=280)])
    image = StringField('image')