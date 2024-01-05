from app import app
from city.models import City


@app.route('/cities', methods=['GET'])
def read_all():
    return City().read_all()


@app.route('/city', methods=['GET'])
def read():
    return City().read()


@app.route('/city', methods=['POST'])
def write():
    return City().write()


@app.route('/city', methods=['PUT'])
def update():
    return City().update()
@ app.route('/city', methods=['DELETE'])
def delete():
    return City().delete()
