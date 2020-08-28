export default class Section {
    constructor({ items, addCard }, containerSelector) {
      this._renderedItems = items;
      this._addCard = addCard;
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(cardElement) {
      this._container.prepend(cardElement);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => {
        this._addCard(item);
      });
    }
  }