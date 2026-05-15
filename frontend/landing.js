const sessionInfo = document.getElementById("sessionInfo");

async function boot() {
  const s = await window.erpAuth.getSession();
  if (s?.authenticated && s?.role === "superadmin") return;
  sessionInfo.textContent = "";
  window.location.replace("/login");
}

boot();
