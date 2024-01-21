import os
from bson import ObjectId
from flask import request, abort, send_file
from image_info import models


class Image:
    PUBLIC_FOLDER = 'public'

    @staticmethod
    def _get_image_path(name):
        return os.path.join(Image.PUBLIC_FOLDER, name)

    @staticmethod
    def read():
        try:
            data = request.get_json()
            image_path = Image._get_image_path(data['name'])

            if os.path.exists(image_path):
                return send_file(image_path)
            else:
                abort(404, 'Image not found')

        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def write():
        try:
            image = request.files['image']
            order = request.form.get("order")
            created_by = request.form.get("user_id")
            visible = request.form.get("visible")
            future_file_name = models.Image_info.write(image.filename, order, created_by, visible)
            print(ObjectId(future_file_name))
            path = os.path.join(Image.PUBLIC_FOLDER, str(ObjectId(future_file_name)) + file_extension[1])
            file_extension = os.path.splitext(image.filename)
            image.filename = str(ObjectId(future_file_name)) + file_extension[1]
            
            image.save(path)
            return {"response": f"File saved successfully in the {Image.PUBLIC_FOLDER} folder", "name":future_file_name}, 200

        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def delete():
        try:
            data = request.get_json()
            image_path = Image._get_image_path(data['name'])

            if os.path.exists(image_path):
                os.remove(image_path)
                return {"response": "File deleted successfully"}, 200
            else:
                abort(404, 'Image not found')

        except Exception as e:
            return {"error": str(e)}
