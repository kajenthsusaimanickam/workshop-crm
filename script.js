// ================== STATE & STORAGE ==================
const STORAGE_KEY = "krns_workshop_crm_v2";

let data = {
  customers: [],
  vehicles: [],
  services: []
};

let currentLang = "en";               // "en" or "ta"
let currentDetailCustomerId = null;   // which customer is open
let editingJobId = null;              // which job we’re editing
let allServiceVehicles = [];          // master list for Add Service search

// ================== TRANSLATIONS ==================
const TEXT = {
  en: {
    appTitle: "KRNS Workshop CRM",

    btnAddJob: "Add Job / Service",
    btnCustomers: "Customers",
    btnToday: "Today",
    btnReminders: "Reminders",

    customersTitle: "Customers",
    customersListTitle: "Saved customers",
    custSave: "Save customer",
    custName: "Customer name",
    custPhone: "Phone number",
    custNotes: "Notes (optional)",
    custSearch: "Search by name or phone",
    custWhatsapp: "Has WhatsApp",

    vehiclesTitle: "Vehicles",
    vehiclesListTitle: "Saved vehicles",
    vehiclesCustomer: "Customer",
    vehiclesType: "Vehicle type",
    vehiclesSave: "Save vehicle",
    vehModel: "Vehicle model",
    vehNumber: "Vehicle number",
    vehNotes: "Vehicle notes",

    serviceTitle: "Add Service / Job",
    serviceListTitle: "Job history",
    serviceSave: "Save job",
    serviceWork: "Work done",
    serviceAmount: "Amount (₹)",
    serviceNotes: "Notes",
    serviceVehicleSearch: "Search vehicle no. / customer",

    todayTitle: "Today’s Jobs",
    remindersTitle: "Reminders",

    searchPlaceholder: "Search by vehicle no. or customer name",
    searchDateLabel: "Filter by job date (optional)",

    historyTitle: "Customer History",
    historyBack: "Back",
    detailBack: "Back to customers",
    detailAddVehicle: "Add vehicle",
    detailAddJob: "Add job",
    detailViewHistory: "View history",

    noCustomers: "No customers",
    noVehicles: "No vehicles",
    noJobs: "No jobs",
    noJobsToday: "No jobs today",
    noReminders: "No reminders",
    noHistory: "No service history",
    noServicesYet: "No services yet",
    noMatches: "No matching records",

    statusOverdue: "Overdue",
    statusToday: "Today",
    statusUpcoming: "Upcoming"
  },
  ta: {
    appTitle: "காரேஜ் CRM",

    btnAddJob: "பணி / சர்வீஸ் சேர்க்க",
    btnCustomers: "வாடிக்கையாளர்கள்",
    btnToday: "இன்றைய பணி",
    btnReminders: "ரிமைண்டர்கள்",

    customersTitle: "வாடிக்கையாளர்கள்",
    customersListTitle: "சேமித்த வாடிக்கையாளர்கள்",
    custSave: "சேமிக்க",
    custName: "பெயர்",
    custPhone: "போன் எண்",
    custNotes: "குறிப்புகள் (விருப்பம்)",
    custSearch: "பெயர் / எண்ணால் தேட",
    custWhatsapp: "வாட்ஸ்அப் உள்ளது",

    vehiclesTitle: "வாகனங்கள்",
    vehiclesListTitle: "சேமித்த வாகனங்கள்",
    vehiclesCustomer: "வாடிக்கையாளர்",
    vehiclesType: "வாகன வகை",
    vehiclesSave: "வாகனம் சேமிக்க",
    vehModel: "வாகன மாடல்",
    vehNumber: "வாகன எண்",
    vehNotes: "வாகன குறிப்புகள்",

    serviceTitle: "சர்வீஸ் / பணி சேர்க்க",
    serviceListTitle: "பணி வரலாறு",
    serviceSave: "சேமிக்க",
    serviceWork: "செய்த பணி",
    serviceAmount: "தொகை (₹)",
    serviceNotes: "குறிப்புகள்",
    serviceVehicleSearch: "வாகன எண் / வாடிக்கையாளர் தேட",

    todayTitle: "இன்றைய பணிகள்",
    remindersTitle: "ரிமைண்டர்கள்",

    searchPlaceholder: "வாகன எண் / வாடிக்கையாளர் பெயர்",
    searchDateLabel: "பணி தேதி (விருப்பம்)",

    historyTitle: "வாடிக்கையாளர் வரலாறு",
    historyBack: "மீண்டும்",
    detailBack: "வாடிக்கையாளர்களுக்கு திரும்ப",
    detailAddVehicle: "வாகனம் சேர்க்க",
    detailAddJob: "பணி சேர்க்க",
    detailViewHistory: "வரலாறு பார்க்க",

    noCustomers: "வாடிக்கையாளர்கள் இல்லை",
    noVehicles: "வாகனங்கள் இல்லை",
    noJobs: "பணிகள் இல்லை",
    noJobsToday: "இன்று பணிகள் இல்லை",
    noReminders: "ரிமைண்டர்கள் இல்லை",
    noHistory: "சர்வீஸ் வரலாறு இல்லை",
    noServicesYet: "சர்வீஸ் இல்லை",
    noMatches: "பொருந்தும் பதிவு இல்லை",

    statusOverdue: "தாமதம்",
    statusToday: "இன்று",
    statusUpcoming: "வரவுள்ளது"
  }
};

// ================== UTIL ==================
function t(key) {
  return TEXT[currentLang][key] || key;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    // ignore broken data
  }
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function indexById(arr) {
  const m = {};
  arr.forEach((x) => (m[x.id] = x));
  return m;
}

// ================== LANGUAGE ==================
function applyLanguage() {
  // app + home
  document.getElementById("appTitle").textContent = t("appTitle");
  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "TA" : "EN";

// Home buttons with emojis
document.getElementById("btnHomeAddJob").textContent = "🧰 " + t("btnAddJob");
document.getElementById("btnHomeCustomers").textContent = "👤 " + t("btnCustomers");
document.getElementById("btnHomeToday").textContent = "📅 " + t("btnToday");
document.getElementById("btnHomeReminders").textContent = "🔔 " + t("btnReminders");

  // section titles with emojis
  document.getElementById("customersTitle").textContent =
    "👤 " + t("customersTitle");
  document.getElementById("customersListTitle").textContent =
    t("customersListTitle");

  document.getElementById("vehiclesTitle").textContent =
    "🚗 " + t("vehiclesTitle");
  document.getElementById("vehiclesListTitle").textContent =
    t("vehiclesListTitle");

  document.getElementById("serviceTitle").textContent =
    "🧰 " + t("serviceTitle");
  document.getElementById("serviceListTitle").textContent =
    t("serviceListTitle");

  document.getElementById("todayTitle").textContent =
    "📅 " + t("todayTitle");
  document.getElementById("remindersTitle").textContent =
    "🔔 " + t("remindersTitle");

  document.getElementById("historyTitle").textContent =
    "📜 " + t("historyTitle");
  document.getElementById("historyBackBtn").textContent = t("historyBack");
  document.getElementById("detailBackBtn").textContent = t("detailBack");
  document.getElementById("detailAddVehicleBtn").textContent =
    t("detailAddVehicle");
  document.getElementById("detailAddJobBtn").textContent = t("detailAddJob");
  document.getElementById("detailHistoryBtn").textContent =
    t("detailViewHistory");

  // search bar
  document.getElementById("globalSearchInput").placeholder =
    t("searchPlaceholder");
  document.getElementById("globalSearchDateLabel").textContent =
    t("searchDateLabel");

  // customer placeholders
  document.getElementById("custName").placeholder = t("custName");
  document.getElementById("custPhone").placeholder = t("custPhone");
  document.getElementById("custNotes").placeholder = t("custNotes");
  document.getElementById("customerSearch").placeholder = t("custSearch");
  document.getElementById("custWhatsappLabel").textContent = t("custWhatsapp");

  // vehicle placeholders
  document.getElementById("vehiclesCustomerLabel").textContent =
    t("vehiclesCustomer");
  document.getElementById("vehiclesTypeLabel").textContent =
    t("vehiclesType");
  document.getElementById("vehicleModel").placeholder = t("vehModel");
  document.getElementById("vehicleNumber").placeholder = t("vehNumber");
  document.getElementById("vehicleNotes").placeholder = t("vehNotes");
  document.getElementById("vehicleSaveBtn").textContent = t("vehiclesSave");

  // service placeholders
  document.getElementById("serviceDescription").placeholder = t("serviceWork");
  document.getElementById("serviceAmount").placeholder = t("serviceAmount");
  document.getElementById("serviceNotes").placeholder = t("serviceNotes");
  document.getElementById("serviceVehicleSearch").placeholder =
    t("serviceVehicleSearch");
  document.getElementById("serviceSaveBtn").textContent = t("serviceSave");

  // other titles
  document.getElementById("todayTitle").textContent =
    "📅 " + t("todayTitle");
  document.getElementById("remindersTitle").textContent =
    "🔔 " + t("remindersTitle");
}

// ================== NAVIGATION ==================
const SCREEN_IDS = [
  "customersScreen",
  "customerDetailScreen",
  "customerHistoryScreen",
  "vehiclesScreen",
  "serviceScreen",
  "todayScreen",
  "remindersScreen"
];

function goTo(name) {
  const map = {
    customers: "customersScreen",
    customerDetail: "customerDetailScreen",
    customerHistory: "customerHistoryScreen",
    vehicles: "vehiclesScreen",
    addService: "serviceScreen",
    today: "todayScreen",
    reminders: "remindersScreen"
  };

  SCREEN_IDS.forEach((id) => {
    document.getElementById(id).style.display = "none";
  });

  if (name !== "home") {
    document.getElementById(map[name]).style.display = "block";
  }

  document.getElementById("screenName").textContent =
    name === "home" ? "" : name;
}

// ================== CUSTOMERS ==================
function setupCustomerForm() {
  const form = document.getElementById("customerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const notes = document.getElementById("custNotes").value.trim();
    const hasWhatsapp = document.getElementById("custWhatsapp").checked;

    if (!name || !phone) return;

    data.customers.push({
      id: Date.now().toString(),
      name,
      phone,
      notes,
      hasWhatsapp
    });

    saveData();
    form.reset();
    renderCustomers();
    fillVehicleCustomerOptions();
    fillServiceVehicleOptions();
  });

  document
    .getElementById("customerSearch")
    .addEventListener("input", renderCustomers);
}

function renderCustomers() {
  const list = document.getElementById("customerList");
  const q = document
    .getElementById("customerSearch")
    .value.trim()
    .toLowerCase();

  const vehiclesByCustomer = {};
  data.vehicles.forEach((v) => {
    if (!vehiclesByCustomer[v.customerId]) {
      vehiclesByCustomer[v.customerId] = [];
    }
    vehiclesByCustomer[v.customerId].push(v);
  });

  const filtered = data.customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noCustomers")}</div></li>`;
    return;
  }

  list.innerHTML = filtered
    .map((c) => {
      const vs = vehiclesByCustomer[c.id] || [];
      const vLabel =
        vs.length === 0
          ? t("noVehicles")
          : vs.map((v) => v.number).join(", ");

      return `
        <li onclick="openCustomerDetail('${c.id}')">
          <div class="item-main">
            <div class="item-header">${c.name}</div>
            <div class="item-sub">${c.phone}</div>
            <div class="item-sub">Vehicles: ${vLabel}</div>
          </div>
        </li>`;
    })
    .join("");
}

// ================== CUSTOMER DETAIL ==================
function openCustomerDetail(id) {
  currentDetailCustomerId = id;
  renderCustomerDetail();
  goTo("customerDetail");
}

function renderCustomerDetail() {
  if (!currentDetailCustomerId) return;
  const c = data.customers.find((x) => x.id === currentDetailCustomerId);
  if (!c) return;

  const info = document.getElementById("customerDetailInfo");
  const list = document.getElementById("customerDetailList");

  info.innerHTML = `
    <div class="item-sub"><strong>${c.name}</strong></div>
    <div class="item-sub">${c.phone}</div>
    ${c.notes ? `<div class="item-sub">${c.notes}</div>` : ""}
  `;

  const vehicles = data.vehicles.filter((v) => v.customerId === c.id);
  const servicesByVehicle = {};
  data.services.forEach((s) => {
    if (!servicesByVehicle[s.vehicleId]) {
      servicesByVehicle[s.vehicleId] = [];
    }
    servicesByVehicle[s.vehicleId].push(s);
  });

  if (vehicles.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noVehicles")}</div></li>`;
    return;
  }

  list.innerHTML = vehicles
    .map((v) => {
      const svs = (servicesByVehicle[v.id] || []).sort((a, b) =>
        b.date.localeCompare(a.date)
      );
      const servicesHtml =
        svs.length === 0
          ? `<div class="item-sub">${t("noServicesYet")}</div>`
          : svs
              .map(
                (s) => `
            <div class="item-sub">
              • ${s.date} – ${s.description || ""} ${
                  s.amount ? "(₹" + s.amount + ")" : ""
                }
              ${
                s.nextDate
                  ? `<br/><small>Next: ${s.nextDate}</small>`
                  : ""
              }
            </div>`
              )
              .join("");

      return `
        <li>
          <div class="item-main">
            <div class="item-header">${v.number} (${v.model})</div>
            <div class="item-sub">Type: ${v.type}</div>
            ${v.notes ? `<div class="item-sub">${v.notes}</div>` : ""}
            <div class="item-sub"><strong>Services:</strong></div>
            ${servicesHtml}
          </div>
        </li>`;
    })
    .join("");
}

// ================== CUSTOMER HISTORY ==================
function openCustomerHistory() {
  if (!currentDetailCustomerId) return;
  renderCustomerHistory();
  goTo("customerHistory");
}

function renderCustomerHistory() {
  const c = data.customers.find((x) => x.id === currentDetailCustomerId);
  if (!c) return;

  const info = document.getElementById("customerHistoryInfo");
  const list = document.getElementById("customerHistoryList");

  info.innerHTML = `
    <div class="item-sub"><strong>${c.name}</strong></div>
    <div class="item-sub">${c.phone}</div>
    ${c.notes ? `<div class="item-sub">${c.notes}</div>` : ""}
  `;

  const vehiclesById = indexById(data.vehicles);

  const jobs = data.services.filter((s) => {
    const v = vehiclesById[s.vehicleId];
    return v && v.customerId === c.id;
  });

  if (jobs.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noHistory")}</div></li>`;
    return;
  }

  list.innerHTML = data.services
  .slice()
  .sort((a, b) => {
    if (a.date === b.date) {
      return b.id.localeCompare(a.id); // newest job of that day first
    }
    return b.date.localeCompare(a.date);
  })
  .map((s) => {
    const v = vehicles[s.vehicleId];
    const c = v ? customers[v.customerId] : null;
    const vehicleText = v
      ? `${v.number} (${v.model})`
      : "Unknown vehicle";
    const custText = c
      ? `${c.name} - ${c.phone}`
      : "Unknown customer";

    return `
      <li>
        <div class="item-main">
          <div class="item-header">${vehicleText}</div>
          <div class="item-sub">${custText}</div>
          <div class="item-sub">Job: ${s.date} | Next: ${s.nextDate}</div>
          ${
            s.description
              ? `<div class="item-sub">${s.description}</div>`
              : ""
          }
        </div>
        <div class="item-actions">
          ${
            s.amount
              ? `<div class="item-sub">₹${s.amount}</div>`
              : ""
          }
        </div>
      </li>`;
  })
  .join("");

}

// ================== VEHICLES ==================
function setupVehicleForm() {
  const form = document.getElementById("vehicleForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const customerId = document.getElementById("vehicleCustomer").value;
    const type = document.getElementById("vehicleType").value;
    const model = document.getElementById("vehicleModel").value.trim();
    const number = document.getElementById("vehicleNumber").value.trim();
    const notes = document.getElementById("vehicleNotes").value.trim();

    if (!customerId || !number) return;

    data.vehicles.push({
      id: Date.now().toString(),
      customerId,
      type,
      model,
      number,
      notes
    });

    saveData();
    form.reset();
    renderVehicles();
    renderCustomers();
    renderCustomerDetail();
    fillServiceVehicleOptions();
  });

  document
    .getElementById("vehicleSearch")
    .addEventListener("input", renderVehicles);
}

function renderVehicles() {
  const list = document.getElementById("vehicleList");
  const q = document
    .getElementById("vehicleSearch")
    .value.trim()
    .toLowerCase();

  const customersById = indexById(data.customers);

  const filtered = data.vehicles.filter((v) => {
    const c = customersById[v.customerId];
    const name = c ? c.name.toLowerCase() : "";
    return (
      v.number.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      name.includes(q)
    );
  });

  if (filtered.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noVehicles")}</div></li>`;
    return;
  }

  list.innerHTML = filtered
    .map((v) => {
      const c = customersById[v.customerId];
      const custLabel = c ? `${c.name} – ${c.phone}` : "";
      return `
        <li>
          <div class="item-main">
            <div class="item-header">${v.number}</div>
            <div class="item-sub">${v.model}</div>
            <div class="item-sub">${custLabel}</div>
          </div>
        </li>`;
    })
    .join("");
}

function fillVehicleCustomerOptions() {
  const sel = document.getElementById("vehicleCustomer");
  sel.innerHTML =
    `<option value="">Select customer</option>` +
    data.customers
      .map(
        (c) => `<option value="${c.id}">${c.name} - ${c.phone}</option>`
      )
      .join("");
}

// ================== SERVICES / JOBS ==================
function setupServiceForm() {
  const form = document.getElementById("serviceForm");
  const today = getToday();
  document.getElementById("serviceDate").value = today;
  document.getElementById("nextServiceDate").value = today;

  // search box for vehicle in Add Service
  const searchInput = document.getElementById("serviceVehicleSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      const list = allServiceVehicles.filter((item) =>
        item.label.toLowerCase().includes(q)
      );
      renderServiceVehicleOptions(list);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const vehicleId = document.getElementById("serviceVehicle").value;
    const date = document.getElementById("serviceDate").value || today;
    const desc = document
      .getElementById("serviceDescription")
      .value.trim();
    const amtRaw = document.getElementById("serviceAmount").value;
    const amount = amtRaw ? Number(amtRaw) : 0;
    const nextDate =
      document.getElementById("nextServiceDate").value || date;
    const notes = document
      .getElementById("serviceNotes")
      .value.trim();

    if (!vehicleId) return;

    if (editingJobId) {
      const job = data.services.find((s) => s.id === editingJobId);
      if (job) {
        job.vehicleId = vehicleId;
        job.date = date;
        job.description = desc;
        job.amount = amount;
        job.nextDate = nextDate;
        job.notes = notes;
      }
      editingJobId = null;
    } else {
      data.services.push({
        id: Date.now().toString(),
        vehicleId,
        date,
        description: desc,
        amount,
        nextDate,
        notes
      });
    }

    saveData();
    form.reset();
    document.getElementById("serviceDate").value = today;
    document.getElementById("nextServiceDate").value = today;

    renderServices();
    renderReminders();
    renderToday();
    renderCustomerDetail();
    renderCustomerHistory();
  });
}

// Build master list for Add Service vehicle select
function fillServiceVehicleOptions() {
  const customersById = indexById(data.customers);

  allServiceVehicles = data.vehicles.map((v) => {
    const c = customersById[v.customerId];
    const label = c
      ? `${v.number} - ${v.model} - ${c.name}`
      : `${v.number} - ${v.model}`;
    return { id: v.id, label, customerId: v.customerId };
  });

  renderServiceVehicleOptions(allServiceVehicles);
}

function renderServiceVehicleOptions(list) {
  const sel = document.getElementById("serviceVehicle");
  if (!sel) return;

  sel.innerHTML =
    `<option value="">Select vehicle</option>` +
    list
      .map((item) => `<option value="${item.id}">${item.label}</option>`)
      .join("");
}

// when coming from customer detail → filter vehicles by that customer
function filterServiceVehicleForCustomer(customerId) {
  const filtered = allServiceVehicles.filter(
    (item) => item.customerId === customerId
  );
  renderServiceVehicleOptions(filtered);
}

function renderServices() {
  const list = document.getElementById("serviceList");
  if (data.services.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noJobs")}</div></li>`;
    return;
  }

  const vehicles = indexById(data.vehicles);
  const customers = indexById(data.customers);

  list.innerHTML = data.services
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date)) // newest first
    .map((s) => {
      const v = vehicles[s.vehicleId];
      const c = v ? customers[v.customerId] : null;
      const vehicleText = v
        ? `${v.number} (${v.model})`
        : "Unknown vehicle";
      const custText = c
        ? `${c.name} - ${c.phone}`
        : "Unknown customer";

      return `
        <li>
          <div class="item-main">
            <div class="item-header">${vehicleText}</div>
            <div class="item-sub">${custText}</div>
            <div class="item-sub">Job: ${s.date} | Next: ${s.nextDate}</div>
            ${
              s.description
                ? `<div class="item-sub">${s.description}</div>`
                : ""
            }
          </div>
          <div class="item-actions">
            ${
              s.amount
                ? `<div class="item-sub">₹${s.amount}</div>`
                : ""
            }
          </div>
        </li>`;
    })
    .join("");
}

// EDIT JOB (from history)
function editJob(id) {
  const job = data.services.find((s) => s.id === id);
  if (!job) return;

  // reset full list before editing
  fillServiceVehicleOptions();

  editingJobId = id;
  goTo("addService");

  document.getElementById("serviceVehicle").value = job.vehicleId;
  document.getElementById("serviceDate").value = job.date;
  document.getElementById("serviceDescription").value =
    job.description || "";
  document.getElementById("serviceAmount").value = job.amount || "";
  document.getElementById("nextServiceDate").value =
    job.nextDate || "";
  document.getElementById("serviceNotes").value = job.notes || "";
}

// ================== TODAY & REMINDERS ==================
function renderToday() {
  const list = document.getElementById("todayList");
  const today = getToday();

  const vehicles = indexById(data.vehicles);
  const customers = indexById(data.customers);

  const jobs = data.services.filter((s) => s.date === today);

  if (jobs.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noJobsToday")}</div></li>`;
    return;
  }

  list.innerHTML = jobs
    .map((s) => {
      const v = vehicles[s.vehicleId];
      const c = v ? customers[v.customerId] : null;
      const vehicleText = v
        ? `${v.number} (${v.model})`
        : "Unknown vehicle";
      const custText = c ? c.name : "Unknown customer";

      return `
        <li>
          <div class="item-main">
            <div class="item-header">${vehicleText}</div>
            <div class="item-sub">${custText}</div>
          </div>
        </li>`;
    })
    .join("");
}

// OPTION A: show only today + future reminders
function renderReminders() {
  const list = document.getElementById("remindersList");
  const today = getToday();

  const vehicles = indexById(data.vehicles);
  const customers = indexById(data.customers);

  const jobs = data.services.filter(
    (s) => s.nextDate && s.nextDate >= today
  );

  if (jobs.length === 0) {
    list.innerHTML = `<li><div class="item-sub">${t("noReminders")}</div></li>`;
    return;
  }

  list.innerHTML = jobs
    .slice()
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))
    .map((s) => {
      const v = vehicles[s.vehicleId];
      const c = v ? customers[v.customerId] : null;
      const vehicleText = v
        ? `${v.number} (${v.model})`
        : "Unknown vehicle";
      const custText = c ? c.name : "Unknown customer";

      let status;
      if (s.nextDate === today) status = t("statusToday");
      else status = t("statusUpcoming");

      return `
        <li>
          <div class="item-main">
            <div class="item-header">${vehicleText}</div>
            <div class="item-sub">${custText}</div>
            <div class="item-sub">Next: ${s.nextDate} (${status})</div>
          </div>

          <div class="item-actions">
            <button class="btn-small btn-whatsapp"
              onclick="sendWhatsAppReminder('${c ? c.phone : ""}', '${c ? c.name : ""}', '${v ? v.number : ""}', '${s.nextDate}')">
              🟢 WhatsApp
            </button>
          </div>
        </li>`;
    })
    .join("");
}

// ================== GLOBAL SEARCH ==================
function setupGlobalSearch() {
  const input = document.getElementById("globalSearchInput");
  const dateEl = document.getElementById("globalSearchDate");
  input.addEventListener("input", handleGlobalSearch);
  dateEl.addEventListener("change", handleGlobalSearch);
}

function handleGlobalSearch() {
  const q = document
    .getElementById("globalSearchInput")
    .value.trim()
    .toLowerCase();
  const dateFilter = document.getElementById("globalSearchDate").value;
  const box = document.getElementById("searchResults");

  if (!q && !dateFilter) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }

  const vehicles = indexById(data.vehicles);
  const customers = indexById(data.customers);

  const results = data.services.filter((s) => {
    const v = vehicles[s.vehicleId];
    const c = v ? customers[v.customerId] : null;

    const vehicleNumber = v ? v.number.toLowerCase() : "";
    const customerName = c ? c.name.toLowerCase() : "";

    const textOk =
      !q ||
      vehicleNumber.includes(q) ||
      customerName.includes(q);

    const dateOk = !dateFilter || s.date === dateFilter;

    return textOk && dateOk;
  });

  if (results.length === 0) {
    box.style.display = "block";
    box.innerHTML = `<ul><li>${t("noMatches")}</li></ul>`;
    return;
  }

  box.style.display = "block";
  box.innerHTML =
    "<ul>" +
    results
      .map((s) => {
        const v = vehicles[s.vehicleId];
        const c = customers[v.customerId];
        const vehicleText = v
          ? `${v.number} (${v.model})`
          : "Unknown vehicle";
        const custText = c
          ? `${c.name} - ${c.phone}`
          : "Unknown customer";
        return `
          <li>
            <div class="item-main">
              <div class="item-header">${vehicleText}</div>
              <div class="item-sub">${custText}</div>
              <div class="item-sub">Job: ${s.date} | Next: ${s.nextDate}</div>
              ${
                s.description
                  ? `<div class="item-sub">${s.description}</div>`
                  : ""
              }
            </div>
            <div class="item-actions">
              ${
                s.amount
                  ? `<div class="item-sub">₹${s.amount}</div>`
                  : ""
              }
            </div>
          </li>`;
      })
      .join("") +
    "</ul>";
}

// ================== WHATSAPP REMINDER ==================
function sendWhatsAppReminder(phone, name, vehicle, date) {
  if (!phone) return;
  const cleanPhone = phone.replace(/\D/g, ""); // keep digits only
  const msg = `Hello ${name}, your next service is due for vehicle ${vehicle} on ${date}.`;
  const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ================== HOME & DETAIL BUTTONS ==================
function wireHomeButtons() {
  document
    .getElementById("btnHomeAddJob")
    .addEventListener("click", () => goTo("addService"));
  document
    .getElementById("btnHomeCustomers")
    .addEventListener("click", () => goTo("customers"));
  document
    .getElementById("btnHomeToday")
    .addEventListener("click", () => goTo("today"));
  document
    .getElementById("btnHomeReminders")
    .addEventListener("click", () => goTo("reminders"));
}

function wireDetailButtons() {
  document
    .getElementById("detailAddVehicleBtn")
    .addEventListener("click", () => {
      if (!currentDetailCustomerId) return;
      document.getElementById("vehicleCustomer").value =
        currentDetailCustomerId;
      goTo("vehicles");
    });

  document
    .getElementById("detailAddJobBtn")
    .addEventListener("click", () => {
      if (!currentDetailCustomerId) return;
      filterServiceVehicleForCustomer(currentDetailCustomerId);
      goTo("addService");
    });

  document
    .getElementById("detailHistoryBtn")
    .addEventListener("click", () => {
      openCustomerHistory();
    });

  document
    .getElementById("detailBackBtn")
    .addEventListener("click", () => goTo("customers"));

  document
    .getElementById("historyBackBtn")
    .addEventListener("click", () => {
      goTo("customerDetail");
    });
}

// ================== INIT ==================
function init() {
  loadData();
  applyLanguage();
  setupCustomerForm();
  setupVehicleForm();
  setupServiceForm();
  setupGlobalSearch();
  wireHomeButtons();
  wireDetailButtons();
  fillVehicleCustomerOptions();
  fillServiceVehicleOptions();
  renderCustomers();
  renderVehicles();
  renderServices();
  renderToday();
  renderReminders();
  goTo("home");

  document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ta" : "en";
    applyLanguage();
    renderCustomers();
    renderVehicles();
    renderServices();
    renderToday();
    renderReminders();
    renderCustomerDetail();
    renderCustomerHistory();
  });
}

document.addEventListener("DOMContentLoaded", init);
