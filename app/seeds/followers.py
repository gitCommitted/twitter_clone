from app.models import Follower, db

def seed_followers():
    follower1 = Follower(
        userId=1,
        followerId=2
    )
    follower2 = Follower(
        userId=1,
        followerId=3
    )
    follower3 = Follower(
        userId=3,
        followerId=2
    )
    
    db.session.add(follower1)
    db.session.add(follower2)
    db.session.add(follower3)
    db.session.commit()

def undo_followers():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()