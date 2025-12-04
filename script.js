// --------------------------------------
// 0. LANGUAGE SYSTEM (EN <-> TA)
// --------------------------------------
const translations = {
  en: {
    "app.title": "Workshop CRM",

    // Home buttons
    "home.addJob": "➕ Add Job / Service",
    "home.customers": "👤 Customers",
    "home.vehicles": "🚗 Vehicles",
    "home.today": "📅 Today's Jobs",
    "home.reminders": "🔔 Service Reminders",

    // Screens
    "screen.home": "Home",
    "screen.customers": "Customers",
    "screen.vehicles": "Vehicles",
    "screen.addService": "Add Service",
    "screen.today": "Today's Jobs",
    "screen.reminders": "Reminders",

    // Customers
    "customers.title": "Customers",
    "customers.name": "Customer Name",
    "customers.phone": "Phone Number",
    "customers.whatsapp": "Has WhatsApp",
    "customers.notes": "Notes (optional)",
    "customers.save": "Save Customer",
    "customers.list": "Saved Customers",
    "customers.search": "Search customers...",

    // Vehicles
    "vehicles.title": "Vehicles",
    "vehicles.customer": "Select Customer",
    "vehicles.type": "Vehicle Type",
    "vehicles.model": "Model (e.g. Pulsar 150)",
    "vehicles.number": "Number Plate (e.g. TN-10-AB-1234)",
    "vehicles.notes": "Vehicle Notes (optional)",
    "vehicles.save": "Save Vehicle",
    "vehicles.list": "Saved Vehicles",
    "vehicles.search": "Search vehicles...",

    // Service
    "service.title": "Add Job / Service",
    "service.work": "Work done (e.g. Oil Change)",
    "service.amount": "Amount",
    "service.notes": "Service Notes (optional)",
    "service.save": "Save Service",
    "service.list": "Saved Services",

    // Today
    "today.title": "Today's Jobs",

    // Reminders
    "reminders.title": "Next Service Reminders",
  },

  ta: {
    "app.title": "வர்க்ஷாப் CRM",

    // Home buttons
    "home.addJob": "➕ புதிய வேலை / சர்வீஸ்",
    "home.customers": "👤 கஸ்டமர்கள்",
    "home.vehicles": "🚗 வாகனங்கள்",
    "home.today": "📅 இன்றைய வேலைகள்",
    "home.reminders": "🔔 ரிமைண்டர்கள்",

    // Screens
    "screen.home": "முகப்பு",
    "screen.customers": "கஸ்டமர்கள்",
    "screen.vehicles": "வாகனங்கள்",
    "screen.addService": "வேலை சேர்",
    "screen.today": "இன்றைய வேலைகள்",
    "screen.reminders": "ரிமைண்டர்கள்",

    // Customers
    "customers.title": "கஸ்டமர்கள்",
    "customers.name": "பெயர்",
    "customers.phone": "போன் நம்பர்",
    "customers.whatsapp": "வாட்ஸ்அப் இருக்கா",
    "customers.notes": "குறிப்புகள் (ஆப்ஷனல்)",
    "customers.save": "கஸ்டமர் சேமிக்க",
    "customers.list": "சேமித்த கஸ்டமர்கள்",
    "customers.search": "கஸ்டமரை தேடு...",

    // Vehicles
    "vehicles.title": "வாகனங்கள்",
    "vehicles.customer": "கஸ்டமர்",
    "vehicles.type": "வகை",
    "vehicles.model": "மாடல்",
    "vehicles.number": "நம்பர் பிளேட்",
    "vehicles.notes": "குறிப்பு (ஆப்ஷனல்)",
    "vehicles.save": "வாகனம் சேமிக்க",
    "vehicles.list": "சேமித்த வாகனங்கள்",
    "vehicles.search": "வாகனத்தை தேடு...",

    // Service
    "service.title": "சர்வீஸ் / வேலை",
    "service.work": "செய்த வேலை",
    "service.amount": "அமவுண்ட்",
    "service.notes": "குறிப்பு (ஆப்ஷனல்)",
    "service.save": "வேலை சேமிக்க",
    "service.list": "சேமித்த வேலைகள்",

    // Today
    "today.title": "இன்றைய வேலைகள்",

    // Reminders
    "reminders.title": "அடுத்த சர்வீஸ் நினைவூட்டல்கள்",
  },
};

let currentLang = localStorage.getItem("crm_lang") || "en";
let currentScreen = "home";

// Apply translations
function applyTranslations() {
  // Static text elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const txt = translations[currentLang]?.[key];
    if (txt) el.textContent = txt;
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const txt = translations[currentLang]?.[key];
    if (txt) el.placeholder = txt;
  });

  // Screen name
  const screenNameEl = document.getElementById("screenName");
  if (screenNameEl) {
    const key = "screen." + currentScreen;
    screenNameEl.textContent = translations[currentLang]?.[key] || "";
  }

  // Language button
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
    return JSON.parse(saved);
  } catch (e) {
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

// Screens
const customersScreen = document.getElementById("customersScreen");
const vehiclesScreen = document.getElementById("vehiclesScreen");
const serviceScreen = document.getElementById("serviceScreen");
const todayScreen = document.getElementById("todayScreen");
const remindersScreen = document.getElementById("remindersScreen");
const screenNameEl = document.getElementById("screenName");

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

// Today & Reminders
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

// Create Customer
customerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = custNameInput.value.trim();
  const phone = custPhoneInput.value.trim();
  const hasWhatsapp = custWhatsappInput.checked;
  const notes = custNotesInput.value.trim();

  if (!name || !phone) {
    alert("Name & Phone are required.");
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

  // Reset
  custNameInput.value = "";
  custPhoneInput.value = "";
  custWhatsappInput.checked = true;
  custNotesInput.value = "";

  renderCustomerList();
});

// Customer List
function renderCustomerList() {
  customerListEl.innerHTML = "";

  let search = customerSearchInput.value.trim().toLowerCase();

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
    li.style.boxShadow = "none";
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


// Search update
customerSearchInput.addEventListener("input", renderCustomerList);

// Edit Customer
function editCustomer(id) {
  const c = data.customers.find((x) => x.id === id);
  if (!c) return;

  const newName = prompt("Edit Name:", c.name);
  if (newName === null) return;

  const newPhone = prompt("Edit Phone:", c.phone);
  if (newPhone === null) return;

  const newNotes = prompt("Edit Notes:", c.notes || "");
  if (newNotes === null) return;

  c.name = newName.trim();
  c.phone = newPhone.trim();
  c.notes = newNotes.trim();

  saveData();
  renderCustomerList();
}

// Delete Customer
function deleteCustomer(id) {
  if (!confirm("Delete this customer?")) return;

  // Remove linked vehicles & services
  data.vehicles = data.vehicles.filter((v) => v.customerId !== id);
  data.services = data.services.filter((s) => {
    const v = data.vehicles.find((x) => x.id === s.vehicleId);
    return v !== undefined;
  });

  data.customers = data.customers.filter((c) => c.id !== id);
  saveData();

  renderCustomerList();
  renderVehicleList();
  renderServiceList();
}
// --------------------------------------
// 5. VEHICLES
// --------------------------------------

// Populate customer dropdown
function renderVehicleCustomerOptions() {
  vehicleCustomerSelect.innerHTML = "";

  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = translations[currentLang]["vehicles.customer"];
  vehicleCustomerSelect.appendChild(opt);

  data.customers.forEach((c) => {
    const op = document.createElement("option");
    op.value = c.id;
    op.textContent = `${c.name} (${c.phone})`;
    vehicleCustomerSelect.appendChild(op);
  });
}

// Add Vehicle
vehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerId = vehicleCustomerSelect.value;
  const type = vehicleTypeSelect.value;
  const model = vehicleModelInput.value.trim();
  const numberPlate = vehicleNumberInput.value.trim();
  const notes = vehicleNotesInput.value.trim();

  if (!customerId || !model || !numberPlate) {
    alert("All fields are required.");
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

// Render Vehicle List
function renderVehicleList() {
  vehicleListEl.innerHTML = "";

  let search = vehicleSearchInput.value.trim().toLowerCase();

  const list = data.vehicles.filter((v) => {
    const customer = data.customers.find((c) => c.id === v.customerId);
    const name = customer ? customer.name.toLowerCase() : "";
    const notes = v.notes ? v.notes.toLowerCase() : "";

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
    li.style.boxShadow = "none";
    vehicleListEl.appendChild(li);
    return;
  }

  list.forEach((v) => {
    const customer = data.customers.find((c) => c.id === v.customerId);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${v.model} (${v.numberPlate})</div>
        <div class="item-sub">👤 ${customer ? customer.name : "Unknown"} • 🚘 ${v.type.toUpperCase()}</div>
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


// Search vehicle
vehicleSearchInput.addEventListener("input", renderVehicleList);

// Edit Vehicle
function editVehicle(id) {
  const v = data.vehicles.find((x) => x.id === id);
  if (!v) return;

  const newModel = prompt("Edit model:", v.model);
  if (newModel === null) return;

  const newNumber = prompt("Edit number plate:", v.numberPlate);
  if (newNumber === null) return;

  const newNotes = prompt("Edit notes:", v.notes || "");
  if (newNotes === null) return;

  v.model = newModel.trim();
  v.numberPlate = newNumber.trim();
  v.notes = newNotes.trim();

  saveData();
  renderVehicleList();
  renderServiceVehicleOptions();
}

// Delete Vehicle
function deleteVehicle(id) {
  if (!confirm("Delete this vehicle?")) return;

  // Remove services linked with the vehicle
  data.services = data.services.filter((s) => s.vehicleId !== id);

  data.vehicles = data.vehicles.filter((v) => v.id !== id);
  saveData();

  renderVehicleList();
  renderServiceList();
  renderRemindersList();
}

// Populate dropdown in service screen
function renderServiceVehicleOptions() {
  serviceVehicleSelect.innerHTML = "";

  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = "Select Vehicle";
  serviceVehicleSelect.appendChild(opt);

  data.vehicles.forEach((v) => {
    const customer = data.customers.find((c) => c.id === v.customerId);

    const o = document.createElement("option");
    o.value = v.id;
    o.textContent = `${v.model} (${v.numberPlate}) - ${customer ? customer.name : "Unknown"}`;

    serviceVehicleSelect.appendChild(o);
  });
}

// Auto-fill today's dates
function setTodayDates() {
  const today = new Date().toISOString().split("T")[0];
  serviceDateInput.value = today;

  const next = new Date();
  next.setDate(next.getDate() + 90);
  nextServiceDateInput.value = next.toISOString().split("T")[0];
}
// --------------------------------------
// 6. SERVICES (JOBS)
// --------------------------------------

// Add Service / Job
serviceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const vehicleId = serviceVehicleSelect.value;
  const date = serviceDateInput.value;
  const description = serviceDescInput.value.trim();
  const amount = Number(serviceAmountInput.value);
  const nextDate = nextServiceDateInput.value;
  const notes = serviceNotesInput.value.trim();

  if (!vehicleId || !description || !amount) {
    alert("All fields are required.");
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

  // Reset
  serviceDescInput.value = "";
  serviceAmountInput.value = "";
  serviceNotesInput.value = "";

  renderServiceList();
});

// Render Service List
function renderServiceList() {
  serviceListEl.innerHTML = "";

  if (data.services.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No services yet.";
    li.style.justifyContent = "center";
    li.style.boxShadow = "none";
    serviceListEl.appendChild(li);
    return;
  }

  data.services.forEach((s) => {
    const vehicle = data.vehicles.find((v) => v.id === s.vehicleId);
    if (!vehicle) return;
    const customer = data.customers.find((c) => c.id === vehicle.customerId);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${vehicle.model} (${vehicle.numberPlate})</div>
        <div class="item-sub">📆 ${s.date} • 👤 ${customer ? customer.name : "Unknown"}</div>
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


// Edit Service
function editService(id) {
  const s = data.services.find((x) => x.id === id);
  if (!s) return;

  const newDesc = prompt("Edit Work Done:", s.description);
  if (newDesc === null) return;

  const newAmount = prompt("Edit Amount:", s.amount);
  if (newAmount === null) return;

  const newNotes = prompt("Edit Notes:", s.notes || "");
  if (newNotes === null) return;

  s.description = newDesc.trim();
  s.amount = Number(newAmount);
  s.notes = newNotes.trim();

  saveData();
  renderServiceList();
  renderTodayList();
  renderRemindersList();
}

// Delete Service
function deleteService(id) {
  if (!confirm("Delete this job?")) return;

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

  const today = new Date().toISOString().split("T")[0];
  const list = data.services.filter((s) => s.date === today);

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No jobs today.";
    li.style.justifyContent = "center";
    li.style.boxShadow = "none";
    todayListEl.appendChild(li);
    return;
  }

  list.forEach((s) => {
    const vehicle = data.vehicles.find((v) => v.id === s.vehicleId);
    const customer = data.customers.find((c) => c.id === vehicle.customerId);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${vehicle.model} (${vehicle.numberPlate})</div>
        <div class="item-sub">👤 ${customer.name}</div>
        <div class="item-sub">🛠️ ${s.description} — ₹${s.amount}</div>
        ${s.notes ? `<div class="item-sub">📝 ${s.notes}</div>` : ""}
      </div>
    `;
    todayListEl.appendChild(li);
  });
}


// --------------------------------------
// 8. REMINDERS
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
    li.style.boxShadow = "none";
    remindersListEl.appendChild(li);
    return;
  }

  list.forEach((s) => {
    const vehicle = data.vehicles.find((v) => v.id === s.vehicleId);
    const customer = data.customers.find((c) => c.id === vehicle.customerId);

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item-main">
        <div class="item-header">${vehicle.model} (${vehicle.numberPlate})</div>
        <div class="item-sub">📅 Due: ${s.nextServiceDate}</div>
        <div class="item-sub">👤 ${customer.name}</div>
      </div>
      <div class="item-actions">
        <button class="btn-small btn-whatsapp">WhatsApp</button>
      </div>
    `;

    const btn = li.querySelector(".btn-whatsapp");
    btn.onclick = () => openWhatsApp(customer, vehicle, s);

    remindersListEl.appendChild(li);
  });
}


// WhatsApp message
function openWhatsApp(customer, vehicle, service) {
  const phone = customer.phone.replace(/\D/g, "");

  const msg = `Hi ${customer.name}, reminder from your workshop: 
Your ${vehicle.model} (${vehicle.numberPlate}) is due for service on ${service.nextServiceDate}. 
Reply to book your service.`;

  const url =
    "https://wa.me/91" + phone + "?text=" + encodeURIComponent(msg);

  window.open(url, "_blank");
}

// --------------------------------------
// 9. INITIAL CALLS
// --------------------------------------
applyTranslations();
renderCustomerList();
renderVehicleCustomerOptions();
renderVehicleList();
renderServiceVehicleOptions();
renderServiceList();
renderTodayList();
renderRemindersList();
