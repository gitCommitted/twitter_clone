from app.models import db, Reply

def seed_replies():
    reply1 = Reply(
        user_id=1,
        tweet_id=3,
        body="I'm a reply"
    )
    reply2 = Reply(
        user_id=1,
        tweet_id=3,
        body="I'm another reply"
    )
    reply3 = Reply(
        user_id=2,
        tweet_id=1,
        body="I'm a reply also"
    )
    reply4 = Reply(
        user_id=2,
        tweet_id=1,
        body="I'm another test reply"
    )
    reply5 = Reply(
        user_id=3,
        tweet_id=1,
        body="I'm a test reply"
    )
    reply6 = Reply(
        user_id=3,
        tweet_id=1,
        body="I'm another tester replyer"
    )
    db.session.add(reply1)
    db.session.add(reply2)
    db.session.add(reply3)
    db.session.add(reply4)
    db.session.add(reply5)
    db.session.add(reply6)
    db.session.commit()

def undo_replies():
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()