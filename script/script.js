"use strict"
// Находим элементы в DOM

const closeButton = document.querySelectorAll('.popup__close-button')

const editPopup = document.querySelector('.popup_edit')
const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
const editPopupJobInput = editPopup.querySelector('.popup__input_job')
const popupEditForm = editPopup.querySelector('.popup__edit-form');

const addPopup = document.querySelector('.popup_add')
const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
const addPopupLinkInput = addPopup.querySelector('.popup__input_link')
const popupAddForm = addPopup.querySelector('.popup__add-form')

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

// Собираем галерею карточек с фотографиями на загрузке страницы из массива

initialCards.forEach((item) => {
  const card = createCard(item);
  photoGrid.append(card)
})

function createCard(item) {
    let card = cardTemplateContent.cloneNode(true)
    card.querySelector('.photo-grid__image').src = item.link
    card.querySelector('.photo-grid__image').alt = item.alt
    card.querySelector('.photo-grid__caption').textContent = item.name
    return card
  }

// Добавляем карточку после заполнения формы

function addCard() {
  const item = {name: addPopupTitleInput.value, link: addPopupLinkInput.value, value: addPopupTitleInput.value}
  photoGrid.prepend(createCard(item))
}

// Удаляет карточку при нажатии на "мусорку"

function removeCard(event) {
  if (event.target.classList.contains('photo-grid__trash-button')) {
    event.target.closest('.photo-grid__item').remove()
  }
}

// Активирует/деактивирует лайк

function toggleLike(event) {
  if (event.target.classList.contains('photo-grid__like-button')) {
    event.target.classList.toggle('liked')
  }
}

// Функция добавления и удаления класса (делает видимым/невидимым попапы)

function togglePopup(popupName) {
  popupName.classList.toggle('popup_opened')
}

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

function addFormSubmitHandler(event) {
  event.preventDefault()
  addCard()
  togglePopup(addPopup)
}

// При сабмите формы редактирования профиля убираем ее с экрана и добавляем значения полей в нужные места

function editFormSubmitHandler(event) {
  event.preventDefault()
  profileHeader.textContent = editPopupNameInput.value
  profileSubheader.textContent = editPopupJobInput.value
  togglePopup(editPopup);
}

// Функция вставляет значения в инпуты профайла

function addInputValue() {
    editPopupNameInput.value = profileHeader.textContent
    editPopupJobInput.value = profileSubheader.textContent
}

// Очищаем инпуты

function clearInputs() {
  addPopupLinkInput.value = ''
  addPopupTitleInput.value = ''
}

// Функция добавляет src и описание картинки

function zoomPopupImages(event) {
  if (event.target.classList.contains('photo-grid__image')) {
    zoomPopupImage.src = event.target.src
    // Вы написали "Очень хардкодный путь .nextElementSibling.children[0] -- 
    // у вас же есть alt, заберите название из event.target.alt!"
    // Но тут нужен не alt а caption, я не нашел лучшего способа его помесить сюда :(
    zoomPopupCaption.textContent = event.target.closest('.photo-grid__item').innerText
    togglePopup(zoomPopup)
  }
}

// Функция закрывает любой попап при нажатии на "крестик"

function chooseCloseButton(event) {
  event.target.closest('.popup_opened').classList.toggle('popup_opened')
}

profileEditButton.addEventListener('click', () => togglePopup(editPopup))
profileEditButton.addEventListener('click', addInputValue)
addButton.addEventListener('click', clearInputs)
addButton.addEventListener('click', () => togglePopup(addPopup))
closeButton.forEach(closeButton => closeButton.addEventListener("click", chooseCloseButton))

photoGrid.addEventListener('click', zoomPopupImages)
photoGrid.addEventListener('click', toggleLike)
photoGrid.addEventListener('click', removeCard)

popupEditForm.addEventListener('submit', editFormSubmitHandler)
popupAddForm.addEventListener('submit', addFormSubmitHandler)


// function closeOverlay() {
//   if (event.target !== event.currentTarget) { return }
//   toggleEditPopup()
// }

// popup.addEventListener('click', closeOverlay)