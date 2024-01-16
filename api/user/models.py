import datetime
from bson import json_util
from flask import jsonify, request, session, redirect, make_response
from app import db
import bcrypt
import uuid


class User:

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        resp = make_response(user)
        resp.set_cookie('_id', user['_id'])
        resp.set_cookie('name', user['name'])
        resp.set_cookie('surname', user['surname'])
        resp.set_cookie('email', user['email'])
        resp.set_cookie('created_at', str(user['created_at']))
        resp.set_cookie('last_login', str(user['last_login']))
        resp.set_cookie('last_ip', user['last_ip'])
        return resp, 200

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
        user['password'] = bcrypt.hashpw(user['password'].encode(), bcrypt.gensalt())
        # Check for existing email address
        if db["User"].find_one({"email": user['email']}):
            return jsonify({"error": "Email address already in use"}), 400

        if db["User"].insert_one(user):
            return self.start_session(user)

        return jsonify({"error": "Signup failed"}), 400

    def signout(self):
        session.clear()
        resp = make_response()
        resp.set_cookie('_id', '')
        resp.set_cookie('name', '')
        resp.set_cookie('surname', '')
        resp.set_cookie('email', '')
        resp.set_cookie('created_at', '')
        resp.set_cookie('last_login', '')
        resp.set_cookie('last_ip', '')
        return resp

    def login(self):

        user = db["User"].find_one({
            "email": request.form.get('email')
        })
        if user and bcrypt.checkpw(request.form.get('password').encode(), user['password']):
            db["User"].update_one({'email': request.form.get('email')},
                                  {'$set': {'last_login': datetime.datetime.today()}})
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401

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
