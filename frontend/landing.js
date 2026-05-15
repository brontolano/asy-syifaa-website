const loginForm = document.getElementById("loginForm");
const authMsg = document.getElementById("authMsg");
const sessionInfo = document.getElementById("sessionInfo");
const logoutBtn = document.getElementById("logoutBtn");
const loginToggleBtn = document.getElementById("loginToggleBtn");
const loginModal = document.getElementById("loginModal");
const loginCloseBtn = document.getElementById("loginCloseBtn");
const loginBackdrops = Array.from(document.querySelectorAll("[data-login-close]"));
const protectedCards = Array.from(document.querySelectorAll("[data-protected='true']"));

function openLoginModal() {
  if (loginModal) loginModal.hidden = false;
}

function closeLoginModal() {
  if (loginModal) loginModal.hidden = true;
}

function setProtectedVisibility(isSuperadmin) {
  protectedCards.forEach((card) => {
    card.classList.toggle("hidden-by-access", !isSuperadmin);
  });
}

async function refreshSession() {
  const s = await window.erpAuth.getSession();
  const isSuperadmin = !!(s.authenticated && s.role === "superadmin");
  if (isSuperadmin) {
    sessionInfo.textContent = `Login aktif: ${s.username} (${s.role})`;
    logoutBtn.hidden = false;
    setProtectedVisibility(true);
    return;
  }
  sessionInfo.textContent = "";
  logoutBtn.hidden = !s.authenticated;
  setProtectedVisibility(false);
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    await window.erpAuth.login(username, password);
    authMsg.textContent = "Login berhasil. Dashboard sekarang bisa diakses.";
    loginForm.reset();
    await refreshSession();
    closeLoginModal();
  } catch (err) {
    authMsg.textContent = err.message;
  }
});

logoutBtn.addEventListener("click", async () => {
  await window.erpAuth.logout();
  authMsg.textContent = "Logout berhasil.";
  await refreshSession();
});

if (loginToggleBtn) loginToggleBtn.addEventListener("click", openLoginModal);
if (loginCloseBtn) loginCloseBtn.addEventListener("click", closeLoginModal);
loginBackdrops.forEach((el) => el.addEventListener("click", closeLoginModal));

refreshSession();
