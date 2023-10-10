const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elName = document.getElementById("name");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");
const elPassword = document.getElementById("password");
const elFormMessage = document.getElementById("formMessage");

elAuthForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = elName.value.trim();
    const email = elEmail.value.trim();
    const password = elPassword.value.trim();
    const phone = elPhone.value.trim();
    const address = elAddress.value.trim();

    const data = {name, email, password, phone, address};

    API.post('/users/register', data)
      .then(function (responseRegister) {
        API.post('/auth/login', {email, password}).then(function (responseLogin) {
        window.location.href = "index.html";
      });
    })
      .catch(function (err) {
        const errors = err.response.data.errors;
        console.log('errors', errors);

        let errString = "";

        for (const property in object) {
            errString += /*html*/ `<li>${errors[property]}</li>`
        }

        elFormMessage.innerHTML = `<div class="alert alert-danger role="alert"> 
            <ul>${errString}</ul>
        </div>`;
        elEmail.value ="";
        elPassword.value ="";
      });
})