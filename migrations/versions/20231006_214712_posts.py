"""posts

Revision ID: 03b1827236c9
Revises: ffdc0a98111c
Create Date: 2023-10-06 21:47:12.015433

"""
from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = '03b1827236c9'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
   op.create_table('posts',
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP),
    sa.PrimaryKeyConstraint('post_id')
    )


def downgrade():
   op.drop_table('posts')
