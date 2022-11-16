from flask import Blueprint, jsonify, request
from app.models import User, db, Tweet, Like, Follower, Reply
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


tweet_routes = Blueprint('tweet', __name__)


# Get all tweets
@tweet_routes.route('/')
def tweets():
    tweets = Tweet.query.all()
    return {"tweets": [tweet.to_dict() for tweet in tweets]}


# Create a new tweet
@tweet_routes.route('/', methods=['POST'])
def create_tweet(id):
    tweet = Tweet(
        userId = current_user.id,
        body = request.json['body']
    )
    db.session.add(tweet)
    db.session.commit()
    return tweet.to_dict()


# Get a single tweet and details
@tweet_routes.route('/<int:id>')
def tweet(id):
    tweet = Tweet.query.get(id)
    return tweet.to_dict2()


# Delete a tweet
@tweet_routes.route('/<int:id>', methods=['DELETE'])
def delete_tweet(id):
    tweet = Tweet.query.get(id)
    db.session.delete(tweet)
    db.session.commit()
    return {"message" : "deleted"}


# Edit a tweet
@tweet_routes.route('/<int:id>', methods=['PUT'])
def edit_tweet(id):
    tweet = Tweet.query.get(id)
    tweet.body = request.json['body']
    db.session.commit()
    return tweet.to_dict()


# Like a tweet
@tweet_routes.route('/<int:id>/like', methods=['POST'])
def like_tweet(id):
    tweet = Tweet.query.get(id)
    like = Like(
        userId = current_user.id,
        tweetId = tweet.id
    )
    db.session.add(like)
    db.session.commit()
    return tweet.to_dict()


# Unlike a tweet
@tweet_routes.route('/<int:id>/unlike', methods=['POST'])
def unlike_tweet(id):
    tweet = Tweet.query.get(id)
    like = Like.query.filter(Like.userId == current_user.id, Like.tweetId == tweet.id).first()
    db.session.delete(like)
    db.session.commit()
    return tweet.to_dict()


# Reply to a tweet
@tweet_routes.route('/<int:id>/reply', methods=['POST'])
def reply_tweet(id):
    tweet = Tweet.query.get(id)
    reply = Reply(
        userId = current_user.id,
        body = request.json['body'],
        tweetId = tweet.id
    )
    db.session.add(reply)
    db.session.commit()
    return reply.to_dict()



