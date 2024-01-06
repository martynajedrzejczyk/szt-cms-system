from app import app
from city.models import City


@app.route('/cities', methods=['GET'])
def read_all_cities():
    return City().read_all()


@app.route('/city', methods=['GET'])
def read_city():
    return City().read()


@app.route('/city', methods=['POST'])
def write_city():
    return City().write()


@app.route('/city', methods=['PUT'])
def update_city():
    return City().update()
@ app.route('/city', methods=['DELETE'])
def delete_city():
    return City().delete()
