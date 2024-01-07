from bson import json_util, ObjectId
from flask import jsonify, request
from app import db

def convert_object_ids(component_types):
    for component_type in component_types:
        component_type['_id'] = str(component_type['_id'])
    return component_types

class Component_type:

    @staticmethod
    def read_all():
        try:
            component_types = list(db['Component_type'].find())
            if component_types:
                return jsonify(convert_object_ids(component_types)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Component types not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            component_type = db['Component_type'].find_one({'_id': ObjectId(data['_id'])})
            if component_type:
                component_type['_id'] = str(component_type['_id'])
                return jsonify(component_type), 200
            else:
                return jsonify({'status': 'error', 'message': 'Component type not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()

            if 'name' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required field'}), 400

            result = db['Component_type'].insert_one({'name': data['name']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add component type'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            if 'name' not in update_data:
                return jsonify({'status': 'error', 'message': 'Missing required field'}), 400

            existing_component_type = db['Component_type'].find_one({'_id': ObjectId(update_data['_id'])})
            if existing_component_type:
                db['Component_type'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {'name': update_data['name']}})
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Component type {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            existing_component_type = db['Component_type'].find_one({'_id': ObjectId(data['_id'])})
            if existing_component_type:
                db['Component_type'].delete_one({'_id': ObjectId(data['_id'])})
                return jsonify({'status': 'success', 'message': f'Component type {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Component type {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
