import datetime

from bson import ObjectId
from flask import jsonify, request, session, make_response
from app import db

def convert_object_ids(employees):
    for employee in employees:
        employee['_id'] = str(employee['_id'])
    return employees

class Employee:

    @staticmethod
    def read_all():
        try:
            employees = list(db['Employee'].find())
            if employees:
                resp = make_response(jsonify(convert_object_ids(employees)))
               
                return resp, 200
            else:
                return jsonify({'status': 'error', 'message': 'Employees not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            employee = db['Employee'].find_one({'_id': ObjectId(data['_id'])})
            if employee:
                return jsonify(convert_object_ids([employee])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Employee not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if ('name' not in data or 'surname' not in data or
                'image' not in data or 'description'
                not in data or 'city' not in data or 'visible' not in data):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['Employee'].insert_one({
                'name': data['name'],
                'surname': data['surname'],
                'image': data['image'],
                'description': data['description'],
                'city': data['city'],
                'created_at': datetime.datetime.today(),
                'created_by': data['user_id'],
                'modified_at': datetime.datetime.today(),
                'modified_by': data['user_id'],
                'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add employee'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()
            result = db['Employee'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'name': update_data['name'],
                'surname': update_data['surname'],
                'image': update_data['image'],
                'description': update_data['description'],
                'city': update_data['city'],
                'modified_by': update_data['user_id'],
                'modified_at': datetime.datetime.today(),
                'visible': update_data['visible']}})
            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Employee {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['Employee'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Employee {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Employee {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
