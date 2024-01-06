from app import app
from user.models import User

@app.route('/user/signup', methods=['POST'])
def signup():
  return User().signup()

@app.route('/user/signout')
def signout():
  return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
  return User().login()

@app.route('/users', methods=['GET'])
def read_all_users():
  return User().read_all()
@app.route('/user', methods=['GET'])
def read_user():
  return User().read()
