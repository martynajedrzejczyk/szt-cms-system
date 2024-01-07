from bson import ObjectId
from flask import jsonify, request, abort
from app import db

def convert_object_ids(navigations):
    for navigation in navigations:
        navigation['_id'] = str(navigation['_id'])
    return navigations

class Navigation:

    @staticmethod
    def read_all():
        try:
            navigations = list(db['Navigation'].find())
            if navigations:
                return jsonify(convert_object_ids(navigations)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Navigations not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            navigation = db['Navigation'].find_one({'_id': ObjectId(data['_id'])})
            if navigation:
                return jsonify(convert_object_ids([navigation])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Navigation not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if 'name' not in data or 'visible' not in data or 'order' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400
            new_navigation = {
                'name': data['name'],
                'order': data['order'],
                'visible': data['visible']
            }
            if 'parent_id' in data and data['parent_id']:
                new_navigation['parent_id'] = ObjectId(data['parent_id'])
            result = db['Navigation'].insert_one(new_navigation)

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add navigation'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()
            if 'name' not in update_data or 'visible' not in update_data or 'order' not in update_data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400
            updated_navigation = {
                'name': update_data['name'],
                'order': update_data['order'],
                'visible': update_data['visible']
            }
            if 'parent_id' in update_data and update_data['parent_id']:
                updated_navigation['parent_id'] = ObjectId(update_data['parent_id'])

            result = db['Navigation'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': updated_navigation})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Navigation {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['Navigation'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Navigation {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Navigation {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
