const photoGrid = document.querySelector('.photo-grid')
const cardTemplateContent = photoGrid.querySelector('.photo-grid__template').content
const popupElement = document.querySelector('.popup');


import { addEscListener, removeEscListener } from './index.js'

export class Card {
    constructor (data) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.alt;
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
  
    _handleOpenPopup() {
      popupElement.querySelector('.popup__image').src = this._link
      popupElement.querySelector('.popup__caption').textContent = this._name
      popupElement.querySelector('.popup__image').alt = this._alt
      popupElement.classList.add('popup_opened');
      addEscListener()
    }
  
    _handleClosePopup() {
      removeEscListener()
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
  
        this._element.querySelector('.photo-grid__image').src = this._link;
        this._element.querySelector('.photo-grid__image').alt = this._alt;
        this._element.querySelector('.photo-grid__caption').textContent = this._name;
    
        return this._element;
      }
  }