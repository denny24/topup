// Player ID
const form = document.getElementById('topup-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const playerId = document.getElementById('player-id').value;
  resultDiv.innerHTML = `Top Up for Player ID: ${playerId}`;
});

// Ambil semua elemen dengan class 'price-item'
const priceItems = document.querySelectorAll('.price-item');

// Tambahkan event listener untuk setiap price item
priceItems.forEach(item => {
  item.addEventListener('click', () => {
    // Hapus class 'active' dari semua price item
    priceItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Tambahkan class 'active' pada price item yang diklik
    item.classList.add('active');
    
    // Ambil harga dari atribut data-price
    const price = item.dataset.price;
    
    // Tampilkan harga di result
    document.getElementById('result').textContent = `Anda memilih harga: Rp ${price}`;
  });
});

var payments = document.querySelectorAll('.payment-method');

payments.forEach(function(paymentmethod) {
  paymentmethod.addEventListener('click', function() {
    // Hapus kelas 'active' dari semua payment-method
    payments.forEach(function(paymentmethod) {
      paymentmethod.classList.remove('active');
    });
    
    // Tambahkan kelas 'active' pada payment-method yang diklik
    this.classList.add('active');
  });
});


