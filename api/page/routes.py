from app import app
from page.models import Page


@app.route('/pages', methods=['GET'])
def read_all_pages():
    return Page().read_all()


@app.route('/page', methods=['GET'])
def read_page():
    return Page().read()


@app.route('/page', methods=['POST'])
def write_page():
    return Page().write()


@app.route('/page', methods=['PUT'])
def update_page():
    return Page().update()
@ app.route('/page', methods=['DELETE'])
def delete_page():
    return Page().delete()
