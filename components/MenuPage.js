export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      //request our CSS file
      const request = await fetch('/components/MenuPage.css');
      //Read CSS file using txt() not json()
      const css = await request.text();
      styles.textContent = css;
    }

    loadCSS();
  }

  //when the component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById('menu-page-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener('appmenuchange', () => {
      this.render();
    });

    this.render();
  }

  render() {
    //first check if there is a menu or not
    if (app.store.menu) {
      //can cache our menu since we'll be querying it multiple times
      const menu = this.root.querySelector('#menu');
      //check that there isn't something already in the menu
      menu.innerHTML = '';
      //loop through our category objects, each category has an array of
      // associated products
      for (let category of app.store.menu) {
        const liCategory = document.createElement('li');
        liCategory.innerHTML = `<h3>${category.name}</h3>
            <ul class='category'>
            </ul>
            `;
        menu.appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement('product-item');
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      this.root.querySelector('#menu').innerHTML = 'Loading...';
    }
  }
}

customElements.define('menu-page', MenuPage);
