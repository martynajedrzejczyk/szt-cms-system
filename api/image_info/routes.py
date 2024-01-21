from app import app
from image.models import Image

@app.route('/image_info', methods=['GET'])
def read_image_info():
    return Image().read()

@app.route('/image_info', methods=['POST'])
def write_image_info():
    return Image().write()

@ app.route('/image_info', methods=['DELETE'])
def delete_image_info():
    return Image().delete()
