import datetime

from bson import json_util
from flask import jsonify, request, session
from app import db
from bson import ObjectId


class Opinion:

    def read_all(self):
        try:
            document = list(db['Opinion'].find())
            for opinion in document:
                opinion['_id'] = str(opinion['_id'])
            if document:
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinions not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def read(self):
        try:
            data = request.get_json()
            document = db['Opinion'].find_one({'_id': ObjectId(data['_id'])})
            if document:
                document['_id'] = str(document['_id'])
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Opinion not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def write(self):
        try:
            data = request.get_json()

            if ('stars' not in data or
                    'author_nick' not in data or 'description' not in data):
                return jsonify({'status': 'error', 'message': 'Missing required fields'})
            result = db['Opinion'].insert_one({'stars': data['stars'], 'author_nick': data['author_nick'],
                                               'description': data['description'], 'status': 'PENDING',
                                               'moderated_at': datetime.datetime.today(),
                                               'moderated_by': session['user']['_id']})

            if result:
                return jsonify(data['name'], ' successfully inserted.'), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add opinion'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def update(self):
        try:
            update_data = request.get_json()

            if '_id' not in update_data or 'status' not in update_data or 'reason' not in update_data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'})
            existing_opinion = db['Opinion'].find_one({'_id': ObjectId(update_data['_id'])})
            if existing_opinion:
                db['Opinon'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {'status': update_data['status'],
                                                                               'reason': update_data['reason'],
                                                                               'moderated_at': datetime.datetime.today(),
                                                                               'moderated_by': session['user']['_id']}})
                return jsonify('Opinon successfully updated.'), 200
            else:
                return jsonify({'status': 'error', 'message': f'Opinion not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def delete(self):
        try:
            data = request.get_json()
            existing_opinion = db['Opinion'].find_one({'_id': ObjectId(data['_id'])})
            if existing_opinion:
                db['Opinion'].delete_one({'_id': ObjectId(data['_id'])})
                return jsonify(
                    {'status': 'success', 'message': f"Opinion deleted successfully"}), 200
            else:
                return jsonify({'status': 'error', 'message': f"Opinion not found"}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
