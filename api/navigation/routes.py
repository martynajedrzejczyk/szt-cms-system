from app import app
from navigation.models import Navigation


@app.route('/navigations', methods=['GET'])
def read_all_navigations():
    return Navigation().read_all()


@app.route('/navigation', methods=['GET'])
def read_navigation():
    return Navigation().read()


@app.route('/navigation', methods=['POST'])
def write_navigation():
    return Navigation().write()


@app.route('/navigation', methods=['PUT'])
def update_navigation():
    return Navigation().update()
@ app.route('/navigation', methods=['DELETE'])
def delete_navigation():
    return Navigation().delete()
