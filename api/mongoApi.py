from pymongo import MongoClient
from pymongo.server_api import ServerApi


class MongoApi:
    def __init__(self, database):
        uri = "mongodb+srv://123:123@sztcluster.edm9ind.mongodb.net/?retryWrites=true&w=majority"
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        cursor = self.client[database]
        self.database = cursor

    def read(self, collection):
        documents = self.database[collection].find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output

    def write(self, collection, new_document):
        response = self.database[collection].insert_one(new_document)
        output = {'Status': 'Successfully Inserted', 'Document_ID': str(response.inserted_id)}
        return output

    def update(self, collection, filt, data_to_update):
        updated_data = {"$set": data_to_update}
        response = self.database[collection].update_one(filt, updated_data)
        output = {'Status': 'Successfully Updated' if response.modified_count > 0 else "Nothing was updated."}
        return output

    def delete(self, collection, filt):
        response = self.database[collection].delete_one(filt)
        output = {'Status': 'Successfully Deleted' if response.deleted_count > 0 else "Document not found."}
        return output