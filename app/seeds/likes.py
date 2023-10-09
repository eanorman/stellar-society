from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    demo = Like(
        user_id=1, post_id=2)
    marnie = Like(
        user_id=2, post_id=3)
    bobbie = Like(
        user_id=3, post_id=4)
    rick = Like(
        user_id=4, post_id=5)
    bob = Like(
        user_id=5, post_id=6)
    elon = Like(
        user_id=6, post_id=7)
    kitty = Like(
        user_id=7, post_id=8)
    chuck= Like(
        user_id=8, post_id=9)
    hermione = Like(
        user_id=9, post_id=10)
    jack = Like(
        user_id=10, post_id=11)
    daenerys = Like(
        user_id=11, post_id=12)
    tony = Like(
        user_id=12, post_id=13)
    groot = Like(
        user_id=13, post_id=1)

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



def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
