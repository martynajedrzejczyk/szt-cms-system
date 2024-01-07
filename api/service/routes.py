from app import app
from service.models import Service


@app.route('/services', methods=['GET'])
def read_all_services():
    return Service().read_all()


@app.route('/service', methods=['GET'])
def read_service():
    return Service().read()


@app.route('/service', methods=['POST'])
def write_service():
    return Service().write()


@app.route('/service', methods=['PUT'])
def update_service():
    return Service().update()
@ app.route('/service', methods=['DELETE'])
def delete_service():
    return Service().delete()
