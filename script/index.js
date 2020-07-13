"use strict"

// Находим элементы в DOM
const allPopups = document.querySelectorAll('.popup')

const editPopup = document.querySelector('.popup_edit')
const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
const editPopupJobInput = editPopup.querySelector('.popup__input_job')
const editPopupForm = editPopup.querySelector('.popup__edit-form');

const addPopup = document.querySelector('.popup_add')
const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
const addPopupLinkInput = addPopup.querySelector('.popup__input_link')
const addPopupForm = addPopup.querySelector('.popup__add-form')

const popupButton = document.querySelector('.popup__button')

const zoomPopup = document.querySelector('.popup_zoom')
const zoomPopupImage = zoomPopup.querySelector('.popup__image')
const zoomPopupCaption = zoomPopup.querySelector('.popup__caption')

const profile = document.querySelector('.profile')

const addButton = profile.querySelector('.profile__add-button')
const profileEditButton = profile.querySelector('.profile__edit-button')
const profileHeader = profile.querySelector('.profile__header')
const profileSubheader = profile.querySelector('.profile__subheader')

const photoGrid = document.querySelector('.photo-grid')
const cardTemplateContent = photoGrid.querySelector('.photo-grid__template').content

const config = {
  formSelector: '.popup__form', inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error', errorClass: 'popup__input-error_active'
}

// Из этого массива создаем галерею

const initialCards = [
  {name: 'Ольхон', 
  link: 'images/photo-grid-olkhon.jpg',
  alt: 'Каменная глыба посреди замерзжего озера'},
  {name: 'Эльбрус', 
  link: 'images/photo-grid-elbrus.jpg',
  alt: 'Вид на гору издали на закате солнца'},
  {name: 'Домбай',
  link: 'images/photo-grid-dombai.jpg',
  alt: 'Горные вершины Домбая'},
  {name: 'Камчатка',
  link: 'images/photo-grid-kamchatka.jpg',
  alt: 'Снежная горная вершина с высоты птичьего полета'},
  {name: 'Клин',
  link: 'images/photo-grid-klin.jpg',
  alt: 'Заброшенная здание церкви в поле'},
  {name: 'Хибины',
  link: 'images/photo-grid-khibiny.jpg',
  alt: 'Заснеженные горные склоны'}
];

// Создаем карточку и добавляем путь картинки, альт-текст и название карточки.

const createCard = (item) => {
    const card = cardTemplateContent.cloneNode(true)
    card.querySelector('.photo-grid__image').src = item.link
    card.querySelector('.photo-grid__image').alt = item.alt
    card.querySelector('.photo-grid__caption').textContent = item.name
    return card
  }

// Создаем объект и передаем его для создания карточки

const addCard = () => {
  const item = {
    name: addPopupTitleInput.value, 
    link: addPopupLinkInput.value,
    value: addPopupTitleInput.value
  }
  photoGrid.prepend(createCard(item))
}

// Удаляет карточку при нажатии на "мусорку"

const removeCard = (event) => {
  if (event.target.classList.contains('photo-grid__trash-button')) {
    event.target.closest('.photo-grid__item').remove()
  }
}

// Активируем/деактивируем "лайк"

const toggleLike = (event) => {
  if (event.target.classList.contains('photo-grid__like-button')) {
    event.target.classList.toggle('liked')
  }
}

// Делаем видимыми/невидимыми попапы добавлением класса

const openPopups = (popupName) => {
  popupName.classList.add('popup_opened')
}

const closePopups = (popupName) => {
  popupName.classList.remove('popup_opened')
  inputsErrorsReset(popupName, config)
}

// Закрываем попапы при нажатии "Esc" и вызываем функцию удаления слушателя.

const closePopupOnEsc = () => {
  if (event.key === "Escape") { 
    closePopups(document.querySelector('.popup_opened'))
    removePopupEventListeners()
  }
}

// Добавление слушателя "keydown" в попапе.

const addPopupEventListeners = () => {
  document.addEventListener('keydown', closePopupOnEsc)
}

// Удаление слушателя "keydown" в попапе.

const removePopupEventListeners = () => {
  document.removeEventListener('keydown', closePopupOnEsc)
}

// Закрываем попапы при нажатии на "overlay" или "крестик"

allPopups.forEach(popup => popup.addEventListener('mousedown', (event) => { 
if (event.target.classList.contains('popup__close-button') || 
    event.target == event.currentTarget) { 
    closePopups(event.currentTarget) 
    removePopupEventListeners()
  }
}))

// Сбрасываем ошибки в случае если клиент закрыл ошибочную форму и открыл опять

const inputsErrorsReset = (popupName, config) => {
  if (popupName === zoomPopup) { return }
  popupButton.removeAttribute('disabled', '')
  popupButton.classList.remove(config.inactiveButtonClass)
  const formElement = popupName.querySelector(config.formSelector)
  formElement.querySelectorAll(config.inputSelector).forEach(inputElement => {
    hideInputError(formElement, inputElement, config)
  })
}

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

const addFormSubmitHandler = (event) => {
  event.preventDefault()
  closePopups(addPopup)
  addCard()
}

// При сабмите формы редактирования профиля убираем ее с экрана и добавляем значения полей в нужные места

const editFormSubmitHandler = (event) => {
  event.preventDefault()
  profileHeader.textContent = editPopupNameInput.value
  profileSubheader.textContent = editPopupJobInput.value
  closePopups(editPopup)
}

// Вставляем значения в инпуты профайла

const addInputValue = () => {
    editPopupNameInput.value = profileHeader.textContent
    editPopupJobInput.value = profileSubheader.textContent
}

// Очищаем инпуты

const clearInputs = () => {
  addPopupForm.reset()
}

// Добавляем src и описание картинки

const zoomPopupImages = (event) => {
  if (event.target.classList.contains('photo-grid__image')) {
    zoomPopupImage.src = event.target.src
    zoomPopupCaption.textContent = event.target.closest('.photo-grid__item').innerText
  }
}

// Собираем галерею карточек с фотографиями на загрузке страницы из массива

initialCards.forEach((item) => {
  photoGrid.append(createCard(item))
})

// Слушатели событий

profileEditButton.addEventListener('click', () => {
  addInputValue()
  addPopupEventListeners()
  openPopups(editPopup)
})

addButton.addEventListener('click', () => {
  clearInputs()
  addPopupEventListeners()
  openPopups(addPopup)
})

photoGrid.addEventListener('click', (event) => {
  zoomPopupImages(event)
  addPopupEventListeners()
  openPopups(zoomPopup)
})

photoGrid.addEventListener('click', toggleLike)
photoGrid.addEventListener('click', removeCard)

editPopupForm.addEventListener('submit', editFormSubmitHandler)
addPopupForm.addEventListener('submit', addFormSubmitHandler)

enableValidation(config);