from app.models import db, Reply

def seed_replies():
    reply1 = Reply(
        userId=9,
        tweetId=8,
        body="I already knew that!"
    )
    reply2 = Reply(
        userId=5,
        tweetId=6,
        body="Peace and love, peace and love"
    )
    reply3 = Reply(
        userId=10,
        tweetId=8,
        body="You wish you knew that"
    )
    reply4 = Reply(
        userId=6,
        tweetId=5,
        body="ET phone home"
    )
    reply5 = Reply(
        userId=7,
        tweetId=7,
        body="Fo' shizzle"
    )
    reply6 = Reply(
        userId=8,
        tweetId=6,
        body="Serenity now!"
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