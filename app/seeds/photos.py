from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photos():
    demo = Photo(
        user_id=1, post_id=1, image="https://stellar-society.s3.us-east-2.amazonaws.com/1334197.jpg")
    marnie = Photo(
        user_id=2, post_id=2, image="https://stellar-society.s3.us-east-2.amazonaws.com/1334197.jpg")
    kitty = Photo(
        user_id=7, post_id=7, image="https://stellar-society.s3.us-east-2.amazonaws.com/1334197.jpg")


    db.session.add(demo)
    db.session.add(kitty)
    db.session.add(marnie)
    db.session.commit()


def undo_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
