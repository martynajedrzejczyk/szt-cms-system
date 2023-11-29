from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
class SocialMediaModel:
    def __init__(self, apiInstance):
        self.api = apiInstance

    def createSocialMedia(self, name, link, icon, visible):
        socialMediaData = {
            "name": name,
            "link": link,
            "icon": icon,
            "visible": visible
        }
        result = self.api.insert_into_collection('Social_Media', socialMediaData)
        return str(result.id)
    def getSocialMedia(self, socialMediaId):
        query = {"_id": ObjectId(socialMediaId)}
        return self.api.read_collection('Social_Media', query)

    def updateSocialMedia(self, socialMediaId, updated_data):
        query = {"_id": ObjectId(socialMediaId)}
        result = self.api.update_collection('Social_Media', query, {"$set": updated_data})
        return result.modified_count

    def deleteSocialMedia(self, socialMediaId):
        query = {"_id": ObjectId(socialMediaId)}
        result = self.api.delete_from_collection('Social_Media', query)
        return result.deleted_count