from bson import json_util
from flask import jsonify, request
from app import db


class Component_type:

    def read_all(self):
        try:
            document = list(db['Component_type'].find())
            for component_type in document:
                component_type['_id'] = str(component_type['_id'])
            if document:
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Component types not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def read(self):
        try:
            data = request.get_json()
            document = db['Component_type'].find_one({'_id': data['_id']})
            if document:
                document['_id'] = str(document['_id'])
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Component type not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def write(self):
        try:
            data = request.get_json()

            if 'name' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required field'})
            result = db['Component_type'].insert_one({'name': data['name']})

            if result:
                return jsonify(data['name'], ' successfully inserted.'), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add component type'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def update(self):
        try:
            update_data = request.get_json()

            if 'name' not in update_data:
                return jsonify({'status': 'error', 'message': 'Missing required field'})
            existing_component_type = db['Component_type'].find_one({'_id': update_data['_id']})
            if existing_component_type:
                db['Component_type'].update_one({'name': update_data['name']}, {'$set': {'name': update_data['name']}})
                return jsonify(update_data['name'], ' successfully updated.'), 200
            else:
                return jsonify({'status': 'error', 'message': f'Component type {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def delete(self):
        try:
            data = request.get_json()
            existing_component_type = db['Component_type'].find_one({'_id': data['_id']})
            if existing_component_type:
                db['Component_type'].delete_one({'name': request.args.get('name')})
                return jsonify(
                    {'status': 'success', 'message': f"Component type {data['_id']} deleted successfully"}), 200
            else:
                return jsonify({'status': 'error', 'message': f"Component type {data['_id']} not found"}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
