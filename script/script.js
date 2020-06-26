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
  {name: 'Карачаевск', 
  link: 'images/photo-grid-karachaevsk.jpg',
  alt: 'Церковь в окружении горых вершин'},
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

function makePhotoGrid() {
  for (i = 0; i < initialCards.length; i++) {
    card = cardTemplateContent.cloneNode(true)
    card.querySelector('.photo-grid__image').src = initialCards[i].link
    card.querySelector('.photo-grid__image').alt = initialCards[i].alt
    card.querySelector('.photo-grid__caption').textContent = initialCards[i].name
    photoGrid.append(card)
  }
}
makePhotoGrid()

// Функция добавляет карточку при заполнении формы и обнуляет значения текстовых полей

function addCard() {
  card = cardTemplateContent.cloneNode(true)
  card.querySelector('.photo-grid__image').src = addPopupLinkInput.value
  card.querySelector('.photo-grid__image').alt = addPopupTitleInput.value
  card.querySelector('.photo-grid__caption').textContent = addPopupTitleInput.value
  photoGrid.prepend(card)
  addPopupLinkInput.value = ''
  addPopupTitleInput.value = ''
}

// Удаляет карточку при нажатии на "мусорку"

function removeCard(event) {
  if (event.target.classList.contains('photo-grid__trash-button')) {
    event.target.parentElement.remove()
  }
}

// Активирует/деактивирует лайк

function toggleLike(event) {
  if (event.target.classList.contains('photo-grid__like-button')) {
    event.target.classList.toggle('liked')
  }
}

// Функция добавляет src и описание картинки

function zoomPopupImages(event) {
  if (event.target.classList.contains('photo-grid__image')) {
    zoomPopupImage.src = event.target.src
    zoomPopupCaption.textContent = event.target.nextElementSibling.children[0].textContent
    togglePopup(zoomPopup)
  }
}

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

function addFormSubmitHandler (event) {
  event.preventDefault()
  togglePopup(addPopup)
  addCard()
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
  if (editPopup.classList.contains('popup_opened')) {
    editPopupNameInput.value = profileHeader.textContent
    editPopupJobInput.value = profileSubheader.textContent
  }
}

// Функция добавления и удаления класса (делает видимым/невидимым попапы)

function togglePopup(popupName) {
  popupName.classList.toggle('popup_opened')
  addInputValue()
}

// Функция закрывает любой попап при нажатии на "крестик"

function chooseCloseButton(event) {
  event.target.parentElement.parentElement.classList.toggle('popup_opened')
  console.log(event.target.parentElement.parentElement)
  console.log(event.target.style.animation)
}

profileEditButton.addEventListener('click', () => togglePopup(editPopup))
addButton.addEventListener('click', () => togglePopup(addPopup))
closeButton.forEach(closeButton => closeButton.addEventListener("click", () => chooseCloseButton(event)))

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