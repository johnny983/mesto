export default class Card {
  constructor (item, cardSelector, userId, { handleCardClick }, { getConfirmPopup }, { likeStateSetApi }) {
    this._item = item
    this._likes = item.likes
    this._likeAmount = item.likes.length
    this._userId = userId
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._getConfirmPopup = getConfirmPopup
    this._likeStateSetApi = likeStateSetApi
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.photo-grid__like-button')
    this._likesAmount = this._element.querySelector('.photo-grid__like-amount')
    this._trashButton = this._element.querySelector('.photo-grid__trash-button')
    this._photoGridImage = this._element.querySelector('.photo-grid__image')

    this._photoGridImage.addEventListener('click', () => {
      this._handleCardClick()
    })

    this._likeButton.addEventListener('click', () => {
      this._likesAmountHandler()
    })
  
    this._trashButton.addEventListener('click', () => {
      this._getConfirmPopup(this._element)
    })
  }

  lastCardState(result) {
    this._item = result
    this._likeAmount = this._item.likes.length
    this._likes = this._item.likes
  }

  _likesAmountHandler() {
    const myLike = this._likes.filter(like => {
      return like._id === this._userId
    })

    if (myLike.length > 0) {
      this._likeButton.classList.toggle('liked')
      this._likesAmount.textContent = this._likes.length - 1
      this._likeStateSetApi('DELETE')

    } else {
      this._likeButton.classList.toggle('liked')
      this._likesAmount.textContent = this._likes.length + 1
      this._likeStateSetApi('PUT')
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._photoGridImage.src = this._item.link;
    this._photoGridImage.alt = this._item.alt;

    this._element.querySelector('.photo-grid__caption').textContent = this._item.name;
    this._likesAmount.textContent = this._likeAmount

    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('liked')
      }
    })

    if (this._item.owner._id !== this._userId) {
      this._trashButton.style.display = "none"
    }
    return this._element;
    }
}