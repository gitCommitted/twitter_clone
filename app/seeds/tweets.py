from app.models import db, Tweet

def seed_tweets():
    tweet1 = Tweet(
        user_id=1,
        body="I'm a tweet"
    )
    tweet2 = Tweet(
        user_id=1,
        body="I'm another tweet"
    )
    tweet3 = Tweet(
        user_id=2,
        body="I'm a tweet also"
    )
    tweet4 = Tweet(
        user_id=2,
        body="I'm another test tweet"
    )
    tweet5 = Tweet(
        user_id=3,
        body="I'm a test tweet"
    )
    tweet6 = Tweet(
        user_id=3,
        body="I'm another tweeter tester"
    )
    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)
    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()