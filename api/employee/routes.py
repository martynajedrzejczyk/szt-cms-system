from app import app
from employee.models import Employee
from flask_cors import cross_origin

@app.route('/employees', methods=['GET'])
@cross_origin()
def read_all_employees():
    return Employee().read_all()


@app.route('/employee', methods=['GET'])
@cross_origin()
def read_employee():
    return Employee().read()


@app.route('/employee', methods=['POST'])
@cross_origin()
def write_employee():
    return Employee().write()


@app.route('/employee', methods=['PUT'])
@cross_origin()
def update_employee():
    return Employee().update()
@app.route('/employee', methods=['DELETE'])
@cross_origin()
def delete_employee():
    return Employee().delete()
