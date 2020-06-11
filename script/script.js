// Находим элементы в DOM
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

// Выбираем элементы, куда должны быть вставлены значения полей
let profileHeader = document.querySelector('.profile__header');
let profileSubheader = document.querySelector('.profile__subheader');

// Функция открывает/закрывает popup и вставляет значения в input
function getPopup() {
  nameInput.value = profileHeader.textContent;
  jobInput.value = profileSubheader.textContent;
  popup.classList.toggle('popup_opened');
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
     evt.preventDefault();

    // Получите значение полей из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileHeader.textContent = nameInput.value;
    profileSubheader.textContent = jobInput.value;

    getPopup();
}

editButton.addEventListener('click', getPopup);
closeButton.addEventListener('click', getPopup);
formElement.addEventListener('submit', formSubmitHandler);
