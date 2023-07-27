import { removeFromCart } from '../services/Order.js';

export default class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //again we're grabbing this after we use this.dataset.item to set the item's as a property
    const item = JSON.parse(this.dataset.item);
    this.innerHTML = ''; //clearing the element

    const template = document.getElementById('cart-item-template');
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    this.querySelector('.qty').textContent = `${item.quantity}x`;
    this.querySelector('.name').textContent = item.product.name;
    this.querySelector('.price').textContent = `$${item.product.price.toFixed(
      2
    )}`;
    this.querySelector('a.delete-button').addEventListener('click', () => {
      removeFromCart(item.product.id);
    });
  }
}

customElements.define('cart-item', CartItem);
