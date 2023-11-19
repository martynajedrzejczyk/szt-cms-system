from pymongo import MongoClient
from pymongo.server_api import ServerApi


class MongoApi:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(MongoApi, cls).__new__(cls)
            uri = "mongodb+srv://123:123@sztcluster.edm9ind.mongodb.net/?retryWrites=true&w=majority"
            database_name = "SZT_DB"
            cls._instance.client = MongoClient(uri, server_api=ServerApi('1'))
            cls._instance.database = cls._instance.client[database_name]
        return cls._instance

    def read(self, collection):
        if not hasattr(self._instance, 'database'):
            raise ValueError("MongoDB connection not initialized. Call the singleton first.")
        return self._instance.database[collection].find()

    def write(self, collection, new_document):
        response = self._instance.database[collection].insert_one(new_document)
        output = {'Status': 'Successfully Inserted', 'Document_ID': str(response.inserted_id)}
        return output

    def update(self, collection, filt, data_to_update):
        updated_data = {"$set": data_to_update}
        response = self._instance.database[collection].update_one(filt, updated_data)
        output = {'Status': 'Successfully Updated' if response.modified_count > 0 else "Nothing was updated."}
        return output

    def delete(self, collection, filt):
        response = self._instance.database[collection].delete_one(filt)
        output = {'Status': 'Successfully Deleted' if response.deleted_count > 0 else "Document not found."}
        return output

dbInstance = MongoApi()