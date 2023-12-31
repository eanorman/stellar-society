# Stellar Society :sparkles:
__Stellar Society__ is a social media website made for gamers, nerds and anyone in between. __Stellar Society__ is a place to find new friends or reconnect with old friends. Dive into a universe where your passions are _celebrated!_

## Technologies Used
![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

## Table Of Contents 📔
- 🌑 [Introduction](#introduction)
- 🌒 [Features](#features-)
- 🌓 [User Story](#user-story-)
  - 🌔 [Users](#users-)
  - 🌕 [Friends](#friends-)
  - 🌖 [Posts](#posts-)
  - 🌗 [Comments](#comments-)
  - 🌑 [Likes](#likes-%EF%B8%8F)
- 🌒 [Database Schema](#database-schema)

## Introduction👾 
Greetings Earthlings! Stellar Society is made with the gaming and nerd community in mind. Our mission is to provide a space where you can:
 - :star: Create your profile
 - :star: Connect with like-minded individuals who share your interests
 - :star: Share your achievements, projects and anything at all

## Features 🚀 
 - :star2: Create a profile and add a profile picture and a bio so other people can get to know you!
 - :star2: Create posts with text or pictures to show the universe
 - :star2: Comment on other posts and make new friends
 - :star2: Like posts you find throughout the galaxy 
 - :star2: Add your friends or create new ones

## User Story 📖
### Users 🧑‍🚀
 _Sign Up_
 - As a new user, I should be able to sign up for a new account with valid information.
 
 _Log In_
 - As an existing user, I should be able to log in using the information provided during sign up.
 
 _Delete Account_
 - As an existing user, I should be able to completely delete my account, photos, posts, comments and likes.

### Friends 🌌
_Add Friend_
- As a logged in user, I should be able to add friends.

_Delete Friend_
- As a logged in user, I should be able to delete friends from my friend list.

### Posts 📢
 _Create Posts_
 - As a logged in user, I should be able to create a new post with text and/or a photo. I should be able to indicate if this is a public post, friends only, or only me post.
 
 _View Posts_
 - As a logged in user, I should be able to view posts that are mine, public, or my friends.
 
 _Edit Posts_
 - As a logged in user, I should be able to edit my posts.
 
 _Delete Posts_
 -As a logged in user, I should be able to delete my posts.

### Comments 📝
_Create Comments_
- As a logged in user, I should be able to comment on posts that I can view.

_View Comments_
- As a logged in user, I should be able to view the comment section on any post I'm able to view.

_Edit Comments_
- As a logged in user, I should be able to edit my comments on posts I've commented on.

_Delete Comments_
- As a logged in user, I should be able to delete my comments on any posts I've commented on.

### Likes ❤️
_Like Posts_
- As a logged in user, I should be able to like posts I'm able to view

_Unlike Posts_
- As a logged in user, I should be able to unlike posts I've previously liked.

_View Likes_
- As a logged in user, I should be able to view who liked the post I'm able to view.

## Database Schema
![database_schema](https://github.com/eanorman/stellar-society/blob/main/docs/StellarSociety.png?raw=true)

## Installing Locally
1. Clone this repository:
`https://github.com/eanorman/stellar-society.git`
2. Install Python dependencies with the command: `pipenv install -r requirements.txt`
3. Create a .env file in the root directory using the .env.example provided
4. Create the database using the commands: `pipenv run flask db upgrade` `pipenv run flask seed all`
5. Change directory to react-app and run `npm install` and `npm start`
6. Enjoy! :star:
