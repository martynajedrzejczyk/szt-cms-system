import datetime
from bson import json_util
from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:

  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['user'] = user
    return jsonify(user), 200

  def signup(self):
    print(request.form)

    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "name": request.form.get('name'),
      "surname": request.form.get('surname'),
      "email": request.form.get('email'),
      "password": request.form.get('password'),
      "created_at": datetime.datetime.today(),
      "last_login": datetime.datetime.today(),
      "last_ip": str(request.environ.get('HTTP_X_REAL_IP', request.remote_addr))
    }
    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])
    # Check for existing email address
    if db["User"].find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if db["User"].insert_one(user):
      return self.start_session(user)

    return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def login(self):

    user = db["User"].find_one({
      "email": request.form.get('email')
    })
    if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401

  def read_all(self):
    try:
      document = list(db['User'].find())
      for user in document:
        user['_id'] = str(user['_id'])
      if document:
        return json_util.dumps(document), 200
      else:
        return jsonify({'status': 'error', 'message': 'Users not found'}), 400
    except Exception as e:
      return jsonify({'status': 'error', 'message': str(e)}), 400

  def read(self):
    try:
      data = request.get_json()
      document = db['User'].find_one({'name': data['name']})
      if document:
        document['_id'] = str(document['_id'])
        return json_util.dumps(document), 200
      else:
        return jsonify({'status': 'error', 'message': 'City not found'}), 400
    except Exception as e:
      return jsonify({'status': 'error', 'message': str(e)}), 400
