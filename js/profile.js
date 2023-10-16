const elAuthForm = document.getElementById("auth-form");
const elFormMessage = document.getElementById("formMessage");
const elName = document.getElementById("name");
const elEmail = document.getElementById("email");
const elPhone = document.getElementById("phone");
const elAddress = document.getElementById("address");

API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    const data = res.data.data;
    elEmail.value = data.email
    elName.value = data.name 
    elPhone.value = data.phone 
    elAddress.value = data.address 
  }).catch(err => {
    window.location.href = "index.html";
  });

elAuthForm.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);

    API.put('/auth/update', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
    }).then((res) => {
        elFormMessage.innerHTML =/*html */ 
        `<div class="alert alert-success" role="alert"> 
            Cập nhập thông tin thành công!
        </div>`;
    }).catch((err) => {
        const errors = err.response.data.errors;
        showFormErrorsMessage(errors, elFormMessage);
    });
})