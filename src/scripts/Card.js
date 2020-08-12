export default class Card {
    constructor (item, cardSelector, { handleCardClick }) {
      this._name = item.name
      this._link = item.link
      this._alt = item.alt
      this._cardSelector = cardSelector
      this._handleCardClick = handleCardClick
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
      this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
          this._handleCardClick();
        });
  
      this._element.querySelector('.photo-grid__like-button').addEventListener('click', () => {
            this._toggleLike();
      });
      
      this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
            this._removeCard();
      });
    }
  
    _toggleLike() {
      event.target.classList.toggle('liked')
    }
  
    _removeCard() {
      this._element.remove()
      this._element = null
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      const photoGridImage = this._element.querySelector('.photo-grid__image')
        photoGridImage.src = this._link;
        photoGridImage.alt = this._alt;
      this._element.querySelector('.photo-grid__caption').textContent = this._name;
      return this._element;
      }
  }