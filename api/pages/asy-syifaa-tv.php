<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Asy-Syifaa TV | Livestream</title>
  <meta name="description" content="Asy-Syifaa TV - Siaran langsung resmi dari Facebook dan YouTube.">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">
  <style>
    .tv-shell { max-width: 1280px; margin: 0 auto; }
    .tv-player { width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 14px; background: #0b0b0b; }
    .tv-btn.active { background: var(--primary-green); color: #fff; border-color: var(--primary-green); }
  </style>
</head>
<body id="top">
<?php include __DIR__ . '/partials.header.php'; ?>

<main class="py-5 bg-light">
  <section class="container tv-shell">
    <header class="section-header text-center mb-4">
      <h2>Asy-Syifaa TV</h2>
      <p class="text-muted mb-0">Pilih server livestreaming yang ingin ditonton.</p>
    </header>

    <div class="d-flex flex-wrap gap-2 justify-content-center mb-3">
      <button type="button" class="btn btn-outline-success rounded-pill px-4 tv-btn active" data-server="facebook"><i class="fa-brands fa-facebook me-1"></i> Facebook Live</button>
      <button type="button" class="btn btn-outline-success rounded-pill px-4 tv-btn" data-server="youtube"><i class="fa-brands fa-youtube me-1"></i> YouTube Live</button>
    </div>

    <div class="mb-3">
      <iframe id="tvPlayer" class="tv-player" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture"></iframe>
    </div>

    <div class="alert alert-info small mb-0">
      Jika player platform diblokir oleh browser/platform, buka langsung:
      <a href="https://facebook.com/AsySyifaaTV/live" target="_blank" rel="noopener">Facebook Live</a> atau
      <a href="https://www.youtube.com/@AsySyifaaTVOfficial/streams" target="_blank" rel="noopener">YouTube Streams</a>.
    </div>
  </section>
</main>

<script src="/assets/js/api-config.js"></script>
<script>
  (function () {
    var player = document.getElementById("tvPlayer");
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".tv-btn"));
    var sources = {
      facebook: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FAsySyifaaTV%2Flive&show_text=false&width=1280",
      youtube: "https://www.youtube.com/@AsySyifaaTVOfficial/live"
    };
    var liveNote = document.createElement("div");
    liveNote.className = "alert alert-secondary small mt-3 mb-0";
    liveNote.textContent = "Mengecek status live...";
    player.parentElement.insertAdjacentElement("afterend", liveNote);

    function setServer(name) {
      var src = sources[name] || sources.facebook;
      player.src = src;
      buttons.forEach(function (btn) {
        if (btn.getAttribute("data-server") === name) btn.classList.add("active");
        else btn.classList.remove("active");
      });
    }

    async function autoDetectAndSwitch() {
      if (!window.ASF_LIVE || typeof window.ASF_LIVE.detectLiveStatus !== "function") {
        liveNote.textContent = "Auto-detect belum aktif. Menampilkan server default.";
        return;
      }
      var status = await window.ASF_LIVE.detectLiveStatus();
      if (status && status.online) {
        if (status.platform === "youtube" && status.embedUrl) {
          sources.youtube = status.embedUrl;
          setServer("youtube");
        } else if (status.platform === "facebook" && status.embedUrl) {
          sources.facebook = status.embedUrl;
          setServer("facebook");
        }
        liveNote.className = "alert alert-danger small mt-3 mb-0";
        liveNote.innerHTML = "<strong>LIVE:</strong> " + (status.title || "Siaran langsung sedang berlangsung.");
      } else {
        liveNote.className = "alert alert-secondary small mt-3 mb-0";
        liveNote.textContent = "Saat ini belum terdeteksi live aktif. Silakan pilih server manual.";
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setServer(btn.getAttribute("data-server"));
      });
    });

    setServer("facebook");
    autoDetectAndSwitch();
    setInterval(autoDetectAndSwitch, 60000);
  })();
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/js/main.js"></script>
</body>
</html>

