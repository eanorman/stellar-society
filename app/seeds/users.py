from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Hackerman', city="Indianapolis", state='Indiana', country="United States of America", bio='hello world', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Brother', city="Colorado Springs", state='Colorado', country="United States of America", bio='hey bestiessss', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Robert', last_name='Smith', city="Miami", state='Florida', country="United States of America", bio='sir, this is a wendys', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    rick = User(
        username='rickrollmaster', email='rick.astley@example.com', password='password', first_name='Rick', last_name="Astley", city='Austin', state='Texas', country="United States of America", bio="never going to give you up", profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    bob=User(
        username='legaleagle', email='bob.loblaw@example.com', password='password', first_name='Bob', last_name='Loblaw', city='New York', state='New York', country='United States of America', bio='I thought that maybe I would stay in and work on my law blog.', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    elon=User(
        username='spacexplorer', email='elon.musk@example.com', password='password', first_name='Elon', last_name='Musk', city='Los Angeles', state='California', country="United States of America", bio='I would like to die on Mars.', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    kitty=User(
        username='meowmaster', email='kitty.purry@example.com', password='password', first_name='Kitty', last_name='Purry', city='Seattle', state='Washington', country='United States of America', bio='meow', profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    chuck=User(
        username='roundhousekicker', email='chuck.norris@example.com', password='password', first_name='Chuck', last_name='Norris', city='Dallas', state='Texas', country='United States of America', bio='The only time you lose at something is when you don\'t learn from that experience',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    hermione=User(
        username='wizardwiz', email='hermione.granger@example.com', password='password', first_name='Hermione', last_name='Granger', city='Portland', state='Oregon', country='United States of America', bio='its leviosa, not leviosaaaa',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    jack=User(
        username='pirateking', email='jack.sparrow@example.com', password='password', first_name='Jack', last_name='Sparrow', city='Gulfport', state='Mississippi', country='United States of America', bio='This is the day you will always remember as the day you almost caught Captain Jack Sparrow',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    daenerys=User(
        username='motherofdragons', email='daenerys.t@example.com', password='password', first_name='Daenerys', last_name='Targaryen', city='Tampa', state='Florida', country='United States of America', bio='And I swear this. If you ever betray me, I\'ll burn you alive.',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    tony=User(
        username='ironmaniac', email='tony.stark@example.com', password='password', first_name='Tony', last_name='Stark', city='San Francisco', state='California', country='United States of America', bio='I am Iron Man.',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")
    groot=User(
        username='iamgroot', email='groot@example.com', password='password', first_name='Groot', last_name='Groot', city='San Francisco', state='California', country='United States of America', bio='I am Groot.',  profile_picture="https://stellar-society.s3.us-east-2.amazonaws.com/default-profile-picture.jpg")



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(rick)
    db.session.add(bob)
    db.session.add(elon)
    db.session.add(kitty)
    db.session.add(chuck)
    db.session.add(hermione)
    db.session.add(jack)
    db.session.add(daenerys)
    db.session.add(tony)
    db.session.add(groot)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
