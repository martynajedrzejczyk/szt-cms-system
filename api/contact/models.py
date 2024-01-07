import datetime

from bson import json_util
from flask import jsonify, request, session
from app import db


class Contact:

    def read_all(self):
        try:
            document = list(db['Contact'].find())
            for contact in document:
                contact['_id'] = str(contact['_id'])
            if document:
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Contacts not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def read(self):
        try:
            data = request.get_json()
            document = db['Contact'].find_one({'company_name': data['company_name']})
            if document:
                document['_id'] = str(document['_id'])
                return json_util.dumps(document), 200
            else:
                return jsonify({'status': 'error', 'message': 'Contact not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def write(self):
        try:
            data = request.get_json()

            if ('company_name' not in data
                    or 'phone_number' not in data or 'street' not in data
                    or 'postal_code' not in data or 'mail' not in data):
                return jsonify({'status': 'error', 'message': 'Missing required fields'})
            result = db['Contact'].insert_one({'company_name': data['company_name'],
                                               'phone_number': data['phone_number'],
                                               'street': data['street'],
                                               'city': data['city'],
                                               'postal_code': data['postal_code'],
                                               'mail': data['mail'],
                                               'modified_at': datetime.datetime.today(),
                                               'modified_by': session['user']['_id']})

            if result:
                return jsonify(data['company_name'], ' successfully inserted.'), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add contact'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def update(self):
        try:
            update_data = request.get_json()

            existing_contact = db['Contact'].find_one({'company_name': update_data['company_name']})
            if existing_contact:
                db['City'].update_one({'name': update_data['name']},
                                      {'$set': {'company_name': update_data['company_name'],
                                                'phone_number': update_data['phone_number'],
                                                'street': update_data['street'],
                                                'city': update_data['city'],
                                                'postal_code': update_data['postal_code'],
                                                'mail': update_data['mail'],
                                                'modified_at': datetime.datetime.today(),
                                                'modified_by': session['user']['_id']}})
                return jsonify('Successfully updated.'), 200
            else:
                return jsonify({'status': 'error', 'message': f'City {update_data["name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    def delete(self):
        try:
            data = request.get_json()
            existing_contact = db['Contact'].find_one({'company_name': data['company_name']})
            if existing_contact:
                db['Contact'].delete_one({'company_name': data['name']})
                return jsonify(
                    {'status': 'success', 'message': f"Contact {data['name']} deleted successfully"}), 200
            else:
                return jsonify({'status': 'error', 'message': f"Contact {data['name']} not found"}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
