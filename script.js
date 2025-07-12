// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true,
});
// AOS
AOS.init({ duration: 800, once: true });

// Savings Calculator
document.getElementById("calc-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const deposit = parseFloat(document.getElementById("deposit").value);
  const duration = parseInt(document.getElementById("duration").value);
  const monthlyRate = 0.03; // 3% monthly

  let result = deposit * Math.pow((1 + monthlyRate), duration);
  document.getElementById("calc-result").textContent = `Projected Balance: $${result.toFixed(2)}`;
});

// Simulated SUI price
setInterval(() => {
  const price = (0.7 + Math.random() * 0.2).toFixed(2);
  document.getElementById("sui-price").textContent = `$${price}`;
}, 3000);

// ChartJS Growth Chart
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('growthChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Balance Growth ($)',
        data: [100, 103, 106.09, 109.27, 112.55, 115.93, 119.41],
        borderColor: '#3fc1c9',
        backgroundColor: '#3fc1c933',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#ccc' } },
        y: { ticks: { color: '#ccc' } }
      },
      plugins: {
        legend: { labels: { color: '#ccc' } }
      }
    }
  });
});
// Logout simulation
function logout() {
  alert("Logging out...");
  document.querySelector('#user-wallet').textContent = 'Disconnected';
}

// Transfer form mock
document.getElementById("transfer-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("transfer-msg").textContent = "Transfer submitted!";
  setTimeout(() => {
    document.getElementById("transfer-msg").textContent = "";
  }, 3000);
});
// FAQ toggle
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.style.display === "block";
    answer.style.display = isOpen ? "none" : "block";
  });
});
// --- Existing AOS init and other code remain ---

// Modal elements
const welcomeModal = document.getElementById('welcome-modal');
const tosModal = document.getElementById('tos-modal');
const modalCloseBtn = document.getElementById('modal-close');
const acceptTosBtn = document.getElementById('accept-tos');

const connectWalletBtn = document.getElementById('connect-wallet');
const switchAccountBtn = document.getElementById('switch-account');
const walletQrContainer = document.getElementById('wallet-qr');

const avatarDropArea = document.querySelector('.avatar-drop-area');
const avatarInput = document.getElementById('avatar-input');

// Show welcome modal on first visit (using localStorage)
if (!localStorage.getItem('visited')) {
  welcomeModal.style.display = 'flex';
  localStorage.setItem('visited', 'true');
}

modalCloseBtn.onclick = () => {
  welcomeModal.style.display = 'none';
  tosModal.style.display = 'flex';
};

acceptTosBtn.onclick = () => {
  tosModal.style.display = 'none';
  localStorage.setItem('tosAccepted', 'true');
};

// Wallet connect simulation
let connectedWallet = null;
connectWalletBtn.onclick = () => {
  // Fake wallet address
  connectedWallet = '0xA1b2C3D4E5F6G7H8I9J0';
  document.getElementById('user-wallet').textContent = connectedWallet;
  connectWalletBtn.disabled = true;
  switchAccountBtn.disabled = false;
  generateQRCode(connectedWallet);
};

// Switch account simulation (toggles between 2 fake addresses)
switchAccountBtn.onclick = () => {
  connectedWallet = connectedWallet === '0xA1b2C3D4E5F6G7H8I9J0' 
    ? '0xB2C3D4E5F6G7H8I9J0A1'
    : '0xA1b2C3D4E5F6G7H8I9J0';
  document.getElementById('user-wallet').textContent = connectedWallet;
  generateQRCode(connectedWallet);
};

// Generate QR code using a simple library or API (here using QRCode.js)
// Include this in your index.html head:
// <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
function generateQRCode(text) {
  walletQrContainer.innerHTML = '';
  QRCode.toCanvas(text, { width: 128 }, function (error, canvas) {
    if (error) console.error(error);
    walletQrContainer.appendChild(canvas);
  });
}

// Drag & drop avatar upload
avatarDropArea.addEventListener('click', () => avatarInput.click());

avatarDropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  avatarDropArea.classList.add('dragover');
});

avatarDropArea.addEventListener('dragleave', () => {
  avatarDropArea.classList.remove('dragover');
});

avatarDropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  avatarDropArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  handleAvatarFile(file);
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleAvatarFile(file);
});

function handleAvatarFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.querySelector('.avatar');
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
// Chart.js setup for earnings overview
const earningsPieCtx = document.getElementById('earningsPieChart').getContext('2d');
const earningsBarCtx = document.getElementById('earningsBarChart').getContext('2d');
const stakingPoolCtx = document.getElementById('stakingPoolChart').getContext('2d');

const earningsPieChart = new Chart(earningsPieCtx, {
  type: 'pie',
  data: {
    labels: ['Interest', 'Deposits', 'Withdrawals'],
    datasets: [{
      data: [35, 50, 15],
      backgroundColor: ['#3fc1c9', '#5555ff', '#ff5555'],
      hoverOffset: 20
    }]
  }
});

const earningsBarChart = new Chart(earningsBarCtx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Earnings (USDC)',
      data: [5, 8, 12, 15, 18, 22, 27],
      backgroundColor: '#3fc1c9',
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

const stakingPoolChart = new Chart(stakingPoolCtx, {
  type: 'doughnut',
  data: {
    labels: ['SUI', 'USDC', 'Other'],
    datasets: [{
      data: [55, 40, 5],
      backgroundColor: ['#3fc1c9', '#f4a261', '#e76f51']
    }]
  }
});

// Interest history export CSV
document.getElementById('exportCSV').addEventListener('click', () => {
  const rows = [
    ['Date', 'Amount (USDC)'],
    ['2025-07-01', '5.00'],
    ['2025-07-02', '5.15'],
    ['2025-07-03', '5.30']
  ];
  let csvContent = "data:text/csv;charset=utf-8,"
    + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interest_history.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Savings Goal Tracker
const goalInput = document.getElementById('goalAmount');
const setGoalBtn = document.getElementById('setGoalBtn');
const goalStatus = document.getElementById('goalStatus');

let currentBalance = 119.41; // example current balance from earlier chart

setGoalBtn.addEventListener('click', () => {
  const goal = parseFloat(goalInput.value);
  if (isNaN(goal) || goal <= 0) {
    goalStatus.textContent = 'Please enter a valid goal amount.';
    return;
  }
  if (currentBalance >= goal) {
    goalStatus.textContent = `Congratulations! You've reached your goal of $${goal.toFixed(2)}.`;
  } else {
    const remaining = goal - currentBalance;
    goalStatus.textContent = `You need $${remaining.toFixed(2)} more to reach your goal. Keep saving!`;
  }
});

// SUI Gas Estimator simulation
const gasTxType = document.getElementById('gasTxType');
const estimateGasBtn = document.getElementById('estimateGasBtn');
const gasEstimateResult = document.getElementById('gasEstimateResult');

estimateGasBtn.addEventListener('click', () => {
  const txType = gasTxType.value;
  let estimate;
  switch(txType) {
    case 'transfer': estimate = 0.0001; break;
    case 'withdraw': estimate = 0.00015; break;
    case 'deposit': estimate = 0.00012; break;
    default: estimate = 0.0001;
  }
  gasEstimateResult.textContent = `Estimated Gas Fee: ${estimate.toFixed(5)} SUI`;
});
// Security alert simulation: wallet disconnect after 2 minutes (simulated)
setTimeout(() => {
  const alertsDiv = document.getElementById('security-alerts');
  alertsDiv.textContent = "⚠️ Warning: Wallet disconnected. Please reconnect.";
}, 120000); // 2 minutes

// Simulated login history
const loginList = document.getElementById('login-list');
const simulatedLogins = [
  { date: '2025-07-08 12:30', ip: '102.45.32.11', device: 'Chrome on Windows' },
  { date: '2025-07-07 20:15', ip: '102.45.32.11', device: 'Firefox on Android' },
  { date: '2025-07-06 14:50', ip: '198.51.100.23', device: 'Safari on iPhone' },
];

simulatedLogins.forEach(login => {
  const li = document.createElement('li');
  li.textContent = `${login.date} — IP: ${login.ip}, Device: ${login.device}`;
  loginList.appendChild(li);
});
// Referral Link Generator + QR
const referralInput = document.getElementById('referralLink');
const referralQR = document.getElementById('referralQR');
document.getElementById('generateReferral').addEventListener('click', () => {
  const refCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralURL = `https://di-vidend.com/?ref=${refCode}`;
  referralInput.value = referralURL;
  referralQR.innerHTML = '';
  QRCode.toCanvas(referralURL, { width: 128 }, (err, canvas) => {
    if (!err) referralQR.appendChild(canvas);
  });
});

// Newsletter Subscribe (simulate)
document.getElementById('subscribeBtn').addEventListener('click', () => {
  const email = document.getElementById('newsletterEmail').value;
  const status = document.getElementById('newsletterStatus');
  if (!email || !email.includes('@')) {
    status.textContent = '❌ Please enter a valid email.';
  } else {
    status.textContent = '✅ Subscribed successfully!';
    document.getElementById('newsletterEmail').value = '';
  }
});

// AMA Countdown Timer
const amaDate = new Date('2025-08-01T18:00:00Z');
const amaTimer = document.getElementById('amaTimer');

setInterval(() => {
  const now = new Date();
  const distance = amaDate - now;
  if (distance <= 0) {
    amaTimer.textContent = "✅ We're live now!";
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((distance / (1000 * 60)) % 60);
  amaTimer.textContent = `${days}d ${hours}h ${mins}m to next AMA`;
}, 1000);

// Testimonial Submit
document.getElementById('submitTestimonial').addEventListener('click', () => {
  const text = document.getElementById('testimonialText').value;
  const status = document.getElementById('testimonialStatus');
  if (text.length < 5) {
    status.textContent = '❌ Too short.';
    return;
  }
  status.textContent = '✅ Thank you for your feedback!';
  document.getElementById('testimonialText').value = '';
});