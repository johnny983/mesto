export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
      this._userName = document.querySelector(nameSelector)
      this._userAbout = document.querySelector(aboutSelector)
    }

    setUserInfo(remoteName, remoteAbout) {
      this._userName.textContent = remoteName
      this._userAbout.textContent = remoteAbout
    }
    
    get getUserInfo() {
      return { name: this._userName.textContent, about: this._userAbout.textContent }
    }
  }