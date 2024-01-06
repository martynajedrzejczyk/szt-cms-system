from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo
from pymongo.server_api import ServerApi
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

# Database
uri = "mongodb+srv://123:123@sztcluster.edm9ind.mongodb.net/?retryWrites=true&w=majority"
# Database
client = pymongo.MongoClient(uri,  server_api=ServerApi('1'))
db = client["SZT_DB"]

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
import city.routes
import user.routes
import component_type.routes
import contact.routes
import opinion.routes

@app.route('/')
@cross_origin()
def home():
  return render_template('home.html')

@app.route('/dashboard/')
@login_required
def dashboard():
  return render_template('dashboard.html')