const form = document.getElementById('topup-form');
const resultDiv = document.getElementById('result');
const popup = document.getElementById('popup');
const playerIdSummary = document.getElementById('player-id-summary');
const paymentMethodSummary = document.getElementById('payment-method-summary');
const priceSummary = document.getElementById('price-summary');
const timeSummary = document.getElementById('time-summary');
const confirmBtn = document.getElementById('confirm-btn');
const resultPopup = document.getElementById('result-popup');
const resultContent = document.getElementById('result-content');
const closeBtn = document.getElementById('close-btn');

function openResultPopup() {
  resultPopup.style.display = 'block';
}

function closeResultPopup() {
  resultPopup.style.display = 'none';
}

closeBtn.addEventListener('click', closeResultPopup);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const playerId = document.getElementById('player-id').value;
  playerIdSummary.innerHTML = `Player ID: <span>${playerId}</span>`;

  openPopup();
});

var payments = document.querySelectorAll('.payment-method');
var selectedPayment = '';

payments.forEach(function (paymentmethod) {
  paymentmethod.addEventListener('click', function () {
    payments.forEach(function (paymentmethod) {
      paymentmethod.classList.remove('active');
    });

    this.classList.add('active');
    selectedPayment = this.dataset.payment;
    paymentMethodSummary.textContent = `${selectedPayment}`;
  });
});

var priceItems = document.querySelectorAll('.price-item');
var selectedPrice = '';

priceItems.forEach(function (priceItem) {
  priceItem.addEventListener('click', function () {
    priceItems.forEach(function (priceItem) {
      priceItem.classList.remove('active');
    });

    this.classList.add('active');
    selectedPrice = this.dataset.price;
    priceSummary.textContent = `Rp${selectedPrice}`;
  });
});

confirmBtn.addEventListener('click', function () {
  // Cek apakah semua informasi telah dipilih
  if (selectedPayment && selectedPrice) {
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    var username = localStorage.getItem("username");
    var userIndex = registeredUsers.findIndex(function (u) {
      return u.username === username;
    });

    if (userIndex !== -1) {
      var saldo = parseInt(registeredUsers[userIndex].saldo) || 0;
      var topupAmount = parseInt(selectedPrice);

      if (saldo >= topupAmount) {
        showLoading();
        setTimeout(function () {
          closePopup();
          showSuccessPopup();
        }, 2000);
      } else {
        showInsufficientBalancePopup();
      }
    } else {
      alert("User not found!");
    }
  } else {
    alert('Harap pilih metode pembayaran dan harga terlebih dahulu!');
    closePopup();
  }
});

function showInsufficientBalancePopup() {
  closePopup();
  openResultPopup();

  resultContent.innerHTML = `
    <h3>Top Up Failed!</h3>
    <p>Insufficient Balance. Please top up your account.</p>
  `;

  hideLoading(); // Menyembunyikan loading setelah top-up gagal
}

function openPopup() {
  popup.style.display = 'block';
  updateTime();
}

function closePopup() {
  popup.style.display = 'none';
}

function showLoading() {
  confirmBtn.innerHTML = `
    <div class="loading-container">
      <div class="loading-icon"></div>
      <span class="loading-text">Loading...</span>
    </div>
  `;
  confirmBtn.classList.add('show-loading');
}

function hideLoading() {
  confirmBtn.innerHTML = 'Confirm';
  confirmBtn.classList.remove('show-loading');
}

function showSuccessPopup() {
  closePopup();
  openResultPopup();

  var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  var username = localStorage.getItem("username");
  var userIndex = registeredUsers.findIndex(function (u) {
    return u.username === username;
  });

  if (userIndex !== -1) {
    var saldo = parseInt(registeredUsers[userIndex].saldo) || 0;

    saldo -= parseInt(selectedPrice);

    registeredUsers[userIndex].saldo = saldo;
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    var saldoElement = document.getElementById("saldo");
    saldoElement.textContent = saldo;

    addTopupHistory(playerIdSummary.textContent, paymentMethodSummary.textContent, priceSummary.textContent, 'Top-Up Berhasil');

    hideLoading(); // Menyembunyikan loading setelah top-up berhasil

    // Menampilkan pesan sukses pada popup
    resultContent.innerHTML = `
      <h3>Top Up Successful!</h3>
      <p>Player ID: ${playerIdSummary.textContent}</p>
      <p>Payment Method: ${paymentMethodSummary.textContent}</p>
      <p>Price: ${priceSummary.textContent}</p>
    `;
  }
}


function showTopUpHistoryPopup(playerId, paymentMethod, price) {
  resultContent.innerHTML = `
    <h3>Top Up Successful!</h3>
    <p>Player ID: ${playerId}</p>
    <p>Payment Method: ${paymentMethod}</p>
    <p>Price: ${price}</p>
  `;
}

function updateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  timeSummary.textContent = `${formattedDate} ${formattedTime}`;
}

// ...

function addTopupHistory(playerId, paymentMethod, price, status) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  const topupHistory = {
    playerId: playerId,
    paymentMethod: paymentMethod,
    price: price,
    date: formattedDate,
    status: status
  };

  const topupHistories = JSON.parse(localStorage.getItem('topupHistories')) || [];
  topupHistories.push(topupHistory);
  localStorage.setItem('topupHistories', JSON.stringify(topupHistories));
}

// ...

function showTopupHistory() {
  const topupHistoryContainer = document.getElementById('topup-history-container');
  topupHistoryContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan riwayat

  const topupHistories = JSON.parse(localStorage.getItem('topupHistories')) || [];

  if (topupHistories.length > 0) {
    topupHistories.forEach(function (history) {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history-item');

      const playerId = document.createElement('p');
      playerId.textContent = `Player ID: ${history.playerId}`;

      const paymentMethod = document.createElement('p');
      paymentMethod.textContent = `Metode Pembayaran: ${history.paymentMethod}`;

      const price = document.createElement('p');
      price.textContent = `Harga: ${history.price}`;

      const date = document.createElement('p');
      date.textContent = `Tanggal: ${history.date}`;

      const status = document.createElement('p');
      status.textContent = `Status: ${history.status}`;

      historyItem.appendChild(playerId);
      historyItem.appendChild(paymentMethod);
      historyItem.appendChild(price);
      historyItem.appendChild(date);
      historyItem.appendChild(status);

      topupHistoryContainer.appendChild(historyItem);
    });
  } else {
    const noHistory = document.createElement('p');
    noHistory.textContent = 'Belum ada riwayat top-up.';

    topupHistoryContainer.appendChild(noHistory);
  }
}

showTopupHistory(); // Memanggil fungsi untuk menampilkan riwayat top-up saat halaman dimuat
