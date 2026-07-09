// =================== KONFIGURACE ===================
const GAS_URL = "https://script.google.com/macros/s/AKfycbyB7Uf9V9knZRrB8m4jig1zgCL87y2GxBJa_xX8RMpLvufrWmYb1b49I8duUzErLJ37/exec";

const EMPLOYEES = {
  "1001": "Centrální tablet",
  "1002": "Filip Dvořáček",
  "1003": "Pavel Krchňavý",
  "1004": "Tereza Smutná",
  "1005": "Veronika Urbanová",
  "1006": "Jan Balek",
  "1007": "Marie Pölzerová",
  "1008": "Lea Vlčková",
  "1009": "Jitka Urbánková",
  "1010": "Eliška Pölzerová",
  "1011": "Markéta Devetterová",
  "1012": "Ester Hlaváčková",
  "1013": "Jan Pelán"
};

const PRODUCTS = {
  "Charis": [
    { name: "Pohlednice Charis", price: 40 },
    { name: "Samolepky Charis", price: 20 },
    { name: "Oplatky", price: 90 },
    { name: "Prapor VELKÝ", price: 430 },
    { name: "Prapor DĚTSKÝ", price: 270 },
    { name: "Prapor RATOLEST", price: 330 },
    { name: "Poštovní služba", price: 40 },
    { name: "Gumička 1ks", price: 80 },
    { name: "Gumičky 2ks", price: 150 },
    { name: "Plátěnka", price: 120 }
  ],
  "Godzone kids": [
    { name: "detská mikina SOM ORIGINÁL", price: 485 },
    { name: "detská mikina OVOCIE DUCHA zelená", price: 485 },
    { name: "detská mikina OVOCIE DUCHA růžová", price: 485 },
    { name: "detská šiltovka SOM ORIGINÁL", price: 320 },
    { name: "detské cd ODVÁŽNY PRIATEĽ", price: 250 },
    ],
    "Godzone": [
    { name: "3 rôzne odznaky spolu", price: 50 },
    { name: "cd VITAJ V SLOBODE", price: 250 },
    { name: "cd NIE SI NA TO SÁM", price: 250 },
    { name: "cd NA SVÄTÝ VRCH", price: 300 },
    { name: "Chilly flaška", price: 680 },
    { name: "Mikina ABBA", price: 850 },
    { name: "Mikina SVÄTÝ, SVÄTÝ, SVÄTÝ", price: 850 },
    { name: "Mikina SOFONIÁŠ", price: 870 },
    { name: "Mikina SOM ORIGINÁL", price: 730 },
    { name: "Mikina I WILL BLESS", price: 730 },
    { name: "Mikina GRACE HUNTER", price: 970 },
    { name: "Mikina LOST AND FOUND", price: 970 },
    { name: "Šaty ŽALM 46 ZELENÉ", price: 725 },
    { name: "Šaty ŽALM 46 MODRÉ", price: 725 },
    { name: "Tričko LOST AND FOUND", price: 485 },
    { name: "Tričko GRACE HUNTER", price: 555 },
    { name: "Tričko SOFONIÁŠ", price: 580 },
    { name: "Tričko HOPE RUNNER", price: 725 },
    { name: "Tričko BLOOM", price: 560 },
    { name: "Ponožky MODRÉ", price: 190 },
    { name: "Ponožky JESUS", price: 190 },
    { name: "Ponožky ČIERNE", price: 190 },
    { name: "Ponožky KÁROVANÉ", price: 190 },
    { name: "Ponožky SOFONIÁŠ", price: 190 },
    { name: "šiltovka HOPE RUNNER", price: 365 },
    { name: "šiltovka GRACE", price: 365 },
    { name: "plátenka MORNING MERCY", price: 385 },
    { name: "plátenka HOPE RUNNER", price: 385 }
  ],
  "Solí ze mě": [
    { name: "Přání s obálkou (různé druhy)", price: 85 },
    { name: "Pohlednice (různé druhy)", price: 40 },
    { name: "Záložky (různé druhy)", price: 20 },
    { name: "Křížová cesta", price: 180 },
    { name: "Plakáty (různé druhy)", price: 350 }
  ],
  "Little Things": [
    { name: "Biblické karty", price: 200 },
    { name: "Duchovní deník pro muže", price: 250 }
  ],
  "Výprodej": [
    { name: "Kapesní kabel nabíjející", price: 200 },
    { name: "Keramický hrnek se dřevem", price: 200 },
    { name: "Příbory", price: 150 },
    { name: "Kšiltovka", price: 80 },
    { name: "Brýle sluneční bílé CHARIS", price: 80 },
    { name: "Vějíř CHARIS", price: 80 },
    { name: "Pláštěnka", price: 50 },
    { name: "Trička", price: 80 },
  ]
};

// =================== STAV APLIKACE ===================
let enteredPin = "";
let currentEmployee = null;
let cart = []; 
let activeSupplier = Object.keys(PRODUCTS)[0];

// =================== DOM ELEMENTY ===================
const loginScreen = document.getElementById("login-screen");
const posScreen = document.getElementById("pos-screen");
const pinDots = document.querySelectorAll(".pin-dot");
const pinError = document.getElementById("pin-error");
const employeeNameEl = document.getElementById("employee-name");
const supplierTabsEl = document.getElementById("supplier-tabs");
const productGridEl = document.getElementById("product-grid");
const cartItemsEl = document.getElementById("cart-items");
const cartEmptyEl = document.getElementById("cart-empty");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const calcCheckoutBtn = document.getElementById("calc-checkout-btn");

// DOM Elementy Celostránkové Kalkulačky
const calcScreen = document.getElementById("calc-screen");
const calcTotalDisplay = document.getElementById("calc-total-display");
const calcReceivedInput = document.getElementById("calc-received-input");
const calcResultBox = document.getElementById("calc-result-box");
const calcResultLabel = document.getElementById("calc-result-label");
const calcChangeDisplay = document.getElementById("calc-change-display");
const calcCancelBtn = document.getElementById("calc-cancel-btn");
const calcConfirmBtn = document.getElementById("calc-confirm-btn");
const calcQuickAmountsEl = document.getElementById("calc-quick-amounts");

// Zrušení delaye na mobilech
document.addEventListener("touchstart", function() {}, { passive: true });

// =================== HAPTICKÁ ODEZVA ===================
document.addEventListener('click', (e) => {
  const isClickable = e.target.closest('.pin-btn, .supplier-tab, .product-card, button, .calc-numpad-btn, .quick-amount-btn');
  if (isClickable && navigator.vibrate) {
    navigator.vibrate(40); 
  }
});

// =================== PIN LOGIN ===================
document.querySelectorAll(".pin-btn[data-num]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (enteredPin.length >= 4) return;
    enteredPin += btn.dataset.num;
    updatePinDots();
    if (enteredPin.length === 4) checkPin();
  });
});

document.getElementById("pin-back").addEventListener("click", () => {
  enteredPin = enteredPin.slice(0, -1);
  updatePinDots();
});

document.getElementById("pin-clear").addEventListener("click", () => {
  enteredPin = "";
  updatePinDots();
});

function updatePinDots() {
  pinDots.forEach((dot, i) => {
    dot.classList.toggle("filled", i < enteredPin.length);
  });
  pinError.classList.add("hidden");
}

function checkPin() {
  const name = EMPLOYEES[enteredPin];
  if (name) {
    currentEmployee = { pin: enteredPin, name };
    employeeNameEl.textContent = name;
    loginScreen.classList.add("hidden");
    posScreen.classList.remove("hidden");
    renderSupplierTabs();
    renderProducts();
    renderCart();
  } else {
    pinError.classList.remove("hidden");
    setTimeout(() => {
      enteredPin = "";
      updatePinDots();
    }, 600);
  }
}

document.getElementById("logout-btn").addEventListener("click", () => {
  if (cart.length > 0 && !confirm("V košíku jsou nezaúčtované položky. Opravdu se chceš odhlásit?")) return;
  currentEmployee = null;
  cart = [];
  enteredPin = "";
  updatePinDots();
  posScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

// =================== ZÁLOŽKY DODAVATELŮ ===================
function renderSupplierTabs() {
  supplierTabsEl.innerHTML = "";
  Object.keys(PRODUCTS).forEach(supplier => {
    const tab = document.createElement("div");
    tab.className = "supplier-tab" + (supplier === activeSupplier ? " active" : "");
    tab.textContent = supplier;
    tab.addEventListener("click", () => {
      activeSupplier = supplier;
      renderSupplierTabs();
      renderProducts();
    });
    supplierTabsEl.appendChild(tab);
  });
}

// =================== PRODUKTY ===================
function renderProducts() {
  productGridEl.innerHTML = "";
  PRODUCTS[activeSupplier].forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="p-name">${product.name}</div>
      <div class="p-price">${product.price} Kč</div>
    `;
    card.addEventListener("click", () => addToCart(activeSupplier, product));
    productGridEl.appendChild(card);
  });
}

// =================== KOŠÍK ===================
function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function addToCart(supplier, product) {
  const existing = cart.find(i => i.supplier === supplier && i.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ supplier, name: product.name, price: product.price, qty: 1 });
  }
  renderCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  if (cart.length === 0) {
    cartItemsEl.appendChild(cartEmptyEl);
    cartEmptyEl.classList.remove("hidden");
  } else {
    cartEmptyEl.classList.add("hidden");
    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "cart-item flex justify-between items-center";
      row.innerHTML = `
        <div class="flex-1 pr-2">
          <div class="text-sm font-semibold text-slate-700">${item.name}</div>
          <div class="text-xs text-slate-400">${item.supplier} · ${item.price} Kč/ks</div>
        </div>
        <div class="flex items-center gap-2">
          <button class="qty-btn" data-action="minus" data-index="${index}">−</button>
          <span class="w-6 text-center font-semibold">${item.qty}</span>
          <button class="qty-btn" data-action="plus" data-index="${index}">+</button>
          <button class="text-red-400 text-sm ml-1" data-action="remove" data-index="${index}">✕</button>
        </div>
      `;
      cartItemsEl.appendChild(row);
    });
  }

  cartItemsEl.querySelectorAll("button[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      if (action === "plus") changeQty(idx, 1);
      if (action === "minus") changeQty(idx, -1);
      if (action === "remove") removeItem(idx);
    });
  });

  const total = getCartTotal();
  cartTotalEl.textContent = total + " Kč";
  
  const isCartEmpty = cart.length === 0;
  checkoutBtn.disabled = isCartEmpty;
  calcCheckoutBtn.disabled = isCartEmpty;
}

// =================== CELOSTRÁNKOVÁ KALKULAČKA ===================

function getSuggestedAmounts(total) {
  let suggestions = new Set();
  let nextFifty = Math.ceil(total / 50) * 50;
  suggestions.add(nextFifty);

  let nextHundred = Math.ceil(total / 100) * 100;
  suggestions.add(nextHundred); 

  const banknotes = [200, 500, 1000, 2000, 5000];
  for (let note of banknotes) {
    if (note > total) suggestions.add(note);
  }
  return Array.from(suggestions).slice(0, 3);
}

function renderQuickAmounts(total) {
  calcQuickAmountsEl.innerHTML = "";
  const suggestions = getSuggestedAmounts(total);
  
  suggestions.forEach(amount => {
    const btn = document.createElement("button");
    // Úspornější polstrování pro tlačítka (py-2, text-lg)
    btn.className = "quick-amount-btn flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 rounded-xl border border-emerald-200 transition-colors text-lg shadow-sm";
    btn.textContent = amount;
    btn.addEventListener("click", () => {
      calcReceivedInput.value = amount;
      updateCalcDisplay();
    });
    calcQuickAmountsEl.appendChild(btn);
  });
}

document.querySelectorAll(".calc-numpad-btn[data-num]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (calcReceivedInput.value.length < 8) { 
      calcReceivedInput.value += btn.dataset.num;
      updateCalcDisplay();
    }
  });
});

document.getElementById("calc-numpad-back").addEventListener("click", () => {
  calcReceivedInput.value = calcReceivedInput.value.slice(0, -1);
  updateCalcDisplay();
});

document.getElementById("calc-numpad-clear").addEventListener("click", () => {
  calcReceivedInput.value = "";
  updateCalcDisplay();
});

function updateCalcDisplay() {
  const total = getCartTotal();
  const receivedStr = calcReceivedInput.value;
  
  if (!receivedStr) {
    calcResultLabel.textContent = "Vrátit:";
    calcChangeDisplay.textContent = "0 Kč";
    calcResultBox.className = "flex justify-between items-center mb-3 text-lg bg-slate-50 p-3 rounded-xl border-2 border-slate-100 transition-colors shrink-0";
    calcChangeDisplay.className = "font-black text-slate-400 text-2xl";
    calcConfirmBtn.disabled = true;
    return;
  }

  const received = parseInt(receivedStr, 10) || 0;
  const change = received - total;
  
  if (change < 0) {
    calcResultLabel.textContent = "Zbývá doplatit:";
    calcChangeDisplay.textContent = Math.abs(change) + " Kč";
    calcResultBox.className = "flex justify-between items-center mb-3 text-lg bg-red-50 p-3 rounded-xl border-2 border-red-100 transition-colors shrink-0";
    calcChangeDisplay.className = "font-black text-red-600 text-2xl";
    calcConfirmBtn.disabled = true;
  } else {
    calcResultLabel.textContent = "Vrátit:";
    calcChangeDisplay.textContent = change + " Kč";
    calcResultBox.className = "flex justify-between items-center mb-3 text-lg bg-emerald-50 p-3 rounded-xl border-2 border-emerald-100 transition-colors shrink-0";
    calcChangeDisplay.className = "font-black text-emerald-600 text-2xl";
    calcConfirmBtn.disabled = false;
  }
}

// OTEVŘENÍ OBRAZOVKY KALKULAČKY
calcCheckoutBtn.addEventListener("click", () => {
  const total = getCartTotal();
  calcTotalDisplay.textContent = total + " Kč";
  calcReceivedInput.value = "";
  
  renderQuickAmounts(total);
  updateCalcDisplay();
  
  // Přepnutí obrazovek
  posScreen.classList.add("hidden");
  calcScreen.classList.remove("hidden");
});

// ZAVŘENÍ OBRAZOVKY KALKULAČKY (NÁVRAT K NÁKUPU)
calcCancelBtn.addEventListener("click", () => {
  calcScreen.classList.add("hidden");
  posScreen.classList.remove("hidden");
});

// =================== ZAÚČTOVÁNÍ ===================
const overlay = document.getElementById("overlay");
const overlayLoading = document.getElementById("overlay-loading");
const overlaySuccess = document.getElementById("overlay-success");
const overlayError = document.getElementById("overlay-error");

document.getElementById("overlay-close").addEventListener("click", () => {
  overlay.classList.add("hidden");
});

async function processCheckout() {
  if (cart.length === 0) return;

  // Modální okno načítání se překryje přes aktivní obrazovku
  overlay.classList.remove("hidden");
  overlayLoading.classList.remove("hidden");
  overlaySuccess.classList.add("hidden");
  overlayError.classList.add("hidden");

  const timestamp = new Date().toISOString();

  const salesRows = cart.map(item => ({
    timestamp,
    employee: currentEmployee.name,
    supplier: item.supplier,
    product: item.name,
    quantity: item.qty,
    unitPrice: item.price,
    total: item.qty * item.price
  }));

  try {
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ sales: salesRows })
    });

    overlayLoading.classList.add("hidden");
    overlaySuccess.classList.remove("hidden");
    
    // Vyčištění a návrat do POSu na pozadí
    cart = [];
    renderCart();
    calcScreen.classList.add("hidden");
    posScreen.classList.remove("hidden");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 1800); 

  } catch (err) {
    console.error(err);
    overlayLoading.classList.add("hidden");
    overlayError.classList.remove("hidden");
  }
}

checkoutBtn.addEventListener("click", processCheckout);
calcConfirmBtn.addEventListener("click", processCheckout);
