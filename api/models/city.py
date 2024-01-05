from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db

class City:

    def get_all_cities(self):
        return jsonify(db["City"].find({}))
    def get_city(self):
        return jsonify(db["City"].find_one({"Name": request.form.get('email')}))
    def insert_city(self):
        city = {
            "name": request.form.get('name'),
            "visible": request.form.get('visible')
        }
        return jsonify(db["City"].insert_one(city))
    def delete_all_cities(self):
        return jsonify(db["City"].delete_many({}))
    def delete_city(self):
        return jsonify(db["City"].delete_one({"Name": request.form.get('email')}))