from app import app
from employee.models import Employee


@app.route('/employees', methods=['GET'])
def read_all_employees():
    return Employee().read_all()


@app.route('/employee', methods=['GET'])
def read_employee():
    return Employee().read()


@app.route('/employee', methods=['POST'])
def write_employee():
    return Employee().write()


@app.route('/employee', methods=['PUT'])
def update_employee():
    return Employee().update()
@ app.route('/employee', methods=['DELETE'])
def delete_employee():
    return Employee().delete()
