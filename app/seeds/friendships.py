from app.models import db, Friendship, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friendships():
    demo = Friendship(
        user_id=1, friend_id=2, status="ACCEPTED")
    marnie = Friendship(
        user_id=2, friend_id=3, status="ACCEPTED")
    bobbie = Friendship(
        user_id=3, friend_id=4, status="ACCEPTED")
    rick = Friendship(
        user_id=4, friend_id=5, status="ACCEPTED")
    bob = Friendship(
        user_id=5, friend_id=6, status="ACCEPTED")
    elon = Friendship(
        user_id=6, friend_id=7, status="ACCEPTED")
    kitty = Friendship(
        user_id=7, friend_id=8, status="ACCEPTED")
    chuck = Friendship(
        user_id=8, friend_id=9, status="ACCEPTED")
    hermione = Friendship(
        user_id=9, friend_id=10, status="ACCEPTED")
    jack = Friendship(
        user_id=10, friend_id=11, status="ACCEPTED")
    daenerys = Friendship(
        user_id=11, friend_id=12, status="ACCEPTED")
    tony = Friendship(
        user_id=12, friend_id=13, status="ACCEPTED")
    groot = Friendship(
        user_id=13, friend_id=1, status="ACCEPTED")

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

def undo_friendships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friendships"))

    db.session.commit()
