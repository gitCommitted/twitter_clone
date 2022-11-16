from flask import Blueprint, jsonify, request
from app.models import User, db, Tweet, Like, Follower, Reply
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import TweetForm, ReplyForm
from app.api.auth_routes import validation_errors_to_error_messages

reply_routes = Blueprint('reply', __name__)


# Edit a reply
@reply_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_reply(id):
    reply = Reply.query.get(id)
    if reply is None:
        return {'errors': ["cant find reply"]}, 404
    if reply.userId != current_user.id:
        return {'errors': ["aint your reply"]}, 401 
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply.body = form.data['body']
        db.session.commit()
        return reply.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a reply
@reply_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_reply(id):
    reply = Reply.query.get(id)
    if reply is None:
        return {'errors': ["cant find reply"]}, 404
    if reply.userId != current_user.id:
        return {'errors': ["aint your reply"]}, 401 
    db.session.delete(reply)
    db.session.commit()
    return {"Message" : "deleted reply"}
