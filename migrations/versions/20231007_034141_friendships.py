"""friendships

Revision ID: 5e13303f4a14
Revises: c16e96f022dc
Create Date: 2023-10-07 03:41:41.319567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e13303f4a14'
down_revision = 'c16e96f022dc'
branch_labels = None
depends_on = None

def upgrade():
   op.create_table('friendships',
    sa.Column('friendship_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
    sa.Column('friend_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('friendship_id')
    )


def downgrade():
   op.drop_table('friendships')
