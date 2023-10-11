API.get('/auth/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  window.location.href = 'index.html';
})

const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elPassword = document.getElementById("password");
const elFormMessage = document.getElementById("formMessage");

elAuthForm.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    // const email = elEmail.value.trim();
    // const password = elPassword.value.trim();

    // const data = {email, password};

    API.post('/auth/login', data)
      .then(function (response) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        window.location.href = "index.html";
      })
      .catch(function (error) {
        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">
        Bạn đã nhập sai thông tin, vui lòng nhập lại !
        </div>
        `
        elEmail.value ="";
        elPassword.value ="";
      });
})