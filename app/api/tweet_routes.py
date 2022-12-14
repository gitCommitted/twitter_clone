from flask import Blueprint, jsonify, request
from app.models import User, db, Tweet, Like, Follower, Reply
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import TweetForm, ReplyForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3helpers import upload_file_to_s3, allowed_file, get_unique_filename


tweet_routes = Blueprint('tweet', __name__)


# Get all tweets
@tweet_routes.route('')
def tweets():
    tweets = Tweet.query.order_by(Tweet.id.desc()).all()
    return {"tweets": [tweet.to_dict2() for tweet in tweets]}

# Get all tweets landing page
@tweet_routes.route('/all')
def tweets2():
    tweets = Tweet.query.order_by(Tweet.id.desc()).all()
    return {"tweets": [tweet.to_dict() for tweet in tweets]}

# Create a new tweet
@tweet_routes.route('', methods=['POST'])
@login_required
def create_tweet():
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if len(request.files) > 0 and form.validate_on_submit():
        print("FILES!!!!!!!!!!!!!:", len(request.files))
        file = request.files["image"]
        tweet = Tweet(
        body=form.data['body'],
        userId=current_user.id,
        image=form.data['image']
        )
        if not allowed_file(file.filename):
            return {'errors': ['file type not permitted']}, 400
        file.filename = get_unique_filename(file.filename)
        upload = upload_file_to_s3(file)
        tweet.image = upload["url"]
        db.session.add(tweet)
        db.session.commit()
        return tweet.to_dict2()
    if form.validate_on_submit():
        tweet = Tweet(
            body=form.data['body'],
            userId=current_user.id
        )
        db.session.add(tweet)
        db.session.commit()
        return tweet.to_dict2()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Get a single tweet and details
@tweet_routes.route('/<int:id>')
@login_required
def tweet(id):
    tweet = Tweet.query.get(id)
    return tweet.to_dict2()


# Delete a tweet
@tweet_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is None:
        return {'errors': ["cant find tweet"]}, 404
    if tweet.userId != current_user.id:
        return {'errors': ["aint your tweet"]}, 401 
    db.session.delete(tweet)
    db.session.commit()
    return {"Message" : "deleted tweet"}


# Edit a tweet
@tweet_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is None:
        return {'errors': ["cant find tweet"]}, 404
    if tweet.userId != current_user.id:
        return {'errors': ["aint your tweet"]}, 401
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if len(request.files) > 0 and form.validate_on_submit():
        print("FILES!!!!!!!!!!!!!:", len(request.files))
        file = request.files["image"]
        tweet.body = form.data['body']
        tweet.image=form.data['image']
        file.filename = get_unique_filename(file.filename)
        upload = upload_file_to_s3(file)
        tweet.image = upload["url"]
        db.session.commit()
        return tweet.to_dict2()
    if form.validate_on_submit():
        tweet.body = form.data['body']
        db.session.commit()
        return tweet.to_dict2()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

# Like a tweet
@tweet_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def like_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is None:
        return {'errors': ["cant find tweet"]}, 404
    like = Like.query.filter(Like.userId == current_user.id).filter(Like.tweetId == tweet.id).first()
    if like is None:
        like = Like(
            userId=current_user.id,
            tweetId=tweet.id
        )
        db.session.add(like)
        db.session.commit()
        return {"Message" : "liked tweet"}
    return {'errors': ["already liked tweet"]}, 401


# Unlike a tweet
@tweet_routes.route('/<int:id>/like', methods=['DELETE'])
def unlike_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is None:
        return {'errors': ["cant find tweet"]}, 404
    like = Like.query.filter(Like.userId == current_user.id, Like.tweetId == tweet.id).first()
    if like is None:
        return {'errors': ["cant find like"]}, 404
    db.session.delete(like)
    db.session.commit()
    return {"Message" : "unliked tweet"}


# Reply to a tweet
@tweet_routes.route('/<int:id>/reply', methods=['POST'])
@login_required
def create_reply(id):
    tweet = Tweet.query.get(id)
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply = Reply(
            body=form.data['body'],
            userId=current_user.id,
            tweetId=tweet.id
        )
        db.session.add(reply)
        db.session.commit()
        return reply.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



