from app.models import db, Tweet

def seed_tweets():
    tweet1 = Tweet(
        userId=1,
        body="I'm a tweet"
    )
    tweet2 = Tweet(
        userId=1,
        body="I'm another tweet"
    )
    tweet3 = Tweet(
        userId=2,
        body="I'm a tweet also"
    )
    tweet4 = Tweet(
        userId=2,
        body="I'm another test tweet"
    )
    tweet5 = Tweet(
        userId=3,
        body="I'm a test tweet"
    )
    tweet6 = Tweet(
        userId=3,
        body="I'm another tweeter tester"
    )
    tweet7 = Tweet(
        userId=1,
        body="I'm a longer tweet for testing purposes, not for testing porpoises"
    )
    tweet8 = Tweet(
        userId=1,
        body="Testing porpoises is unethical"
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