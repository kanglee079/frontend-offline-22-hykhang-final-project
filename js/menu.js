const elMainMenu = document.getElementById("mainMenu");


API.get(`categories_news`).then((res) => {
    const categories = res.data.data;
  
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


      API.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resMe) => {
        const name = resMe.data.data.name;
        elMainMenu.innerHTML += /*html */ `
          <li class="menu-item echo-has-dropdown">
            <a href="#" class="echo-dropdown-main-element">
              <span>${name}</span>
            </a>
            <ul class="echo-submenu list-unstyled menu-pages">
              <li><a href="profile.html">Thông tin tài khoản</a></li>
              <li><a href="change-password.html">Thay đổi mật khẩu</a></li>
              <li><a href="#" id="btnLogout">Đăng xuất</a></li>
            </ul>
          </li>
        `;
      }).catch((err) => {
        elMainMenu.innerHTML += /*html*/ `
        <li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">
            <span>Tài Khoản</span>
          </a>
          <ul class="echo-submenu list-unstyled menu-pages">
            <li><a href="login.html">Đăng nhập</a></li>
            <li><a href="register.html">Đăng kí</a></li>
          </ul>
        </li>
        `
      })
  });
  
elMainMenu.addEventListener("click", function(e){

  const el = e.target;

  if (el.id === 'btnLogout') {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = 'index.html';
  }
})


