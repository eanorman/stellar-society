from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    demo = Comment(
        user_id=1, post_id=2, content="awesome")
    marnie = Comment(
        user_id=2, post_id=3, content="cool")
    bobbie = Comment(
        user_id=3, post_id=4, content="no thank you")
    rick = Comment(
        user_id=4, post_id=5, content="interesting")
    bob = Comment(
        user_id=5, post_id=6, content="I'll stay here.")
    elon = Comment(
        user_id=6, post_id=7, content="mewow")
    kitty = Comment(
        user_id=7, post_id=8, content="be kind")
    chuck = Comment(
        user_id=8, post_id=9, content="sometimes")
    hermione = Comment(
        user_id=9, post_id=10, content="Very true.")
    jack = Comment(
        user_id=10, post_id=11, content="Cool dragons")
    daenerys = Comment(
        user_id=11, post_id=12, content="I think you have that backwards.")
    tony = Comment(
        user_id=12, post_id=13, content="Groot")
    groot = Comment(
        user_id=13, post_id=1, content="I am Groot.")

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

def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
