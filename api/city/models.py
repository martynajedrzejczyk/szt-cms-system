from bson import ObjectId
from flask import jsonify, request, abort
from app import db

def convert_object_ids(cities):
    for city in cities:
        city['_id'] = str(city['_id'])
    return cities

class City:

    @staticmethod
    def read_all():
        try:
            cities = list(db['City'].find())
            if cities:
                return jsonify(convert_object_ids(cities)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Cities not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            city = db['City'].find_one({'_id': ObjectId(data['_id'])})
            if city:
                return jsonify(convert_object_ids([city])), 200
            else:
                return jsonify({'status': 'error', 'message': 'City not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if 'name' not in data or 'visible' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['City'].insert_one({'name': data['name'], 'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add city'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            result = db['City'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'name': update_data['name'],
                'visible': update_data['visible']
            }})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'City {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['City'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'City {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'City {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
