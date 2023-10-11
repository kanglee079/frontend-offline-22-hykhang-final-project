API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    window.location.href = 'index.html';
  })

const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elName = document.getElementById("name");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");
const elPassword = document.getElementById("password");
const elFormMessage = document.getElementById("formMessage");

elAuthForm.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.post('/users/register', data)
      .then(function (responseRegister) {
        const dataLogin = {email: data.email, password: data.password}
        API.post('/auth/login', dataLogin).then(function (responseLogin) {
        window.location.href = "index.html";
      });
    })
      .catch(function (err) {
        const errors = err.response.data.errors;
        console.log('errors', errors);

        let errString = "";

        for (const property in errors) {
            errString += /*html*/ `<li>${errors[property]}</li>`
        }

        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert"> 
            <ul>${errString}</ul>
        </div>`;
        elEmail.value ="";
        elPassword.value ="";
      });
})