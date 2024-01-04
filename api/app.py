from functools import wraps

import pymongo
from pymongo.server_api import ServerApi
from flask import Flask, render_template, session, redirect

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'
uri = "mongodb+srv://123:123@sztcluster.edm9ind.mongodb.net/?retryWrites=true&w=majority"
# Database
client = pymongo.MongoClient(uri,  server_api=ServerApi('1'))
db = client["SZT_DB"]
client.admin.command('ping')
print("Pinged your deployment. You successfully connected to MongoDB!")


# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')

    return wrap


# Routes


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/dashboard/')
@login_required
def dashboard():
    return render_template('dashboard.html')