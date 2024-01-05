from app import app
from models.city import City

@app.route('/city', methods=['GET'])
def signup():
  return City().get_city()

@app.route('/cities')
def signout():
  return City.get_all_cities()