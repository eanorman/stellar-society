"""photos

Revision ID: c8320a7766c3
Revises: 2d4e56fb96ae
Create Date: 2023-10-07 03:47:57.446787

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'c8320a7766c3'
down_revision = '2d4e56fb96ae'
branch_labels = None
depends_on = None


def upgrade():
   op.create_table('photos',
    sa.Column('photo_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False),
    sa.Column('post_id', sa.Integer(), sa.ForeignKey('posts.post_id', ondelete='CASCADE'), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP),
    sa.PrimaryKeyConstraint('photo_id')
    )

   if environment == "production":
      op.execute(f"ALTER TABLE photos SET SCHEMA {SCHEMA};")


def downgrade():
   op.drop_table('photos')
