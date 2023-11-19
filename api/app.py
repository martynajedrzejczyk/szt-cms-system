from flask import Flask

from mongoApi import mongo_instance

app = Flask(__name__)
@app.route('/')
def base():
    result = mongo_instance.read("City")
    for item in result:
        print(item)
    return "haha"


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='127.0.0.1')