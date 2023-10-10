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
      .then(function (response) {
        console.log(response);
    })
      .catch(function (error) {
        console.log(error);
        // elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">
        // Bạn đã nhập sai thông tin, vui lòng nhập lại !
        // </div>
        // `
        // elEmail.value ="";
        // elPassword.value ="";
      });
})