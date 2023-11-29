from flask import Flask, jsonify, request

from app import app
from services.socialMediaService import SocialMediaService

class SocialMediaController:
    def __init__(self, socialMediaService):
        self.socialMediaService = socialMediaService

    @app.route('/socialmedia', methods=['POST'])
    def registerSocialMedia(self, requestData):
        name = requestData.get("name")
        link = requestData.get("link")
        icon = requestData.get("icon")
        visible = requestData.get("visible")

        socialMediaId = self.socialMediaService.registerSocialMedia(name, link, icon, visible)
        return {"_id": socialMediaId}
    @app.route('/socialmedia/<socialMediaId>', methods=['GET'])
    def getSocialMediaInfo(self, socialMediaId):
        socialMediaInfo = self.socialMediaService.getSocialMediaInfo(socialMediaId)
        return socialMediaInfo

    @app.route('/socialmedia/<socialMediaId>', methods=['PUT'])
    def updateSocialMediaInfo(self, socialMediaId, requestData):
        updatedData = {
            "name": requestData.get("name"),
            "link": requestData.get("link"),
            "icon": requestData.get("icon"),
            "visible": requestData.get("visible")
        }
        modifiedCount = self.socialMediaService.updateSocialMediaInfo(socialMediaId, updatedData)
        return {"modifiedCount": modifiedCount}

    @app.route('/socialmedia/<socialMediaId>', methods=['DELETE'])
    def removeSocialMedia(self, socialMediaId):
        deletedCount = self.socialMediaService.removeSocialMedia(socialMediaId)
        return{"deletedCount": deletedCount}