from app.models import db, Like

def seed_likes():
    like1 = Like(
        userId=1,
        tweetId=3
    )
    like2 = Like(
        userId=1,
        tweetId=4
    )
    like3 = Like(
        userId=2,
        tweetId=1
    )
    like4 = Like(
        userId=2,
        tweetId=2
    )
    like5 = Like(
        userId=3,
        tweetId=1
    )
    like6 = Like(
        userId=3,
        tweetId=2
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