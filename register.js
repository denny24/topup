function openRegisterPopup() {
    var popup = document.getElementById("popup");
    var popupContent = document.getElementById("popup-content");
    popupContent.innerHTML = `
      <h2>Register Akun Baru</h2>
      <form>
        <input type="text" id="reg-username" placeholder="Username">
        <input type="password" id="reg-password" placeholder="Password">
        <input type="button" value="Register" onclick="registerAccount()">
      </form>
      <button class='close-btn' onclick='closePopup()'>Close</button>
    `;
    popupContent.classList.add("register-popup");
    popup.style.display = "block"; // Tampilkan pop-up registrasi
  }