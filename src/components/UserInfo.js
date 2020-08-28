export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
      this._userName = document.querySelector(nameSelector)
      this._userAbout = document.querySelector(aboutSelector)
      this._userAvatar = document.querySelector(avatarSelector)
    }

    setUserInfo(remoteName, remoteAbout, remoteAvatarURL) {
      this._userName.textContent = remoteName
      this._userAbout.textContent = remoteAbout
      this._userAvatar.style.backgroundImage = `url(${remoteAvatarURL})`
    }
    
    get getUserInfo() {
      return { 
      name: this._userName.textContent, 
      about: this._userAbout.textContent, 
      avatar: this._userAvatar.style.backgroundImage
    }
  }
}