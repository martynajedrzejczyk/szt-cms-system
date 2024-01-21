import os
from flask import request, abort, send_file


class Image:
    PUBLIC_FOLDER = 'public'

    @staticmethod
    def read():
        try:
            data = request.get_json()

            image_path = os.path.join(Image.PUBLIC_FOLDER, data['name'])
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
            image_name = image.name
            image.save(os.path.join(Image.PUBLIC_FOLDER, image_name))
            return {"response": "file saved successfully in your current directory"}
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def delete():
        try:
            data = request.get_json()

            image_path = os.path.join(Image.PUBLIC_FOLDER, data['name'])
            if os.path.exists(image_path):
                os.remove(image_path)
                return {"response": "file deleted successfully"}
            else:
                abort(404, 'Image not found')
        except Exception as e:
            return {"error": str(e)}
