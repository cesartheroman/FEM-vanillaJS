import { getProductById } from './Menu.js';

export async function addToCart(id) {
  //remember that getProductById is an async function, so we must await it
  const product = await getProductById(id);
  //now we need to make sure to check if there's already an item to properly
  //update it
  const results = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id === id
  );

  if (results.length > 0) {
    //product is already in the cart, update item
    app.store.cart = app.store.cart.map((productItem) =>
      productItem.product.id === id
        ? { ...productItem, quantity: productItem.quantity + 1 }
        : productItem
    );
  } else {
    //add item to our cart in store, one wrong way to do it is directly mutating our store cart, but this is wrong bc we're not changing the array with the below logic, we're simply changing the contents, so our event listener 'appcartchange'will never fire. This is why we need to reassign it by creating a copy of the array and adding our new product as well.
    //app.store.cart.push({product, quantity: 1}) NO
    app.store.cart = [...app.store.cart, { product, quantity: 1 }]; // YES
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(
    (productItem) => productItem.product.id !== id
  );
}
