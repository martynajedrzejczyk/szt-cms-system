from bson import ObjectId
from flask import jsonify, request, abort
from app import db

def convert_object_ids(socials):
    for social_media in socials:
        social_media['_id'] = str(social_media['_id'])
    return socials

class Social_media:

    @staticmethod
    def read_all():
        try:
            social_media = list(db['SocialMedia'].find())
            if social_media:
                return jsonify(convert_object_ids(social_media)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Social media not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            social_media = db['SocialMedia'].find_one({'_id': ObjectId(data['_id'])})
            if social_media:
                return jsonify(convert_object_ids([social_media])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Social media not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if 'name' not in data or 'link' not in data or 'icon' not in data or 'visible' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['SocialMedia'].insert_one({
                'name': data['name'],
                'link': data['link'],
                'icon': data['icon'],
                'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add Social media'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            result = db['SocialMedia'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'name': update_data['name'],
                'link': update_data['link'],
                'icon': update_data['icon'],
                'visible': update_data['visible']}})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Social media {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['SocialMedia'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Social media {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Social media {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
