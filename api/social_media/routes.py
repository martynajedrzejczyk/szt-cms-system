from app import app
from social_media.models import Social_media


@app.route('/socials', methods=['GET'])
def read_all_socials():
    return Social_media().read_all()


@app.route('/social_media', methods=['GET'])
def read_social_media():
    return Social_media().read()


@app.route('/social_media', methods=['POST'])
def write_social_media():
    return Social_media().write()


@app.route('/social_media', methods=['PUT'])
def update_social_media():
    return Social_media().update()
@ app.route('/social_media', methods=['DELETE'])
def delete_social_media():
    return Social_media().delete()
