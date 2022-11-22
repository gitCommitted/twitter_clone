from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Tweet, Like, Follower, Reply

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/myFollowers')
@login_required
def followers():
    user = User.query.get(current_user.id)
    return {'followers': [follower.to_dict() for follower in user.follows]}

@user_routes.route('/myFollows')
@login_required
def follows():
    user = User.query.get(current_user.id)
    print("follows: ", user.follows)
    print("followers: ", user.followers)
    return {'follows': [follow.to_dict() for follow in user.followers]}

@user_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ["cant find user"]}, 404
    if user.id == current_user.id:
        return {'errors': ["you cant follow yourself"]}, 401
    follow = Follower.query.filter(Follower.followerId == current_user.id, Follower.userId == user.id).first()
    if follow is not None:
        return {'errors': ["you're already following"]}, 401
    follow = Follower(
        followerId=current_user.id,
        userId=user.id
    )
    db.session.add(follow)
    db.session.commit()
    return {'followers': [follower.to_dict() for follower in user.followers]}

@user_routes.route('/<int:id>/unfollow', methods=['POST'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ["cant find user"]}, 404
    if user.id == current_user.id:
        return {'errors': ["you cant unfollow yourself"]}, 401
    follow = Follower.query.filter(Follower.followerId == current_user.id, Follower.userId == user.id).first()
    if follow is None:
        return {'errors': ["you're not following"]}, 401
    db.session.delete(follow)
    db.session.commit()
    return {'followers': [follower.to_dict() for follower in user.followers]}

@user_routes.route('/myTweets')
@login_required
def myTweets():
    user = User.query.get(current_user.id)
    return {'tweets': [tweet.to_dict2() for tweet in user.tweets]}

@user_routes.route('/myReplies')
@login_required
def myReplies():
    user = User.query.get(current_user.id)
    return {'replies': [reply.to_dict2() for reply in user.replies]}
