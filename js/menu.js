const elMainMenu = document.getElementById("mainMenu");

API.get(`categories_news`).then((res) => {
    const categories = res.data.data;
  
      console.log(categories);
    let html = "";
    let htmlOther = "";
    categories.forEach((item, index) => {
      
      if (index < 3) {
        html+= /*html */`
        <li class="menu-item">
        <a href="category.html?id=${item.id}" class="echo-dropdown-main-element active"
          >${item.name}</a
        >
        </li>
        `
      }else{
        htmlOther += /*html */ `
        <li class="nav-item">
        <a href="category.html?id=${item.id}">${item.name}</a>
        </li>
        `
      }
      
    });
  
    elMainMenu.innerHTML = /*html */ `
      ${html}
      <li class="menu-item echo-has-dropdown" >
        <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
        <ul class="echo-submenu list-unstyled menu-pages">
          ${htmlOther}
        </ul>
      </li>
    `
  });
  

