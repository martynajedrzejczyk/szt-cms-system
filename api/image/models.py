import datetime

from bson import ObjectId
from flask import jsonify, request, abort
from app import db


def convert_object_ids(images):
    for image in images:
        image['_id'] = str(image['_id'])
    return images


class Image:

    @staticmethod
    def read_all():
        try:
            Images = list(db['Image'].find())
            if Images:
                return jsonify(convert_object_ids(Images)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Images not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            image = db['Image'].find_one({'_id': ObjectId(data['_id'])})
            if image:
                return jsonify(convert_object_ids([image])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Image not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if 'name' not in data or 'image_data' not in data or 'order' not in data or 'visible' not in data:
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['Image'].insert_one({
                'name': data['name'],
                'image_data': data['image_data'],
                'order': data['order'],
                'created_at': datetime.datetime.today(),
                'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'{data["name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add image'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    # @staticmethod
    # def update():
    #     DO PRZEDYSKUTOWANIA
    #     try:
    #         update_data = request.get_json()
    #
    #         result = db['Image'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
    #             'name': update_data['name'],
    #             'visible': update_data['visible']
    #         }})
    #
    #         if result.modified_count > 0:
    #             return jsonify({'status': 'success', 'message': f'{update_data["name"]} successfully updated.'}), 200
    #         else:
    #             return jsonify({'status': 'error', 'message': f'Image {update_data["name"]} not found'}), 400
    #     except Exception as e:
    #         return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['Image'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Image {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Image {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
