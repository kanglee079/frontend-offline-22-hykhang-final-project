const elChangePassword = document.getElementById("changePasswordForm");

elChangePassword.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const currentPasswordElem = document.getElementById("currentPassword");
    const newPasswordElem = document.getElementById("newPassword");
    const confirmNewPasswordElem = document.getElementById("confirmNewPassword");
  
    if (newPasswordElem.value !== confirmNewPasswordElem.value) {
        alert("Mật khẩu mới và mật khẩu xác nhận phải giống nhau!");
        return;
    }
  
    const data = {
        password_current: currentPasswordElem.value,
        password: newPasswordElem.value,
        password_confirmation: confirmNewPasswordElem.value
    };
  
    API.put('/auth/change-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
})
.then(response => {
    alert("Đổi mật khẩu thành công!");
})
.catch(error => {
    alert("Có lỗi xảy ra!");

    if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message);
    }
});
  });