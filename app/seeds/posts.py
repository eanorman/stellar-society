from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    demo = Post(
        user_id=1, content='hello world')
    marnie = Post(
        user_id=2, content='heyyyy bestieeessss')
    bobbie = Post(
       user_id=3, content='yay!')
    rick = Post(
        user_id=4, content='Never going to let you down')
    bob = Post(
        user_id=5, content='Ah, yes. The "Bob Loblaw Law Blog". You, sir, are a mouthful.')
    elon = Post(
        user_id=6, content='who wants to go to Mars?')
    kitty = Post(
        user_id=7, content='meeeeoooowwww')
    chuck = Post(
        user_id=8, content='I don\'t initiate violence, I retaliate.')
    hermione = Post(
        user_id=9, content='Honestly, don\'t you two read?')
    jack = Post(
        user_id=10, content='Better not to know which moment may be your last')
    daenerys = Post(
        user_id=11, content='I\'m no ordinary woman. My dreams come true.')
    tony = Post(
        user_id=12, content='Sometimes you gotta run before you can walk')
    groot = Post(
        user_id=13, content='I. Am. Groot.')

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



def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
