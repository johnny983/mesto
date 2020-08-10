import { enableValidation } from './index.js'
import { config, editPopup, editPopupNameInput, editPopupJobInput } from './utils.js'

export default class UserInfo {
    constructor({ userName, userJob }) {
      this.userName = document.querySelector(userName)
      this.userJob = document.querySelector(userJob)
    }
    
    get getUserInfo() {
      return { name: this.userName.textContent, job: this.userJob.textContent }
    }
  
    setUserInfo() {
      this.userName.textContent = editPopupNameInput.value
      this.userJob.textContent = editPopupJobInput.value
      enableValidation(config)
    }
  }