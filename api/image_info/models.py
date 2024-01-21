import datetime

from bson import ObjectId
from flask import jsonify, request
from app import db


def convert_object_ids(images):
    for image in images:
        image['_id'] = str(image['_id'])
    return images


class Image_info:

    @staticmethod
    def read():
        try:
            data = request.get_json()
            image = db['ImageInfo'].find_one({'_id': ObjectId(data['_id'])})
            if image:
                return jsonify(convert_object_ids([image])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Image not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write(name, order, created_by, visible):
        try:
            result = db['ImageInfo'].insert_one({
                'name': name,
                'order': order,
                'created_at': datetime.datetime.today(),
                'created_by': created_by,
                'visible': visible})

            if result:
                print(result.inserted_id)
                return result.inserted_id
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add image'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            result = db['ImageInfo'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                return jsonify({'status': 'success', 'message': f'Image {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Image {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
