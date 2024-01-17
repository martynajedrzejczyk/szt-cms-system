import datetime

from bson import ObjectId
from flask import jsonify, request, abort, session
from app import db

def convert_object_ids(services):
    for service in services:
        service['_id'] = str(service['_id'])
    return services

class Service:

    @staticmethod
    def read_all():
        try:
            cities = list(db['Service'].find())
            if cities:
                return jsonify(convert_object_ids(cities)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Services not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            service = db['Service'].find_one({'_id': ObjectId(data['_id'])})
            if service:
                return jsonify(convert_object_ids([service])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Service not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if ('name' not in data or 'visible' not in data or 'description'
            not in data or 'price' not in data):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['Service'].insert_one({
                'name': data['name'],
                'description': data['description'],
                'price': data['price'],
                'created_at': datetime.datetime.today(),
                'created_by': request.cookies.get('_id'),
                'modified_at': datetime.datetime.today(),
                'modified_by': request.cookies.get('_id'),
                'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add service'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            result = db['Service'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'name': update_data['name'],
                'description': update_data['description'],
                'price': update_data['price'],
                'modified_at': datetime.datetime.today(),
                'modified_by': request.cookies.get('_id'),
                'visible': update_data['visible']
            }})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Service {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['Service'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Service {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Service {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
