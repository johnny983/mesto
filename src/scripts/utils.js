import photoGridOlkhon from '../images/photo-grid-olkhon.jpg'
import photGridEbrus from '../images/photo-grid-elbrus.jpg'
import photGridDombai from '../images/photo-grid-dombai.jpg'
import photoGridKamchatka from '../images/photo-grid-kamchatka.jpg'
import photoGridKlin from '../images/photo-grid-klin.jpg'
import photoGridKhibiny from '../images/photo-grid-khibiny.jpg'


export const initialCards = [
    {name: 'Ольхон', 
    link: photoGridOlkhon,
    alt: 'Каменная глыба посреди замерзжего озера'},
    {name: 'Эльбрус', 
    link: photGridEbrus,
    alt: 'Вид на гору издали на закате солнца'},
    {name: 'Домбай',
    link: photGridDombai,
    alt: 'Горные вершины Домбая'},
    {name: 'Камчатка',
    link: photoGridKamchatka,
    alt: 'Снежная горная вершина с высоты птичьего полета'},
    {name: 'Клин',
    link: photoGridKlin,
    alt: 'Заброшенная здание церкви в поле'},
    {name: 'Хибины',
    link: photoGridKhibiny,
    alt: 'Заснеженные горные склоны'}
  ];

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

export const editPopup = document.querySelector('.popup_edit')
export const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
export const editPopupJobInput = editPopup.querySelector('.popup__input_job')