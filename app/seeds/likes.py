from app.models import db, Like

def seed_likes():
    like1 = Like(
        user_id=1,
        tweet_id=3
    )
    like2 = Like(
        user_id=1,
        tweet_id=4
    )
    like3 = Like(
        user_id=2,
        tweet_id=1
    )
    like4 = Like(
        user_id=2,
        tweet_id=2
    )
    like5 = Like(
        user_id=3,
        tweet_id=1
    )
    like6 = Like(
        user_id=3,
        tweet_id=2
    )
    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()