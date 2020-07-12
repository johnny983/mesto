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

const popupButton = addPopup.querySelector('.popup__button')

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

const togglePopup = (popupName) => {
  popupName.classList.toggle('popup_opened')
  errorReset(popupName)
}

const errorReset = (popupName) => {
  popupName.querySelectorAll('.popup__input').forEach(input => {
    input.classList.remove('popup__input_type_error')
  })
  popupName.querySelectorAll('.popup__input-error').forEach(inputError => {
    inputError.classList.remove('popup__input-error_active')
  })
  popupName.querySelectorAll('.popup__button').forEach(button => {
    button.classList.remove('popup__button_inactive')
    button.removeAttribute('disabled')
  })
}

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

const addFormSubmitHandler = (event) => {
  event.preventDefault()
  addCard()
  togglePopup(addPopup)
  popupButton.setAttribute('disabled', '')
  popupButton.classList.add('popup__button_inactive')
}

// При сабмите формы редактирования профиля убираем ее с экрана и добавляем значения полей в нужные места

const editFormSubmitHandler = (event) => {
  event.preventDefault()
  profileHeader.textContent = editPopupNameInput.value
  profileSubheader.textContent = editPopupJobInput.value
  togglePopup(editPopup);
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
    togglePopup(zoomPopup)
    closePopupOnEsc()
  }
}

// Собираем галерею карточек с фотографиями на загрузке страницы из массива

initialCards.forEach((item) => {
  photoGrid.append(createCard(item))
})

// Слушатели событий

profileEditButton.addEventListener('click', () => {
  addInputValue()
  togglePopup(editPopup)
  closePopupOnEsc()
})

addButton.addEventListener('click', () => {
  clearInputs()
  togglePopup(addPopup)
  closePopupOnEsc()
})

const addEscListeners = (event) => {
    if (event.key === "Escape") { 
      event.currentTarget.classList.remove('popup_opened')
    }
}

// Закрываем попапы при нажатии "Esc"

const closePopupOnEsc = () => allPopups.forEach(popup => {
  if (popup.classList.contains('popup_opened')) {
    popup.focus()
    popup.addEventListener('keydown', addEscListeners)
  } else {
    popup.removeEventListener('keydown', addEscListeners)
  }
})

// Закрываем попапы при нажатии на "overlay" или "крестик"

allPopups.forEach(popup => popup.addEventListener('click', () => { 
  if (event.target.classList.contains('popup__close-button') || 
      event.target == event.currentTarget) { 
      togglePopup(event.currentTarget) 
    } return
  }))

photoGrid.addEventListener('click', zoomPopupImages)
photoGrid.addEventListener('click', toggleLike)
photoGrid.addEventListener('click', removeCard)

editPopupForm.addEventListener('submit', editFormSubmitHandler)
addPopupForm.addEventListener('submit', addFormSubmitHandler)