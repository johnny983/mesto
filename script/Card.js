const photoGrid = document.querySelector('.photo-grid')
const cardTemplateContent = photoGrid.querySelector('.photo-grid__template').content
const popupElement = document.querySelector('.popup')
const popupImage = popupElement.querySelector('.popup__image')

export default class Card {
    constructor (data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.alt;
      this._cardSelector = cardSelector
    }
  
    _getTemplate() {
      const cardElement = cardTemplateContent.cloneNode(true);
      return cardElement;
    }
  
    _setEventListeners() {
      this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });
  
      this._element.querySelector('.photo-grid__like-button').addEventListener('click', () => {
            this._toggleLike();
      });
      
      this._element.querySelector('.photo-grid__trash-button').addEventListener('click', () => {
            this._removeCard();
      });
  
      document.querySelector('.popup__close-button').addEventListener('click', () => {
        this._handleClosePopup();
      });
    }

    _closePopupOnEsc = (event) => {
      if (event.key === "Escape") { 
        this._handleClosePopup()
      }
    }
  
    _handleOpenPopup() {
        popupImage.src = this._link
        popupImage.alt = this._alt
        popupElement.querySelector('.popup__caption').textContent = this._name
        popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupOnEsc)
    }
  
    _handleClosePopup() {
      document.removeEventListener('keydown', this._closePopupOnEsc)
      popupElement.classList.remove('popup_opened');
    }
  
    _toggleLike () {
      event.target.classList.toggle('liked')
    }
  
    _removeCard () {
      event.target.closest('.photo-grid__item').remove()
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