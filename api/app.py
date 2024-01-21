from flask import Flask, render_template, session, redirect
from functools import wraps
import pymongo
from pymongo.server_api import ServerApi
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app,  resources={r"/foo": {"origins": "http://localhost:3000"}}, supports_credentials=True)
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
import component.routes
import component_type.routes
import contact.routes
import employee.routes
import image.routes
import image_info.routes
import navigation.routes
import opinion.routes
import page.routes
import service.routes
import social_media.routes
import user.routes

@app.after_request
def creds(response):
    response.headers.set('Access-Control-Allow-Origin', "http://localhost:3000")
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route('/')
@cross_origin()
def home():
  return render_template('home.html')

@app.route('/dashboard/')
@login_required
@cross_origin()
def dashboard():
  return render_template('dashboard.html')