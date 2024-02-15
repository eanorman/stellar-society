from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class NoNumbersOrSymbols(object):
    def __init__(self, message=None):
        if not message:
            message = 'Field must not contain numbers or symbols.'
        self.message = message

    def __call__(self, form, field):
        if any(char.isdigit() or not char.isalnum() for char in field.data):
            raise ValidationError(self.message)

class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired(), NoNumbersOrSymbols()])
    last_name = StringField('Last Name', validators=[DataRequired(), NoNumbersOrSymbols()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    bio = TextAreaField('Bio')