from app import app
from image.models import Image


@app.route('/images', methods=['GET'])
def read_all_images():
    return Image().read_all()


@app.route('/image', methods=['GET'])
def read_image():
    return Image().read()


@app.route('/image', methods=['POST'])
def write_image():
    return Image().write()


@app.route('/image', methods=['PUT'])
def update_image():
    return Image().update()
@ app.route('/image', methods=['DELETE'])
def delete_image():
    return Image().delete()
