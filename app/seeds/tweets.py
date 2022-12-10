from app.models import db, Tweet

def seed_tweets():
    tweet1 = Tweet(
        userId=10,
        body="What a beautiful day",
        image="https://itweetbucket.s3.amazonaws.com/1480bf70b4ab4dd59b0aca936591cd42.jpeg"
    )
    tweet2 = Tweet(
        userId=4,
        body="I'm another tweet",
        image="https://itweetbucket.s3.amazonaws.com/8d73861d59d04d1c838db42fd6fb61af.jpg"
    )
    tweet3 = Tweet(
        userId=2,
        body="I'm a tweet also"
    )
    tweet4 = Tweet(
        userId=3,
        body="I'm another test tweet"
    )
    tweet5 = Tweet(
        userId=11,
        body="To infinity and beyond!",
        image="https://itweetbucket.s3.amazonaws.com/6826056cfa8e40f0b74224f354ccc228.jpg"
    )
    tweet6 = Tweet(
        userId=1,
        body="I'm a test tweet"
    )
    tweet7 = Tweet(
        userId=9,
        body="I'm a longer tweet that's only for testing purposes, not for testing porpoises",
        image="https://itweetbucket.s3.amazonaws.com/089951729fa74fdea2e1794b88345ac6.jpeg"
    )
    tweet8 = Tweet(
        userId=10,
        body="Testing porpoises is unethical",
        image="https://itweetbucket.s3.amazonaws.com/82fabd28f5964d80abf3ae1efcecea59.jpeg"
    )
    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)
    db.session.add(tweet7)
    db.session.add(tweet8)
    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()