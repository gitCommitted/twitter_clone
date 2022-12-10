from app.models import db, Like

def seed_likes():
    like1 = Like(
        userId=3,
        tweetId=3
    )
    like2 = Like(
        userId=3,
        tweetId=4
    )
    like3 = Like(
        userId=2,
        tweetId=6
    )
    like4 = Like(
        userId=2,
        tweetId=5
    )
    like5 = Like(
        userId=3,
        tweetId=6
    )
    like6 = Like(
        userId=3,
        tweetId=2
    )
    like7 = Like(
        userId=4,
        tweetId=8
    )
    like8 = Like(
        userId=5,
        tweetId=8
    )
    like9 = Like(
        userId=6,
        tweetId=8
    )
    like10 = Like(
        userId=7,
        tweetId=7
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()