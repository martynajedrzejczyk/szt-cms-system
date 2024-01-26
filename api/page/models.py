import datetime

from bson import ObjectId
from flask import jsonify, request, abort, session
from app import db

def convert_object_ids(pages):
    for page in pages:
        page['_id'] = str(page['_id'])
    return pages

class Page:

    @staticmethod
    def read_all():
        try:
            pages = list(db['Page'].find())
            if pages:
                return jsonify(convert_object_ids(pages)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Pages not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            page = db['Page'].find_one({'_id': ObjectId(data['_id'])})
            if page:
                return jsonify(convert_object_ids([page])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Page not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if 'name' not in data or 'endpoint' not in data or 'visible' not in data or 'navigation_id' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            total_pages_same_nav_id = db['Page'].count_documents({'navigation_id': data['navigation_id']})
            navigation_order = total_pages_same_nav_id - 1

            result = db['Page'].insert_one({
                'name': data['name'],
                'endpoint': data['endpoint'],
                'created_at': datetime.datetime.today(),
                'created_by': data['user_id'],
                'modified_at': datetime.datetime.today(),
                'modified_by': data['user_id'],
                'visible': data['visible'],
                'navigation_id': data['navigation_id'],
                'navigation_order': navigation_order})

            if result:
                print(str(result.inserted_id))
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.',
                                "page_id": str(result.inserted_id)}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add page'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            result = db['Page'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'name': ['name'],
                'endpoint': update_data['endpoint'],
                'modified_at': datetime.datetime.today(),
                'modified_by': update_data['user_id'],
                'visible': update_data['visible'],
                'navigation_id': update_data['navigation_id'],
                'navigation_order': update_data['navigation_order']}})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Page {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['Page'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Page {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Page {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
