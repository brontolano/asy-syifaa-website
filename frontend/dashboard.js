const roleEl = document.getElementById("role");
const kpiGridEl = document.getElementById("kpiGrid");
const widgetListEl = document.getElementById("widgetList");
const dashboardMsg = document.getElementById("dashboardMsg");
const activityRowsEl = document.getElementById("activityRows");

function toKpis(summary) {
  return [
    ["Total Santri", summary.totalSantri],
    ["Santri Aktif", summary.santriAktif],
    ["Pembayaran Bulan Ini", summary.pembayaranBulanIni],
    ["Kelas Aktif", summary.kelasAktif]
  ];
}

async function loadDashboard(role) {
  const resp = await fetch(`/api/dashboard/summary?role=${role}`);
  const data = await resp.json();

  if (!resp.ok) {
    dashboardMsg.textContent = data.message || "Akses ditolak.";
    kpiGridEl.innerHTML = "";
    widgetListEl.innerHTML = "";
    return;
  }

  dashboardMsg.textContent = "Akses superadmin aktif.";
  kpiGridEl.innerHTML = "";
  toKpis(data.summary).forEach(([label, value]) => {
    const card = document.createElement("article");
    card.className = "kpi dash-stat-card";
    card.innerHTML = `<h3>${label}</h3><p>${value}</p><span class="dash-stat-pill">Live</span>`;
    kpiGridEl.appendChild(card);
  });

  widgetListEl.innerHTML = "";
  data.widgets.forEach((w) => {
    const li = document.createElement("li");
    li.textContent = w;
    widgetListEl.appendChild(li);
  });

  const rows = [
    ["Sinkronisasi Data", "Normal", "API internal aktif dan responsif"],
    ["Hak Akses Role", "Aman", `Mode role: ${data.role}`],
    ["Perpustakaan Digital", "Tersedia", "Akses melalui menu Dashboard"]
  ];
  activityRowsEl.innerHTML = "";
  rows.forEach(([item, status, note]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item}</td><td><span class="dash-badge">${status}</span></td><td>${note}</td>`;
    activityRowsEl.appendChild(tr);
  });
}

roleEl.addEventListener("change", () => loadDashboard(roleEl.value));
loadDashboard(roleEl.value);
