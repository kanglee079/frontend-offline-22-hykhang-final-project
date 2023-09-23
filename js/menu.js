const elMainMenu = document.getElementById("mainMenu");

API.get(`categories_news`).then((res) => {
    const categories = res.data.data;
  
    let html = "";
    categories.forEach((item, index) => {
      html+= /*html */`
      <li class="nav-item">
        <a href="category.html">${item.name}</a>
      </li>
      `
    });
  
    elMainMenu.innerHTML = /*html */`
    <a href="#" class="echo-dropdown-main-element">Category</a>
    <ul class="echo-submenu list-unstyled menu-pages">
        ${html}
    </ul>
    `;
  });
  

