class SocialMediaService:
    def __init__(self, socialMediaModel):
        self.socialMediaModel = socialMediaModel
    def registerSocialMedia(self, name, link, icon, visible):
        socialMediaId = self.socialMediaModel.createSocialMedia(name, link, icon, visible)
        return socialMediaId

    def getSocialMediaInfo(self, socialMediaId):
        return self.socialMediaModel.getSocialMedia(socialMediaId)

    def updateSocialMediaInfo(self, socialMediaId, updatedSocialMedia):
        return self.socialMediaModel.updateSocialMedia(socialMediaId, updatedSocialMedia)

    def removeSocialMedia(self, socialMediaId):
        return self.socialMediaModel.deleteSocialMedia(socialMediaId)