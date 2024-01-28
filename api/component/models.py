from bson import ObjectId
from flask import jsonify, request, abort
from app import db


def convert_object_ids(components):
    for component in components:
        component['_id'] = str(component['_id'])
    return components


class Component:

    @staticmethod
    def read_all():
        try:
            components = list(db['Component'].find())
            if components:
                return jsonify(convert_object_ids(components)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Components not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            component = db['Component'].find_one({'_id': ObjectId(data['_id'])})
            if component:
                return jsonify(convert_object_ids([component])), 200
            else:
                return jsonify({'status': 'error', 'message': 'Component not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def readByPageId():
        try:
            data = request.args

            if data.get('page_id') is not None:
                components = db['Component'].find({'page_id': data.get('page_id')})
                components_list = list(components)

                if components_list:
                    return jsonify(convert_object_ids(components_list)), 200
                else:
                    return jsonify({'status': 'empty', 'message': 'No components found for the given page_id'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'page_id not provided in the request'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()
            if ('order_number' not in data or 'component_type' not in data or 'propTextShort' not in data
                    or 'propTextMid' not in data
                    or 'propTextLong' not in data or 'propImages'
                    not in data or 'visible' not in data):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            existing_component = db['Component'].find_one(
                {'page_id': data['page_id'], 'order_number': data['order_number']})
            if existing_component:
                # If a component already exists at the specified order_number, shift the others
                db['Component'].update_many({
                    'order_number': {'$gte': data['order_number']},
                    'page_id': data['page_id']
                }, {'$inc': {'order_number': 1}})

            result = db['Component'].insert_one({
                'page_id': data['page_id'],
                'order_number': data['order_number'],
                'component_type': data['component_type'],
                'propTextShort': data['propTextShort'],
                'propTextMid': data['propTextMid'],
                'propTextLong': data['propTextLong'],
                'propImages': data['propImages'],
                'visible': data['visible']})

            if result:
                return jsonify({'status': 'success', 'message': f'Component successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add component'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            existing_component = db['Component'].find_one({'page_id': update_data['page_id'],
                                                           'order_number': update_data['order_number']})
            if existing_component:
                # If a component already exists at the specified order_number, shift the others
                db['Component'].update_many({
                    'order_number': {'$gte': update_data['order_number']},
                    'page_id': update_data['page_id'],
                    '_id': {'$ne': ObjectId(update_data['_id'])}
                }, {'$inc': {'order_number': 1}})

            result = db['Component'].update_one({'_id': ObjectId(update_data['_id'])}, {'$set': {
                'page_id': update_data['page_id'],
                'order_number': update_data['order_number'],
                'propTextShort': update_data['propTextShort'],
                'propTextMid': update_data['propTextMid'],
                'propTextLong': update_data['propTextLong'],
                'propImages': update_data['propImages'],
                'visible': update_data['visible']
            }})

            if result.modified_count > 0:
                return jsonify({'status': 'success', 'message': f'Component successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Component not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()

            component_to_delete = db['Component'].find_one({'_id': ObjectId(data['_id'])})
            if not component_to_delete:
                return jsonify({'status': 'error', 'message': f'Component {data["_id"]} not found'}), 400

            current_order = component_to_delete['order_number']

            result = db['Component'].delete_one({'_id': ObjectId(data['_id'])})

            if result.deleted_count > 0:
                # Shift the components below the deleted one by decrementing their order_number
                db['Component'].update_many({
                    'order_number': {'$gt': current_order},
                    'page_id': component_to_delete['page_id']
                }, {'$inc': {'order_number': -1}})
                return jsonify({'status': 'success', 'message': f'Component {data["_id"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Component {data["_id"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
