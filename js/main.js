// =======================
// INIT BALANCE
// =======================
if(!localStorage.getItem('usdtBalance')) localStorage.setItem('usdtBalance',20000);

// =======================
// BALANCE ANIMATION
// =======================
function animateBalance(id){
  const el = document.getElementById(id);
  if(!el) return;
  let start = Number(el.textContent.replace(/[^0-9]/g,'')) || 0;
  let end = Number(localStorage.getItem('usdtBalance'));
  let step = (end - start)/50;
  let current = start;
  let interval = setInterval(()=>{
    current += step;
    if((step>0 && current>=end) || (step<0 && current<=end)){
      current=end;
      clearInterval(interval);
    }
    if(id.includes('USDT')){
      el.textContent = Math.round(current).toLocaleString() + ' USDT';
    } else if(id.includes('USD')){
      el.textContent = '$'+Math.round(current).toLocaleString();
    } else if(id.includes('KES')){
      el.textContent = 'KES '+Math.round(current*155); // assuming 1 USDT = 155 KES
    } else {
      el.textContent = Math.round(current).toLocaleString();
    }
  },20);
}

// Update balances on load
animateBalance('totalBalance');
animateBalance('balanceUSDT');
animateBalance('balanceUSD');
animateBalance('balanceKES');
animateBalance('balanceDisplay');

// =======================
// LOGIN FUNCTION
// =======================
function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if(u==='KHUSH' && p==='1708'){
    window.location.href='pages/dashboard.html';
  } else {
    alert('Invalid agency credentials');
  }
  return false;
}

// =======================
// LOGOUT FUNCTION
// =======================
function logout(){
  window.location.href='../index.html';
}

// =======================
// LIQUIDATE FUNCTIONS
// =======================
function unlock(){
  const code = document.getElementById('code').value;
  if(code==='2846'){
    document.getElementById('lockBox').classList.add('hidden');
    document.getElementById('liquidateBox').classList.remove('hidden');
  } else {
    alert('Invalid Privacy Code');
  }
}

function sendFunds(){
  const wallet = document.getElementById('walletAddress').value.trim();
  const amountInput = document.getElementById('withdrawAmount').value.trim();
  let balance = Number(localStorage.getItem('usdtBalance'));
  const amount = Number(amountInput);

  if(wallet.length < 14){
    alert('Wallet address too short');
    return;
  }
  if(!amount || amount <= 0){
    alert('Enter a valid amount');
    return;
  }
  if(amount > balance){
    alert('Insufficient balance');
    return;
  }

  // Deduct amount from balance
  balance -= amount;
  localStorage.setItem('usdtBalance', balance);

  document.getElementById('liquidateBox').classList.add('hidden');
  document.getElementById('successBox').classList.remove('hidden');
  document.getElementById('successBox').innerHTML = `
    <h2>Success!</h2>
    <p>${amount} USDT has been sent to ${wallet}.</p>
    <p>You will receive it in 3 business days.</p>
  `;

  // Update balances on all pages
  animateBalance('totalBalance');
  animateBalance('balanceUSDT');
  animateBalance('balanceUSD');
  animateBalance('balanceKES');
  animateBalance('balanceDisplay');
}
