import datetime
from bson import ObjectId, json_util
from flask import jsonify, request, session
from app import db

def convert_object_ids(opinions):
    for opinion in opinions:
        opinion['_id'] = str(opinion['_id'])
    return opinions

class Opinion:

    @staticmethod
    def read_all():
        try:
            opinions = list(db['Opinion'].find())
            if opinions:
                return jsonify(convert_object_ids(opinions)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinions not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            opinion = db['Opinion'].find_one({'_id': ObjectId(data['_id'])})
            if opinion:
                opinion['_id'] = str(opinion['_id'])
                return jsonify(opinion), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinion not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()

            required_fields = ['stars', 'author_nick', 'description']
            if not all(field in data for field in required_fields):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['Opinion'].insert_one({
                'stars': data['stars'],
                'author_nick': data['author_nick'],
                'description': data['description'],
                'status': data['status'],
                'moderated_at': datetime.datetime.today(),
                'moderated_by': data['user_id']
            })

            if result:
                return jsonify({'status': 'success', 'message': 'Opinion successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add opinion'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            required_fields = ['_id', 'status', 'reason']
            if not all(field in update_data for field in required_fields):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            existing_opinion = db['Opinion'].find_one({'_id': ObjectId(update_data['_id'])})
            if existing_opinion:
                db['Opinion'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                    'status': update_data['status'],
                    'reason': update_data['reason'],
                    'moderated_at': datetime.datetime.today(),
                    'moderated_by': update_data['user_id']
                }})
                return jsonify({'status': 'success', 'message': 'Opinion successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinion not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            existing_opinion = db['Opinion'].find_one({'_id': ObjectId(data['_id'])})
            if existing_opinion:
                db['Opinion'].delete_one({'_id': ObjectId(data['_id'])})
                return jsonify({'status': 'success', 'message': 'Opinion deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinion not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
