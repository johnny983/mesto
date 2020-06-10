let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function getPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', getPopup);
closeButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
     evt.preventDefault();

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__input_name');
    let jobInput = document.querySelector('.popup__input_job');

    // Получите значение полей из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileHeader = document.querySelector('.profile__header');
    let profileSubheader = document.querySelector('.profile__subheader');

    // Вставьте новые значения с помощью textContent
    profileHeader.textContent = nameInput.value;
    profileSubheader.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
