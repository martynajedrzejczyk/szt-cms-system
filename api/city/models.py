from bson import json_util
from flask import jsonify, request
from app import db


class City:

    def read_all(self):
        try:
            document = list(db['City'].find())
            for city in document:
                city['_id'] = str(city['_id'])
            if document:
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Cities not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def read(self):
        try:
            data = request.get_json()
            document = db['City'].find_one({'name': data['name']})
            if document:
                document['_id'] = str(document['_id'])
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'City not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def write(self):
        try:
            data = request.get_json()

            if 'name' not in data or 'visible' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'})
            result = db['City'].insert_one({'name': data['name'], 'visible': data['visible']})

            if result:
                return jsonify(data['name'], ' successfully inserted.'), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add city'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def update(self):
        try:
            update_data = request.get_json()

            if 'name' not in update_data or 'visible' not in update_data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'})
            existing_city = db['City'].find_one({'name': update_data['name']})
            if existing_city:
                db['City'].update_one({'name': update_data['name']}, {'$set': {'name': update_data['name'],
                                                                               'visible': update_data['visible']}})
                return jsonify(update_data['name'], ' successfully updated.'), 200
            else:
                return jsonify({'status': 'error', 'message': f'City {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def delete(self):
        try:
            data = request.get_json()
            existing_city = db['City'].find_one({'name': data['name']})
            if existing_city:
                db['City'].delete_one({'name': data['name']})
                return jsonify(
                    {'status': 'success', 'message': f"City {data['name']} deleted successfully"}), 200
            else:
                return jsonify({'status': 'error', 'message': f"City {data['name']} not found"}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
