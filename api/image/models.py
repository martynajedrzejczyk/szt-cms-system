import os
import pathlib
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
            path = os.path.join(Image.PUBLIC_FOLDER, image.filename)
            order = request.form.get("order")
            created_by = request.form.get("created_by")
            visible = request.form.get("visible")
            image.save(path)
            future_file_name = models.Image_info.write(image.filename, path, order, created_by, visible)
            print(ObjectId(future_file_name))
            image.filename = str(ObjectId(future_file_name)) + pathlib.Path(path).suffix
            return future_file_name

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
