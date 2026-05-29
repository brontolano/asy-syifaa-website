(function () {
  var host = (window.location.hostname || "").toLowerCase();
  var local = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  window.ASF_API_BASE = local ? "http://localhost:4000" : "https://api.asy-syifaa.com";
  window.ASF_ERP_BASE = local ? "http://localhost:3000" : "https://erp.asy-syifaa.com";

  // Optional: isi jika ingin auto-detect live lintas platform tanpa backend tambahan.
  // YouTube Data API key (read-only) untuk cek eventType=live.
  window.ASF_YT_API_KEY = window.ASF_YT_API_KEY || "";
  // Channel ID YouTube @AsySyifaaTVOfficial (bisa diganti jika berubah).
  window.ASF_YT_CHANNEL_ID = window.ASF_YT_CHANNEL_ID || "";
  // Facebook live detection butuh Page ID + Page Access Token.
  window.ASF_FB_PAGE_ID = window.ASF_FB_PAGE_ID || "";
  window.ASF_FB_PAGE_TOKEN = window.ASF_FB_PAGE_TOKEN || "";
})();
