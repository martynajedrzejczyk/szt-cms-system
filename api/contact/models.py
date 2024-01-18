import datetime
from bson import ObjectId, json_util
from flask import jsonify, request, session
from app import db

def convert_object_ids(contacts):
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return contacts

class Contact:

    @staticmethod
    def read_all():
        try:
            contacts = list(db['Contact'].find())
            if contacts:
                return jsonify(convert_object_ids(contacts)), 200
            else:
                return jsonify({'status': 'error', 'message': 'Contacts not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def read():
        try:
            data = request.get_json()
            contact = db['Contact'].find_one({'company_name': data['company_name']})
            if contact:
                contact['_id'] = str(contact['_id'])
                return jsonify(contact), 200
            else:
                return jsonify({'status': 'error', 'message': 'Contact not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def write():
        try:
            data = request.get_json()

            required_fields = ['company_name', 'phone_number', 'street', 'city', 'postal_code', 'mail']
            if not all(field in data for field in required_fields):
                return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

            result = db['Contact'].insert_one({
                'company_name': data['company_name'],
                'phone_number': data['phone_number'],
                'street': data['street'],
                'city': data['city'],
                'postal_code': data['postal_code'],
                'mail': data['mail'],
                'modified_at': datetime.datetime.today(),
                'modified_by': data['user_id']
            })

            if result:
                return jsonify({'status': 'success', 'message': f'{data["company_name"]} successfully inserted.'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Failed to add contact'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def update():
        try:
            update_data = request.get_json()

            existing_contact = db['Contact'].find_one({'company_name': update_data['company_name']})
            if existing_contact:
                db['Contact'].update_one({'_id': existing_contact['_id']}, {'$set': {
                    'company_name': update_data['company_name'],
                    'phone_number': update_data['phone_number'],
                    'street': update_data['street'],
                    'city': update_data['city'],
                    'postal_code': update_data['postal_code'],
                    'mail': update_data['mail'],
                    'modified_at': datetime.datetime.today(),
                    'modified_by': update_data['user_id']
                }})
                return jsonify({'status': 'success', 'message': 'Successfully updated.'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Contact {update_data["company_name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            existing_contact = db['Contact'].find_one({'company_name': data['company_name']})
            if existing_contact:
                db['Contact'].delete_one({'_id': existing_contact['_id']})
                return jsonify({'status': 'success', 'message': f'Contact {data["company_name"]} deleted successfully'}), 200
            else:
                return jsonify({'status': 'error', 'message': f'Contact {data["company_name"]} not found'}), 400
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 400
