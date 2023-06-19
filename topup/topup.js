// Memeriksa status dark mode pada local storage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    var darkModeStatus = localStorage.getItem("darkMode");
  
    // Mengatur mode gelap jika status dark mode true
    if (darkModeStatus === "true") {
      enableDarkMode();
    }
  });
  
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

  // PAYMENT
  const paymentMethods = document.querySelectorAll('.payment-method');
const resultDiv = document.getElementById('result');

paymentMethods.forEach(method => {
  method.addEventListener('click', () => {
    paymentMethods.forEach(method => {
      method.classList.remove('active');
    });

    method.classList.add('active');
    const methodName = method.querySelector('.method-name').textContent;
    resultDiv.textContent = `You selected payment method: ${methodName}`;
  });
});
