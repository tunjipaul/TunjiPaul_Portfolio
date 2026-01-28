"""Initial baseline migration

Revision ID: baseline_2026_01_28
Revises: 
Create Date: 2026-01-28 14:50:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'baseline_2026_01_28'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Baseline migration - tables already exist in database."""
    # No operations - this is a baseline migration
    # All tables (users, hero, about, projects, messages, skills, documents)
    # already exist in the database from create_tables()
    pass


def downgrade() -> None:
    """Baseline migration - cannot downgrade from baseline."""
    # No operations - this is a baseline migration
    pass
