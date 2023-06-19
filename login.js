function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var popup = document.getElementById("popup");

    // Lakukan validasi sesuai kebutuhan
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    var user = registeredUsers.find(function (u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        // Setelah login berhasil
        var username = user.username; // Ganti dengan username yang sebenarnya
        localStorage.setItem("username", username);
        var popupContent = document.getElementById("popup-content");
        popupContent.innerHTML = "<h2>Login berhasil!</h2><p>Selamat datang, " + user.username + "!</p><button class='close-btn' onclick='closePopupAndRedirect()'>Close</button>";
        popup.style.display = "block"; // Tampilkan pop-up saat login berhasil
    } else {
        alert("Login gagal. Periksa kembali username dan password Anda.");
    }
}

function registerAccount() {
  var regUsername = document.getElementById("reg-username").value;
  var regPassword = document.getElementById("reg-password").value;

  // Lakukan validasi sesuai kebutuhan
  if (regUsername && regPassword) {
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    var existingUser = registeredUsers.find(function (user) {
      return user.username === regUsername;
    });

    if (existingUser) {
      alert("Username sudah digunakan. Silakan pilih username lain.");
    } else {
      // Buat objek akun baru dengan saldo awal
      var newUser = {
        username: regUsername,
        password: regPassword,
        saldo: 1000000,
      };

      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      // Tampilkan pop-up selamat
      var popup = document.getElementById("popup");
      var popupContent = document.getElementById("popup-content");
      popupContent.innerHTML = "<h2>Akun berhasil terdaftar!</h2><p>Selamat Datang, " + newUser.username + "! <br> Anda mendapatkan saldo sebesar Rp1.000.000.</p><button class='close-btn' onclick='closePopupAndLogin()'>Close</button>";
      popup.style.display = "block"; // Tampilkan pop-up setelah registrasi berhasil
    }
  } else {
    alert("Mohon isi username dan password dengan benar.");
  }
}



function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Sembunyikan pop-up saat tombol close ditekan
}

function closePopupAndRedirect() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Sembunyikan pop-up saat tombol close ditekan
    window.location.href = "halaman/page.html";
}

function closePopupAndLogin() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Sembunyikan pop-up saat tombol close ditekan

    // Mengisi form login dengan username yang telah didaftarkan
    var regUsername = document.getElementById("reg-username").value;
    var loginUsername = document.getElementById("username");
    var loginPassword = document.getElementById("password");
    loginUsername.value = regUsername;
    loginPassword.focus();
}

function forgotPassword() {
    var username = document.getElementById("username").value;

    // Lakukan validasi username sesuai kebutuhan
    if (username) {
        var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        var user = registeredUsers.find(function (u) {
            return u.username === username;
        });

        if (user) {
            var popup = document.getElementById("popup");
            var popupContent = document.getElementById("popup-content");
            popupContent.innerHTML = `
          <h2>Lupa Password</h2>
          <p>Password Anda: ${user.password}</p>
          <button class='close-btn' onclick='closePopup()'>Close</button>
        `;
            popup.style.display = "block"; // Tampilkan pop-up lupa password
        } else {
            alert("Username tidak ditemukan.");
        }
    } else {
        alert("Mohon masukkan username Anda terlebih dahulu.");
    }
}

var passwordInput = document.getElementById("password");

passwordInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === "NumpadEnter") {
    event.preventDefault(); // Mencegah submit form bawaan
    validateLogin(); // Panggil fungsi untuk validasi login
  }
});