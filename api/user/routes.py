from app import app
from user.models import User
from flask_cors import cross_origin

@app.route('/user/signup', methods=['POST'])
@cross_origin()
def signup():
  return User().signup()

@app.route('/user/signout')
@cross_origin()
def signout():
  return User().signout()

@app.route('/user/login', methods=['POST'])
@cross_origin()
def login():
  return User().login()

@app.route('/users', methods=['GET'])
@cross_origin()
def read_all_users():
  return User().read_all()
@app.route('/user', methods=['GET'])
@cross_origin()
def read_user():
  return User().read()
