from app import app
from opinion.models import Opinion


@app.route('/opinions', methods=['GET'])
def read_all_opinions():
    return Opinion().read_all()


@app.route('/opinion', methods=['GET'])
def read_opinion():
    return Opinion().read()


@app.route('/opinion', methods=['POST'])
def write_opinion():
    return Opinion().write()


@app.route('/opinion', methods=['PUT'])
def update_opinion():
    return Opinion().update()
@ app.route('/opinion', methods=['DELETE'])
def delete_opinion():
    return Opinion().delete()
