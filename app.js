import Store from './services/Store.js';
import { loadData } from './services/Menu.js';
import Router from './services/Router.js';

//Link my Web Components
import { MenuPage } from './components/MenuPage.js';
import { DetailsPage } from './components/DetailsPage.js';
import { OrderPage } from './components/OrderPage.js';
import ProductItem from './components/ProductItem.js';
import CartItem from './components/CartItem.js';

window.app = {};
app.store = Store;
app.router = Router;

// It's better to wait for event for manipulation
window.addEventListener('DOMContentLoaded', async () => {
  loadData();
  app.router.init();
});

window.addEventListener('appcartchange', () => {
  //let's grab the badge in our HTML
  const badge = document.getElementById('badge');
  //let's get the quantity of a specific product by using reduce()
  const quantity = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);

  //let's update our badge text content with the quantity of our item
  badge.textContent = quantity;
  //change the badge hidden attribute depending on quantity 0 or more
  badge.hidden = quantity === 0;
});
