from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired
from app.models import User

class ProfilePictureForm(FlaskForm):
    profile_picture = FileField('profile_picture', validators=[FileRequired()])
