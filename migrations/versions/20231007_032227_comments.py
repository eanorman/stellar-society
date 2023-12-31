"""comments

Revision ID: c16e96f022dc
Revises: 03b1827236c9
Create Date: 2023-10-07 03:22:27.055071

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'c16e96f022dc'
down_revision = '03b1827236c9'
branch_labels = None
depends_on = None


def upgrade():
   op.create_table('comments',
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False),
    sa.Column('post_id', sa.Integer(), sa.ForeignKey('posts.post_id', ondelete='CASCADE'), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP),
    sa.PrimaryKeyConstraint('comment_id')
    )
   if environment == "production":
       op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")


def downgrade():
   op.drop_table('comments')
