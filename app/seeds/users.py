from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', pic='https://itweetbucket.s3.amazonaws.com/c8477cccbe7d4f4fb4eb7139fc0e6091.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/673e5a03912e4fe5bec7bb0609c3ab10.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
