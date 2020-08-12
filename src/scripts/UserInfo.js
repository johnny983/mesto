import { editPopupNameInput, editPopupJobInput } from '../utils/constants.js'

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
    }
  }