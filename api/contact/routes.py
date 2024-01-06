from app import app
from contact.models import Contact


@app.route('/contacts', methods=['GET'])
def read_all_contacts():
    return Contact().read_all()


@app.route('/contact', methods=['GET'])
def read_contact():
    return Contact().read()


@app.route('/contact', methods=['POST'])
def write_contact():
    return Contact().write()


@app.route('/contact', methods=['PUT'])
def update_contact():
    Contact.delete()
    return Contact().write()
@ app.route('/contact', methods=['DELETE'])
def delete_contact():
    return Contact().delete()
