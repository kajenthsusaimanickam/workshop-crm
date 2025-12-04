// --------------------------------------
// 0. LANGUAGE SYSTEM (EN <-> TA)
// --------------------------------------
const translations = {
  en: {
    "app.title": "Workshop CRM",

    "home.addJob": "➕ Add Job / Service",
    "home.customers": "👤 Customers",
    "home.vehicles": "🚗 Vehicles",
    "home.today": "📅 Today's Jobs",
    "home.reminders": "🔔 Service Reminders",

    "screen.home": "Home",
    "screen.customers": "Customers",
    "screen.vehicles": "Vehicles",
    "screen.addService": "Add Service",
    "screen.today": "Today's Jobs",
    "screen.reminders": "Reminders",

    "customers.title": "Customers",
    "customers.name": "Customer name",
    "customers.phone": "Phone number",
    "customers.whatsapp": "Has WhatsApp",
    "customers.notes": "Notes (optional)",
    "customers.save": "Save Customer",
    "customers.list": "Saved Customers",
    "customers.search": "Search customers...",

    "vehicles.title": "Vehicles",
    "vehicles.customer": "Customer",
    "vehicles.type": "Vehicle type",
    "vehicles.model": "Model (e.g. Pulsar 150)",
    "vehicles.number": "Number plate (e.g. TN-10-AB-1234)",
    "vehicles.notes": "Vehicle notes (optional)",
    "vehicles.save": "Save Vehicle",
    "vehicles.list": "Saved Vehicles",
    "vehicles.search": "Search vehicles...",

    "service.title": "Add Job / Service",
    "service.work": "Work done (e.g. Oil change)",
    "service.amount": "Amount",
    "service.notes": "Service notes (optional)",
    "service.save": "Save Service",
    "service.list": "Saved Services",

    "today.title": "Today's Jobs",
    "reminders.title": "Next Service Reminders",
  },

  ta: {
    "app.title": "வர்க்ஷாப் CRM",

    "home.addJob": "➕ புதிய வேலை / சர்வீஸ்",
    "home.customers": "👤 கஸ்டமர்கள்",
    "home.vehicles": "🚗 வாகனங்கள்",
    "home.today": "📅 இன்றைய வேலைகள்",
    "home.reminders": "🔔 ரிமைண்டர்கள்",

    "screen.home": "முகப்பு",
    "screen.customers": "கஸ்டமர்கள்",
    "screen.vehicles": "வாகனங்கள்",
    "screen.addService": "வேலை சேர்",
    "screen.today": "இன்றைய வேலைகள்",
    "screen.reminders": "ரிமைண்டர்கள்",

    "customers.title": "கஸ்டமர்கள்",
    "customers.name": "பெயர்",
    "customers.phone": "போன் நம்பர்",
    "customers.whatsapp": "வாட்ஸ்அப் இருக்கா",
    "customers.notes": "குறிப்பு (ஆப்ஷனல்)",
    "customers.save": "கஸ்டமர் சேமிக்க",
    "customers.list": "சேமித்த கஸ்டமர்கள்",
    "customers.search": "கஸ்டமரை தேடு...",

    "vehicles.title": "வாகனங்கள்",
    "vehicles.customer": "கஸ்டமர்",
    "vehicles.type": "வகை",
    "vehicles.model": "மாடல்",
    "vehicles.number": "நம்பர் பிளேட்",
    "vehicles.notes": "குறிப்பு (ஆப்ஷனல்)",
    "vehicles.save": "வாகனம் சேமிக்க",
    "vehicles.list": "சேமித்த வாகனங்கள்",
    "vehicles.search": "வாகனத்தை தேடு...",

    "service.title": "வேலை / சர்வீஸ்",
    "service.work": "செய்த வேலை",
    "service.amount": "அமவுண்ட்",
    "service.notes": "குறிப்பு (ஆப்ஷனல்)",
    "service.save": "வேலை சேமிக்க",
    "service.list": "சேமித்த வேலைகள்",

    "today.title": "இன்றைய வேலைகள்",
    "reminders.title": "அடுத்த சர்வீஸ் ரிமைண்டர்கள்",
  },
};

let currentLang = localStorage.getItem("crm_lang") || "en";
let currentScreen = "home";

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const txt = translations[currentLang]?.[key];
    if (txt) el.textContent = txt;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const txt = translations[currentLang]?.[key];
    if (txt) el.placeholder = txt;
  });

  const screenNameEl = document.getElementById("screenName");
  if (screenNameEl) {
    const key = "screen." + currentScreen;
    screenNameEl.textContent = translations[currentLang]?.[key] || "";
  }

  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.textContent = currentLang === "en" ? "EN" : "தமிழ்";
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("crm_lang", lang);
  applyTranslations();
}

// --------------------------------------
// 1. LOAD & SAVE DATA
// --------------------------------------
function loadData() {
  const saved = localStorage.getItem("workshop_data");
  if (!saved) return { customers: [], vehicles: [], services: [] };
  try {
    const parsed = JSON.parse(saved);
    return {
      customers: parsed.customers || [],
      vehicles: parsed.vehicles || [],
      services: parsed.services || [],
    };
  } catch {
    return { customers: [], vehicles: [], services: [] };
  }
}

let data = loadData();

function saveData() {
  localStorage.setItem("workshop_data", JSON.stringify(data));
}

// --------------------------------------
// 2. DOM ELEMENTS
// --------------------------------------
const customersScreen = document.getElementById("customersScreen");
const vehiclesScreen = document.getElementById("vehiclesScreen");
const serviceScreen = document.getElementById("serviceScreen");
const todayScreen = document.getElementById("todayScreen");
const remindersScreen = document.getElementById("remindersScreen");

// Customers
const customerForm = document.getElementById("customerForm");
const custNameInput = document.getElementById("custName");
const custPhoneInput = document.getElementById("custPhone");
const custWhatsappInput = document.getElementById("custWhatsapp");
const custNotesInput = document.getElementById("custNotes");
const customerSearchInput = document.getElementById("customerSearch");
const customerListEl = document.getElementById("customerList");

// Vehicles
const vehicleForm = document.getElementById("vehicleForm");
const vehicleCustomerSelect = document.getElementById("vehicleCustomer");
const vehicleTypeSelect = document.getElementById("vehicleType");
const vehicleModelInput = document.getElementById("vehicleModel");
const vehicleNumberInput = document.getElementById("vehicleNumber");
const vehicleNotesInput = document.getElementById("vehicleNotes");
const vehicleSearchInput = document.getElementById("vehicleSearch");
const vehicleListEl = document.getElementById("vehicleList");

// Services
const serviceForm = document.getElementById("serviceForm");
const serviceVehicleSelect = document.getElementById("serviceVehicle");
const serviceDateInput = document.getElementById("serviceDate");
const serviceDescInput = document.getElementById("serviceDescription");
const serviceAmountInput = document.getElementById("serviceAmount");
const nextServiceDateInput = document.getElementById("nextServiceDate");
const serviceNotesInput = document.getElementById("serviceNotes");
const serviceListEl = document.getElementById("serviceList");

// Today / reminders
const todayListEl = document.getElementById("todayList");
const remindersListEl = document.getElementById("remindersList");

// Language button
const langToggleBtn = document.getElementById("langToggle");
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    const next = currentLang === "en" ? "ta" : "en";
    setLanguage(next);
  });
}

// --------------------------------------
// 3. NAVIGATION
// --------------------------------------
function hideAllScreens() {
  customersScreen.style.display = "none";
  vehiclesScreen.style.display = "none";
  serviceScreen.style.display = "none";
  todayScreen.style.display = "none";
  remindersScreen.style.display = "none";
}

function goTo(screen) {
  hideAllScreens();
  currentScreen = screen;

  if (screen === "customers") {
    customersScreen.style.display = "block";
    renderCustomerList();
  } else if (screen === "vehicles") {
    vehiclesScreen.style.display = "block";
    renderVehicleCustomerOptions();
    renderVehicleList();
  } else if (screen === "addService") {
    serviceScreen.style.display = "block";
    renderServiceVehicleOptions();
    setTodayDates();
    renderServiceList();
  } else if (screen === "today") {
    todayScreen.style.display = "block";
    renderTodayList();
  } else if (screen === "reminders") {
    remindersScreen.style.display = "block";
    renderRemindersList();
  } else {
    currentScreen = "home";
  }

  applyTranslations();
}

// --------------------------------------
// 4. CUSTOMERS
// --------------------------------------
customerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = custNameInput.value.trim();
  const phone = custPhoneInput.value.trim();
  const hasWhatsapp = custWhatsappInput.checked;
  const notes = custNotesInput.value.trim();

  if (!name || !phone) {
    alert("Name & phone required");
    return;
  }

  const customer = {
    id: "c" + Date.now(),
    name,
    phone,
    hasWhatsapp,
    notes,
  };

  data.customers.push(customer);
  saveData();

  custNameInput.value = "";
  custPhoneInput.value = "";
  custWhatsappInput.checked = true;
  custNotesInput.value = "";

  renderCustomerList();
  renderVehicleCustomerOptions();
});

customerSearchInput.addEventListener("input", renderCustomerList);

function renderCustomerList() {
  customerListEl.innerHTML = "";

  const search = customerSearchInput.value.trim().toLowerCase();

  const list = data.customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(search) ||
      c.phone.includes(search) ||
      (c.notes || "").toLowerCase().includes(search)
    );
  });

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No customers found.";
    li.style.justifyContent = "center";
    customerListEl.appendChild(li);
    return;
  }

  list.forEach((c) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${c.name}</div>
        <div class="item-sub">📞 ${c.phone} ${c.hasWhatsapp ? "• WhatsApp ✔︎" : ""}</div>
        ${c.notes ? `<div class="item-sub">📝 ${c.notes}</div>` : ""}
      </div>
      <div class="item-actions">
        <button class="btn-small btn-edit" onclick="editCustomer('${c.id}')">Edit</button>
        <button class="btn-small btn-delete" onclick="deleteCustomer('${c.id}')">Delete</button>
      </div>
    `;
    customerListEl.appendChild(li);
  });
}

function editCustomer(id) {
  const c = data.customers.find((x) => x.id === id);
  if (!c) return;

  const newName = prompt("Edit name:", c.name);
  if (newName === null) return;

  const newPhone = prompt("Edit phone:", c.phone);
  if (newPhone === null) return;

  const newNotes = prompt("Edit notes:", c.notes || "");
  if (newNotes === null) return;

  c.name = newName.trim();
  c.phone = newPhone.trim();
  c.notes = newNotes.trim();
  saveData();

  renderCustomerList();
  renderVehicleList();
  renderServiceList();
}

function deleteCustomer(id) {
  if (!confirm("Delete this customer and linked data?")) return;

  const vehicleIds = data.vehicles.filter(v => v.customerId === id).map(v => v.id);
  data.services = data.services.filter(s => !vehicleIds.includes(s.vehicleId));
  data.vehicles = data.vehicles.filter(v => v.customerId !== id);
  data.customers = data.customers.filter(c => c.id !== id);

  saveData();
  renderCustomerList();
  renderVehicleList();
  renderServiceList();
  renderRemindersList();
}

// --------------------------------------
// 5. VEHICLES
// --------------------------------------
function renderVehicleCustomerOptions() {
  vehicleCustomerSelect.innerHTML = "";

  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = translations[currentLang]["vehicles.customer"];
  vehicleCustomerSelect.appendChild(opt);

  data.customers.forEach((c) => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = `${c.name} (${c.phone})`;
    vehicleCustomerSelect.appendChild(o);
  });
}

vehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerId = vehicleCustomerSelect.value;
  const type = vehicleTypeSelect.value;
  const model = vehicleModelInput.value.trim();
  const numberPlate = vehicleNumberInput.value.trim();
  const notes = vehicleNotesInput.value.trim();

  if (!customerId || !model || !numberPlate) {
    alert("Fill all fields");
    return;
  }

  const vehicle = {
    id: "v" + Date.now(),
    customerId,
    type,
    model,
    numberPlate,
    notes,
  };

  data.vehicles.push(vehicle);
  saveData();

  vehicleCustomerSelect.value = "";
  vehicleTypeSelect.value = "bike";
  vehicleModelInput.value = "";
  vehicleNumberInput.value = "";
  vehicleNotesInput.value = "";

  renderVehicleList();
  renderServiceVehicleOptions();
});

vehicleSearchInput.addEventListener("input", renderVehicleList);

function renderVehicleList() {
  vehicleListEl.innerHTML = "";

  const search = vehicleSearchInput.value.trim().toLowerCase();

  const list = data.vehicles.filter((v) => {
    const cust = data.customers.find((c) => c.id === v.customerId);
    const name = cust ? cust.name.toLowerCase() : "";
    const notes = (v.notes || "").toLowerCase();
    return (
      v.model.toLowerCase().includes(search) ||
      v.numberPlate.toLowerCase().includes(search) ||
      name.includes(search) ||
      notes.includes(search)
    );
  });

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No vehicles found.";
    li.style.justifyContent = "center";
    vehicleListEl.appendChild(li);
    return;
  }

  list.forEach((v) => {
    const cust = data.customers.find((c) => c.id === v.customerId);
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${v.model} (${v.numberPlate})</div>
        <div class="item-sub">👤 ${cust ? cust.name : "Unknown"} • ${v.type.toUpperCase()}</div>
        ${v.notes ? `<div class="item-sub">📝 ${v.notes}</div>` : ""}
      </div>
      <div class="item-actions">
        <button class="btn-small btn-edit" onclick="editVehicle('${v.id}')">Edit</button>
        <button class="btn-small btn-delete" onclick="deleteVehicle('${v.id}')">Delete</button>
      </div>
    `;
    vehicleListEl.appendChild(li);
  });
}

function editVehicle(id) {
  const v = data.vehicles.find((x) => x.id === id);
  if (!v) return;

  const newModel = prompt("Edit model:", v.model);
  if (newModel === null) return;

  const newPlate = prompt("Edit number plate:", v.numberPlate);
  if (newPlate === null) return;

  const newNotes = prompt("Edit notes:", v.notes || "");
  if (newNotes === null) return;

  v.model = newModel.trim();
  v.numberPlate = newPlate.trim();
  v.notes = newNotes.trim();
  saveData();

  renderVehicleList();
  renderServiceList();
  renderServiceVehicleOptions();
}

function deleteVehicle(id) {
  if (!confirm("Delete this vehicle and its services?")) return;

  data.services = data.services.filter((s) => s.vehicleId !== id);
  data.vehicles = data.vehicles.filter((v) => v.id !== id);

  saveData();
  renderVehicleList();
  renderServiceList();
  renderRemindersList();
}

// --------------------------------------
// 6. SERVICES / JOBS
// --------------------------------------
function renderServiceVehicleOptions() {
  serviceVehicleSelect.innerHTML = "";

  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "Select vehicle";
  serviceVehicleSelect.appendChild(opt);

  data.vehicles.forEach((v) => {
    const cust = data.customers.find((c) => c.id === v.customerId);
    const o = document.createElement("option");
    o.value = v.id;
    o.textContent = `${v.model} (${v.numberPlate}) - ${cust ? cust.name : "Unknown"}`;
    serviceVehicleSelect.appendChild(o);
  });
}

function setTodayDates() {
  const todayStr = new Date().toISOString().split("T")[0];
  serviceDateInput.value = todayStr;

  const next = new Date();
  next.setDate(next.getDate() + 90);
  nextServiceDateInput.value = next.toISOString().split("T")[0];
}

serviceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const vehicleId = serviceVehicleSelect.value;
  const date = serviceDateInput.value;
  const description = serviceDescInput.value.trim();
  const amount = Number(serviceAmountInput.value);
  const nextDate = nextServiceDateInput.value;
  const notes = serviceNotesInput.value.trim();

  if (!vehicleId || !date || !description || !amount || !nextDate) {
    alert("Fill all fields");
    return;
  }

  const service = {
    id: "s" + Date.now(),
    vehicleId,
    date,
    description,
    amount,
    nextServiceDate: nextDate,
    notes,
  };

  data.services.push(service);
  saveData();

  serviceDescInput.value = "";
  serviceAmountInput.value = "";
  serviceNotesInput.value = "";
  setTodayDates();

  renderServiceList();
  renderTodayList();
  renderRemindersList();
});

function renderServiceList() {
  serviceListEl.innerHTML = "";

  if (data.services.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No services yet.";
    li.style.justifyContent = "center";
    serviceListEl.appendChild(li);
    return;
  }

  data.services.forEach((s) => {
    const v = data.vehicles.find((x) => x.id === s.vehicleId);
    if (!v) return;
    const c = data.customers.find((x) => x.id === v.customerId);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${v.model} (${v.numberPlate})</div>
        <div class="item-sub">📆 ${s.date} • 👤 ${c ? c.name : "Unknown"}</div>
        <div class="item-sub">🛠️ ${s.description} — ₹${s.amount}</div>
        ${s.notes ? `<div class="item-sub">📝 ${s.notes}</div>` : ""}
      </div>
      <div class="item-actions">
        <button class="btn-small btn-edit" onclick="editService('${s.id}')">Edit</button>
        <button class="btn-small btn-delete" onclick="deleteService('${s.id}')">Delete</button>
      </div>
    `;
    serviceListEl.appendChild(li);
  });
}

function editService(id) {
  const s = data.services.find((x) => x.id === id);
  if (!s) return;

  const newDesc = prompt("Edit work:", s.description);
  if (newDesc === null) return;

  const newAmt = prompt("Edit amount:", s.amount);
  if (newAmt === null) return;

  const newNotes = prompt("Edit notes:", s.notes || "");
  if (newNotes === null) return;

  s.description = newDesc.trim();
  s.amount = Number(newAmt);
  s.notes = newNotes.trim();
  saveData();

  renderServiceList();
  renderTodayList();
  renderRemindersList();
}

function deleteService(id) {
  if (!confirm("Delete this service?")) return;

  data.services = data.services.filter((s) => s.id !== id);
  saveData();

  renderServiceList();
  renderTodayList();
  renderRemindersList();
}

// --------------------------------------
// 7. TODAY'S JOBS
// --------------------------------------
function renderTodayList() {
  todayListEl.innerHTML = "";

  const todayStr = new Date().toISOString().split("T")[0];
  const list = data.services.filter((s) => s.date === todayStr);

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No jobs today.";
    li.style.justifyContent = "center";
    todayListEl.appendChild(li);
    return;
  }

  list.forEach((s) => {
    const v = data.vehicles.find((x) => x.id === s.vehicleId);
    const c = v ? data.customers.find((x) => x.id === v.customerId) : null;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${v ? `${v.model} (${v.numberPlate})` : "Unknown vehicle"}</div>
        <div class="item-sub">👤 ${c ? c.name : "Unknown customer"}</div>
        <div class="item-sub">🛠️ ${s.description} — ₹${s.amount}</div>
        ${s.notes ? `<div class="item-sub">📝 ${s.notes}</div>` : ""}
      </div>
    `;
    todayListEl.appendChild(li);
  });
}

// --------------------------------------
// 8. REMINDERS + WHATSAPP
// --------------------------------------
function renderRemindersList() {
  remindersListEl.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next7 = new Date(today);
  next7.setDate(next7.getDate() + 7);

  const list = data.services.filter((s) => {
    if (!s.nextServiceDate) return false;
    const d = new Date(s.nextServiceDate);
    d.setHours(0, 0, 0, 0);
    return d >= today && d <= next7;
  });

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No upcoming reminders.";
    li.style.justifyContent = "center";
    remindersListEl.appendChild(li);
    return;
  }

  list.forEach((s) => {
    const v = data.vehicles.find((x) => x.id === s.vehicleId);
    const c = v ? data.customers.find((x) => x.id === v.customerId) : null;
    if (!v || !c) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${v.model} (${v.numberPlate})</div>
        <div class="item-sub">📅 Due: ${s.nextServiceDate}</div>
        <div class="item-sub">👤 ${c.name}</div>
      </div>
      <div class="item-actions">
        <button class="btn-small btn-whatsapp">WhatsApp</button>
      </div>
    `;

    const btn = li.querySelector(".btn-whatsapp");
    btn.onclick = () => openWhatsApp(c, v, s);

    remindersListEl.appendChild(li);
  });
}

function openWhatsApp(customer, vehicle, service) {
  const phone = customer.phone.replace(/\D/g, "");
  if (!phone) {
    alert("No valid phone number");
    return;
  }

  const msg = `Hi ${customer.name}, reminder from your workshop: your ${vehicle.model} (${vehicle.numberPlate}) is due for service on ${service.nextServiceDate}. Please reply to book your slot.`;
  const url = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// --------------------------------------
// 9. INITIAL RENDER
// --------------------------------------
applyTranslations();
renderCustomerList();
renderVehicleCustomerOptions();
renderVehicleList();
renderServiceVehicleOptions();
renderServiceList();
renderTodayList();
renderRemindersList();
