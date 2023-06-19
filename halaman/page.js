// Memeriksa status dark mode pada local storage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
  // Menampilkan saldo jika pengguna sudah login
  var username = localStorage.getItem("username");
  var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  var user = registeredUsers.find(function(u) {
    return u.username === username;
  });

  if (user) {
    var saldoElement = document.getElementById("saldo");
    saldoElement.textContent = user.saldo; // Tampilkan saldo pada elemen HTML
  }
});

// Fungsi untuk log out
function logout() {
  var confirmation = confirm("Apakah Anda yakin ingin logout?"); // Tampilkan konfirmasi

  if (confirmation) {
    localStorage.removeItem("username");
    // Redirect ke halaman login atau halaman lain yang sesuai
    window.location.href = "../login.html"; // Ganti dengan halaman login atau halaman tujuan setelah log out
  }
}

// Fungsi untuk mengaktifkan mode gelap
function enableDarkMode() {
  var body = document.body;
  body.classList.add("dark-mode");

  // Menyimpan status dark mode pada local storage
  localStorage.setItem("darkMode", "true");
}

// Fungsi untuk menonaktifkan mode gelap
function disableDarkMode() {
  var body = document.body;
  body.classList.remove("dark-mode");

  // Menyimpan status dark mode pada local storage
  localStorage.setItem("darkMode", "false");
}

// Mengatur event listener pada tombol toggle dark mode
var darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", function() {
  var body = document.body;
  var isDarkModeEnabled = body.classList.contains("dark-mode");

  // Toggle mode gelap berdasarkan status saat ini
  if (isDarkModeEnabled) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});