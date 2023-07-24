const Router = {
  init: () => {
    document.querySelectorAll('.navlink').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = e.target.getAttribute('href');
        Router.go(url);
      });
    });
    //Event Handler for URL changes
    window.addEventListener('popstate', (event) => {
      //setting addToHistory as false here since the user is going back
      Router.go(event.state.route, false);
    });
    //check the initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    let pageElement = null;

    switch (route) {
      case '/':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Menu';
        break;

      case '/order':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Your Order';
        break;

      default:
        if (route.startsWith('/product-')) {
          pageElement = document.createElement('h1');
          pageElement.textContent = 'Details';
          const paramId = route.substring(route.lastIndexOf('-') + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement) {
      // document.querySelector('main').children[0].remove();
      const cache = document.querySelector('main');
      cache.innerHTML = '';
      cache.appendChild(pageElement);
    }
  },
};

export default Router;
