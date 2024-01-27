from app import app
from component.models import Component


@app.route('/components', methods=['GET'])
def read_all_components():
    return Component().read_all()


@app.route('/component', methods=['GET'])
def read_component():
    return Component().read()

@app.route('/componentsOfPage', methods=['GET'])
def read_components_of_page():
    return Component().readByPageId()


@app.route('/component', methods=['POST'])
def write_component():
    return Component().write()


@app.route('/component', methods=['PUT'])
def update_component():
    return Component().update()
@ app.route('/component', methods=['DELETE'])
def delete_component():
    return Component().delete()
