from app import app
from component_type.models import Component_type


@app.route('/component_types', methods=['GET'])
def read_all_component_types():
    return Component_type().read_all()


@app.route('/component_type', methods=['GET'])
def read_component_type():
    return Component_type().read()


@app.route('/component_type', methods=['POST'])
def write_component_type():
    return Component_type().write()


@app.route('/component_type', methods=['PUT'])
def update_component_type():
    return Component_type().update()


@app.route('/component_type', methods=['DELETE'])
def delete_component_type():
    return Component_type().delete()
