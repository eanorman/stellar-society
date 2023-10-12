"""likes

Revision ID: 2d4e56fb96ae
Revises: 5e13303f4a14
Create Date: 2023-10-07 03:47:52.615933

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '2d4e56fb96ae'
down_revision = '5e13303f4a14'
branch_labels = None
depends_on = None


def upgrade():
   op.create_table('likes',
    sa.Column('like_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
    sa.Column('post_id', sa.Integer(), sa.ForeignKey('posts.post_id'), nullable=False),
    sa.PrimaryKeyConstraint('like_id')
    )

   if environment == "production":
       op.execute(f"ALTER TABLE likes SET SCHEMA {SCHEMA};")

def downgrade():
   op.drop_table('likes')
