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
      const noHistoryMessage = document.createElement('p');
      noHistoryMessage.classList.add('no-history-message');
      noHistoryMessage.textContent = 'Tidak ada riwayat top-up.';
      topupHistoryContainer.appendChild(noHistoryMessage);
    }
  }
  
  showTopupHistory();
  