from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    homer = User(
        username='Homer', email='homer@aa.io', password='password', pic='https://itweetbucket.s3.amazonaws.com/c8477cccbe7d4f4fb4eb7139fc0e6091.png')
    isaac = User(
        username='Isaac', email='isaac@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/673e5a03912e4fe5bec7bb0609c3ab10.png')
    elmo = User(
        username='Elmo', email='elmo@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/480298692b3443e1985a3b64aadece8d.jpeg')
    ringo = User(
        username='Ringo', email='ringo@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/839562b5f39546f2962761271e6359df.jpeg')
    et = User(
        username='ET', email='et@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/67c3f61ea54b4cae8f9a66e2ab1abe65.jpeg')
    snoop = User(
        username='Snoop', email='snoop@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/7b94f1285d8e422ebe9ec2e1a9d654ca.jpeg')
    george = User(
        username='George', email='george@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/d4be06c9a5a24d5bad74ae797a39faf3.jpeg')
    elon = User(
        username='Elon', email='elon@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/3e2e5ccc960f4b1da76fd197e1fda757.jpeg')
    oprah = User(
        username='Oprah', email='oprah@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/00b1afba7cc44cc7802b09c069410518.jpeg')
    buzz = User(
        username='Buzz', email='buzz@aa.io', password='password',pic='https://itweetbucket.s3.amazonaws.com/089c2fb4074e40b5a0387f8f35c36c6b.jpeg')

    db.session.add(demo)
    db.session.add(homer)
    db.session.add(isaac)
    db.session.add(elmo)
    db.session.add(ringo)
    db.session.add(et)
    db.session.add(snoop)
    db.session.add(george)
    db.session.add(elon)
    db.session.add(oprah)
    db.session.add(buzz)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
