from app import app
from image.models import Image


@app.route('/image', methods=['GET'])
def read_image():
    return Image().read()


@app.route('/image', methods=['POST'])
def write_image():
    return Image().write()


@app.route('/image', methods=['DELETE'])
def delete_image():
    return Image().delete()
