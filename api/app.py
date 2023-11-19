from flask import Flask

from mongoApi import dbInstance

app = Flask(__name__)
@app.route('/')
def base():
    result = dbInstance.read("City")
    for item in result:
        print(item)
    return "haha"


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='127.0.0.1')