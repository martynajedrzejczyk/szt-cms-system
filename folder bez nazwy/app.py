from flask import Flask, Response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://123:123@sztcluster.edm9ind.mongodb.net/?retryWrites=true&w=majority"
app = Flask(__name__)
client = MongoClient(uri, server_api=ServerApi('1'))
@app.route('/')
def base():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    return "haha"


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')