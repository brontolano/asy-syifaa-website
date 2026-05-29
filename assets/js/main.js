




// =====================
// Inisialisasi AOS (aman untuk urutan script yang berbeda)
// =====================
(function initAOSSafely() {
    const init = () => {
        if (typeof window !== 'undefined' && window.AOS && typeof window.AOS.init === 'function') {
            window.AOS.init({
                duration: 800,
                once: true,
                offset: 50,
            });
        }
    };

    init();
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    }
})();

// =====================
// Live streaming status helper + bubble notifier
// =====================
(function initLiveStatusHelper() {
    const CONFIG = {
        ytApiKey: String(window.ASF_YT_API_KEY || "").trim(),
        ytChannelId: String(window.ASF_YT_CHANNEL_ID || "").trim(),
        fbPageId: String(window.ASF_FB_PAGE_ID || "").trim(),
        fbPageToken: String(window.ASF_FB_PAGE_TOKEN || "").trim(),
        ytHandleLiveUrl: "https://www.youtube.com/@AsySyifaaTVOfficial/live",
        fbLiveUrl: "https://facebook.com/AsySyifaaTV/live"
    };

    async function detectYouTubeLive() {
        if (!CONFIG.ytApiKey || !CONFIG.ytChannelId) return { online: false, reason: "missing_yt_config" };
        const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(CONFIG.ytChannelId)}&eventType=live&type=video&maxResults=1&key=${encodeURIComponent(CONFIG.ytApiKey)}`;
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) return { online: false, reason: "yt_api_failed" };
        const payload = await res.json();
        const item = Array.isArray(payload?.items) ? payload.items[0] : null;
        const videoId = item?.id?.videoId || "";
        if (!videoId) return { online: false, reason: "yt_not_live" };
        return {
            online: true,
            platform: "youtube",
            title: item?.snippet?.title || "YouTube Live",
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        };
    }

    async function detectFacebookLive() {
        if (!CONFIG.fbPageId || !CONFIG.fbPageToken) return { online: false, reason: "missing_fb_config" };
        const endpoint = `https://graph.facebook.com/v20.0/${encodeURIComponent(CONFIG.fbPageId)}/live_videos?fields=id,permalink_url,status,title&access_token=${encodeURIComponent(CONFIG.fbPageToken)}`;
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) return { online: false, reason: "fb_api_failed" };
        const payload = await res.json();
        const list = Array.isArray(payload?.data) ? payload.data : [];
        const liveNow = list.find((row) => String(row?.status || "").toUpperCase() === "LIVE");
        if (!liveNow) return { online: false, reason: "fb_not_live" };
        const permalink = liveNow.permalink_url || CONFIG.fbLiveUrl;
        return {
            online: true,
            platform: "facebook",
            title: liveNow.title || "Facebook Live",
            watchUrl: permalink,
            embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(permalink)}&show_text=false&width=1280`
        };
    }

    async function detectLiveStatus() {
        const yt = await detectYouTubeLive().catch(() => ({ online: false, reason: "yt_error" }));
        if (yt.online) return { online: true, ...yt };

        const fb = await detectFacebookLive().catch(() => ({ online: false, reason: "fb_error" }));
        if (fb.online) return { online: true, ...fb };

        return { online: false, reason: yt.reason || fb.reason || "not_live" };
    }

    function ensureLiveBubble() {
        let bubble = document.getElementById("liveStatusBubble");
        if (bubble) return bubble;
        bubble = document.createElement("a");
        bubble.id = "liveStatusBubble";
        bubble.href = "/asy-syifaa-tv";
        bubble.style.cssText = [
            "position:fixed",
            "right:16px",
            "bottom:16px",
            "z-index:9999",
            "display:none",
            "align-items:center",
            "gap:.5rem",
            "padding:.5rem .85rem",
            "border-radius:999px",
            "background:#d62828",
            "color:#fff",
            "text-decoration:none",
            "font-weight:700",
            "font-size:.82rem",
            "box-shadow:0 10px 24px rgba(0,0,0,.22)"
        ].join(";");
        bubble.innerHTML = '<span style="width:10px;height:10px;border-radius:50%;background:#fff;display:inline-block;animation:asfPulse 1.2s infinite;"></span> Live Streaming Berlangsung';
        document.body.appendChild(bubble);
        const style = document.createElement("style");
        style.textContent = "@keyframes asfPulse{0%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.75)}100%{opacity:1;transform:scale(1)}}";
        document.head.appendChild(style);
        return bubble;
    }

    function applyLiveBubble(status) {
        const bubble = ensureLiveBubble();
        if (status?.online) {
            bubble.style.display = "inline-flex";
            bubble.href = "/asy-syifaa-tv?autoplay=1";
            bubble.title = status.title || "Sedang live";
        } else {
            bubble.style.display = "none";
        }
    }

    window.ASF_LIVE = {
        detectLiveStatus,
        applyLiveBubble,
        config: CONFIG
    };
})();

    document.addEventListener('DOMContentLoaded', () => {
        // =====================
        // Tombol "Back to Top" (dari berbagai file HTML)
        // =====================
        const backToTop = document.getElementById("backToTop");
        if (backToTop) {
            window.addEventListener("scroll", function () {
                backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
                backToTop.style.alignItems = "center";
                backToTop.style.justifyContent = "center";
            });
        }

        // ======================
        // Toggle Search Overlay (dari berbagai file HTML)
        // ======================
        const toggleSearch = document.getElementById('toggleSearch');
        const searchOverlay = document.getElementById('searchOverlay');
        const closeSearch = document.getElementById('closeSearch');

        if (toggleSearch && searchOverlay && closeSearch) {
            toggleSearch.addEventListener('click', function (e) {
                e.preventDefault();
                searchOverlay.style.display = 'flex';
            });

            closeSearch.addEventListener('click', function () {
                searchOverlay.style.display = 'none';
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    searchOverlay.style.display = 'none';
                }
            });
        }

        document.addEventListener('click', function (e) {
            const buttonLink = e.target.closest?.('.card-btn[href]');
            if (!buttonLink || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const href = buttonLink.getAttribute('href');
            if (!href || href.startsWith('#') || buttonLink.target === '_blank' || buttonLink.hasAttribute('download')) return;

            e.preventDefault();
            window.location.assign(href);
        });

        // ======================
        // Active state navbar publik (auto berdasarkan URL halaman)
        // ======================
        (function syncPublicNavbarActiveState() {
            const navRoot = document.querySelector('.asf-public-navbar');
            if (!navRoot) return;

            const normalizePath = (href) => {
                try {
                    const url = new URL(href, window.location.origin);
                    let pathname = (url.pathname || '/').toLowerCase();
                    pathname = pathname.replace(/\/+$/, '');
                    return pathname || '/';
                } catch (_error) {
                    return '';
                }
            };

            const currentPath = normalizePath(window.location.pathname);
            const links = Array.from(navRoot.querySelectorAll('a[href]'));
            let matchedLink = null;

            for (const link of links) {
                const href = link.getAttribute('href') || '';
                if (!href || href.startsWith('#') || href.startsWith('javascript:')) continue;
                const targetPath = normalizePath(href);
                if (!targetPath) continue;
                if (targetPath === currentPath || (targetPath === '/index.html' && currentPath === '/')) {
                    matchedLink = link;
                    break;
                }
            }

            if (!matchedLink) return;
            matchedLink.classList.add('active');
            matchedLink.setAttribute('aria-current', 'page');

            const parentDropdownMenu = matchedLink.closest('.dropdown-menu');
            if (parentDropdownMenu) {
                const parentDropdown = parentDropdownMenu.closest('.dropdown');
                const toggle = parentDropdown?.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.classList.add('active');
                    toggle.setAttribute('aria-current', 'page');
                }
            }
        })();

        (function setupLiveStatusBubble() {
            if (!window.ASF_LIVE || typeof window.ASF_LIVE.detectLiveStatus !== "function") return;
            const refresh = async () => {
                const status = await window.ASF_LIVE.detectLiveStatus();
                window.ASF_LIVE.applyLiveBubble(status);
            };
            refresh();
            setInterval(refresh, 60000);
        })();

        // Hover intent dropdown desktop:
        // - muncul setelah jeda singkat
        // - hilang juga dengan jeda agar navigasi tidak "kaget"
        (function setupNavbarHoverIntent() {
            const navRoot = document.querySelector('.asf-public-navbar');
            if (!navRoot) return;
            if (window.matchMedia('(max-width: 1199.98px)').matches) return;

            const items = Array.from(navRoot.querySelectorAll('.nav-item.dropdown'));
            const openDelay = 180;
            const closeDelay = 260;

            items.forEach((item) => {
                let openTimer = null;
                let closeTimer = null;

                const clearTimers = () => {
                    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
                    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
                };

                const openMenu = () => {
                    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
                    if (item.classList.contains('hover-open')) return;
                    openTimer = setTimeout(() => {
                        item.classList.add('hover-open');
                        openTimer = null;
                    }, openDelay);
                };

                const closeMenu = () => {
                    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
                    closeTimer = setTimeout(() => {
                        item.classList.remove('hover-open');
                        closeTimer = null;
                    }, closeDelay);
                };

                item.addEventListener('mouseenter', openMenu);
                item.addEventListener('mouseleave', closeMenu);
                item.addEventListener('focusin', openMenu);
                item.addEventListener('focusout', () => {
                    if (!item.contains(document.activeElement)) closeMenu();
                });
                item.addEventListener('click', () => {
                    clearTimers();
                    item.classList.add('hover-open');
                });
            });
        })();

        // =====================
        // Sinkronisasi statistik website dengan ERP + animasi counter
        // =====================
        async function syncWebsiteStats() {
            const counters = Array.from(document.querySelectorAll(".stat-number"));
            if (counters.length === 0) return;

            const API_BASE = ["localhost", "127.0.0.1", "[::1]"].includes((window.location.hostname || "").toLowerCase()) ? "http://localhost:4000" : "https://api.asy-syifaa.com";
            const fetchJson = async (path) => {
                const response = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            };

            try {
                const [studentsRes, staffRes] = await Promise.all([
                    fetchJson("/api/public/students"),
                    fetchJson("/api/public/staff?status=aktif")
                ]);

                const students = Array.isArray(studentsRes?.data) ? studentsRes.data : [];
                const staff = Array.isArray(staffRes?.data) ? staffRes.data : [];

                const banin = students.filter((row) => String(row.status || "").toLowerCase() === "aktif" && String(row.gender || "").toUpperCase() === "L").length;
                const banat = students.filter((row) => String(row.status || "").toLowerCase() === "aktif" && String(row.gender || "").toUpperCase() === "P").length;
                const alumni = students.filter((row) => String(row.status || "").toLowerCase() === "alumni").length;
                const pendidik = staff.length;

                counters.forEach((counter) => {
                    const labelEl = counter.closest(".stat-box")?.querySelector(".stat-label");
                    const label = (labelEl?.textContent || "").trim().toLowerCase();
                    if (label === "santri banin") counter.setAttribute("data-target", String(banin));
                    if (label === "santri banat") counter.setAttribute("data-target", String(banat));
                    if (label === "alumni") counter.setAttribute("data-target", String(alumni));
                    if (label === "pendidik") counter.setAttribute("data-target", String(pendidik));
                    counter.innerText = "0";
                });
            } catch (_error) {
                // fallback: tetap gunakan angka hardcoded data-target jika API belum aktif
            }
        }

        function initStatCounterAnimation() {
            const counters = document.querySelectorAll('.stat-number');
            if (counters.length === 0) return;
            const speed = 2000;
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText.replace(/,/g, '');
                            const increment = Math.ceil(target / (speed / 20));
                            if (count < target) {
                                counter.innerText = (count + increment).toLocaleString();
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target.toLocaleString();
                            }
                        };
                        updateCount();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.6 });
            counters.forEach(counter => observer.observe(counter));
        }

        syncWebsiteStats().finally(() => initStatCounterAnimation());

        // =====================
        // Sinkronisasi blok Guru & Staf dari ERP
        // =====================
        async function syncGuruStafFromErp() {
            const guruTrack = document.getElementById("guruTrack");
            if (!guruTrack) return;
            const API_BASE = ["localhost", "127.0.0.1", "[::1]"].includes((window.location.hostname || "").toLowerCase()) ? "http://localhost:4000" : "https://api.asy-syifaa.com";

            const esc = (value) => String(value || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");

            try {
                const response = await fetch(`${API_BASE}/api/public/staff?status=aktif`, { cache: "no-store" });
                if (!response.ok) return;
                const payload = await response.json();
                const staffRows = Array.isArray(payload?.data) ? payload.data : [];
                if (staffRows.length === 0) return;

                const html = staffRows.slice(0, 24).map((row, index) => {
                    const name = esc(row.full_name || "Pengajar");
                    const role = esc(row.role || "Pengajar");
                    const initials = name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() || "")
                        .join("") || "U";
                    const tone = index % 2 === 0 ? "206c4e" : "1a3e2c";
                    const photo = `https://placehold.co/600x750/${tone}/FFF?text=${encodeURIComponent(initials)}`;
                    return `
<div class="guru-card">
    <div class="guru-img-container">
        <img src="${photo}" alt="${name}" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">${role}</div>
        <h4 class="guru-nama">${name}</h4>
        <div class="guru-line"></div>
    </div>
</div>`;
                }).join("");

                guruTrack.innerHTML = html;
            } catch (_error) {
                // fallback: biarkan konten hardcoded jika API belum aktif
            }
        }

        syncGuruStafFromErp();

        // Catatan: Feed pengumuman/agenda dikelola di modul ERP Website (CMS),
        // bukan diinjeksi langsung ke halaman website publik.


        // ------------------------------------------------
    // 1. LOGIKA SLIDER EKSTRAKURIKULER (BARU)
    // ------------------------------------------------
    const ekskulTrack = document.getElementById('ekskulTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (ekskulTrack && prevBtn && nextBtn) {
        const scrollAmount = 325; // Sesuaikan dengan lebar kartu + gap

        nextBtn.addEventListener('click', () => {
            ekskulTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            ekskulTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // Cek posisi scroll untuk update status tombol
        ekskulTrack.addEventListener('scroll', () => {
            const maxScrollLeft = ekskulTrack.scrollWidth - ekskulTrack.clientWidth;
            
            // Tombol Kiri
            if (ekskulTrack.scrollLeft <= 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }

            // Tombol Kanan
            if (ekskulTrack.scrollLeft >= maxScrollLeft - 10) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        });
        
        // Pemicu awal agar status tombol benar saat load
        ekskulTrack.dispatchEvent(new Event('scroll'));
    }
        
        // ======================
        // Video Modal Logic (dari Galeri Video.html)
        // Ini hanya akan berjalan jika elemen #videoModal dan #videoPlayer ada di halaman
        // ======================
        const videoModal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('videoPlayer');

        if (videoModal && videoPlayer) {
            videoModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const videoUrl = button.getAttribute('data-video-url');
                videoPlayer.src = videoUrl;
            });

            videoModal.addEventListener('hidden.bs.modal', function () {
                videoPlayer.src = '';
            });
        }

 // ------------------------------------------------
    // 6. LIGHTGALLERY & LOAD MORE
    // ------------------------------------------------
    const gallery = document.getElementById('lightgallery');
    const loadMoreBtn = document.getElementById('loadMoreGallery');

    if (gallery && loadMoreBtn) {
        let visibleItems = 6;
        const itemsPerLoad = 6;
        const allGalleryItems = Array.from(gallery.children);

        allGalleryItems.forEach((item, index) => {
            if (index >= visibleItems) {
                item.style.display = 'none';
            }
        });

        if (allGalleryItems.length <= visibleItems) {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', () => {
            const hiddenItems = allGalleryItems.filter(item => item.style.display === 'none');
            let itemsToShow = hiddenItems.slice(0, itemsPerLoad);

            itemsToShow.forEach(item => {
                item.style.display = 'block';
                // Refresh AOS agar item baru terdeteksi animasinya
                if (typeof AOS !== 'undefined') AOS.refresh(); 
            });

            visibleItems += itemsToShow.length;

            if (visibleItems >= allGalleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // ------------------------------------------------
    // 7. FILTER TOMBOL GALERI (LIGHTBOX)
    // ------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('myLightbox');
    const lightboxImg = document.getElementById('img01');
    const closeBtn = document.querySelector('.close-lightbox');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ------------------------------------------------
    // 8. LOGIKA PENCARIAN SITUS
    // ------------------------------------------------
    const resultsTitleEl = document.getElementById('search-results-title');
    const resultsContainerEl = document.getElementById('search-results-container');

    if (resultsTitleEl && resultsContainerEl) {
        const siteIndex = [
                {
                    title: 'Halaman Utama',
                    url:'/index.html',
                    keywords: 'selamat datang pondok pesantren asy-syifaa wal mahmuudiyyah statistik foto video'
                },
                {
                    title: 'Visi & Misi Pesantren',
                    url:'/profil-visi-misi.html',
                    keywords: 'visi misi tujuan Profile sejarah struktur organisasi'
                },
                {
                    title: 'Direktori Santri Banin (Putra)',
                    url:'/direktori-banin.html',
                    keywords: 'data santri direktori banin putra database'
                },
                {
                    title: 'Galeri Foto Kegiatan',
                    url:'/galeri.html',
                    keywords: 'foto galeri dokumentasi kegiatan ngaji kitab kuning olahraga ramadan wisuda'
                },
                {
                    title: 'Galeri Video',
                    url:'/galeri.html',
                    keywords: 'video galeri youtube rekaman pengajian'
                },
                {
                    title: 'Informasi Pendaftaran Santri Baru',
                    url:'/alur-pendaftaran.html',
                    keywords: 'pendaftaran santri baru psb ppdb alur syarat daftar online hasil seleksi'
                },
                {
                    title: 'Kurikulum Pesantren',
                    url:'/profil-kurikulum.html',
                    keywords: 'kurikulum wustho ulya pendidikan kitab sorogan bandongan'
                },
                {
                    title: 'Sejarah Pesantren',
                    url:'/profil-pondok.html',
                    keywords: 'sejarah pesantren berdirinya pondok'
                },
                {
                    title: 'Fasilitas Pesantren',
                    url:'/profil-fasilitas.html',
                    keywords: 'fasilitas pesantren asrama masjid kelas perpustakaan'
                },
                {
                    title: 'Struktur Organisasi',
                    url:'/profil-struktur.html',
                    keywords: 'struktur organisasi pengurus yayasan'
                },
                {
                    title: 'Direktori Santri Banat (Putri)',
                    url:'/direktori-banat.html',
                    keywords: 'data santri direktori banat putri database'
                },
                {
                    title: 'Direktori Pengajar',
                    url:'/direktori-pengajar.html',
                    keywords: 'direktori pengajar ustadz ustadzah guru'
                },
                {
                    title: 'Daftar Sekarang',
                    url:'/daftar-sekarang.html',
                    keywords: 'daftar sekarang formulir pendaftaran'
                },
                {
                    title: 'Hasil Seleksi',
                    url:'/hasil-seleksi.html',
                    keywords: 'hasil seleksi pengumuman kelulusan'
                },
                {
                    title: 'Kegiatan Harian',
                    url:'/kegiatan-harian.html',
                    keywords: 'kegiatan harian jadwal rutinitas'
                },
                {
                    title: 'Kegiatan Mingguan, Bulanan, Tahunan',
                    url:'/kegiatan-mingguan.html',
                    keywords: 'kegiatan mingguan bulanan tahunan ekstrakurikuler'
                },
                {
                    title: 'Peraturan Santri Banin',
                    url:'/kegiatan-harian.html',
                    keywords: 'peraturan santri banin putra tata tertib'
                },
                {
                    title: 'Peraturan Santri Banat',
                    url:'/kegiatan-harian.html',
                    keywords: 'peraturan santri banat putri tata tertib'
                },
                {
                    title: 'Qisim',
                    url:'/kegiatan-harian.html',
                    keywords: 'qisim bagian divisi'
                },
                {
                    title: 'Kelas Wustho',
                    url:'/profil-kurikulum.html',
                    keywords: 'kurikulum kelas wustho'
                },
                {
                    title: 'Kelas Ulya',
                    url:'/profil-kurikulum.html',
                    keywords: 'kurikulum kelas ulya'
                }
            ];

       const params = new URLSearchParams(window.location.search);
        const query = params.get('s')?.toLowerCase() || '';

        resultsTitleEl.innerHTML = `Hasil Pencarian untuk: <span>"${query}"</span>`;
        resultsContainerEl.innerHTML = '';

        if (query) {
            const results = siteIndex.filter(item =>
                item.title.toLowerCase().includes(query) || item.keywords.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                const regex = new RegExp(query, 'gi');
                results.forEach(result => {
                    const highlightedTitle = result.title.replace(regex, (match) => `<mark>${match}</mark>`);
                    const highlightedSnippet = result.keywords.replace(regex, (match) => `<mark>${match}</mark>`);

                    const card = document.createElement('div');
                    card.className = 'search-result-card';
                    card.innerHTML = `
                        <div class="result-icon"><i class="bi bi-file-earmark-text"></i></div>
                        <div class="result-content">
                            <h3 class="result-title"><a href="${result.url}">${highlightedTitle}</a></h3>
                            <div class="result-url">${result.url}</div>
                            <p class="result-snippet">Kata kunci terkait: ${highlightedSnippet}</p>
                        </div>
                    `;
                    resultsContainerEl.appendChild(card);
                });
            } else {
                resultsContainerEl.innerHTML = '<p class="lead">Maaf, tidak ada halaman yang cocok dengan kata kunci Anda.</p>';
            }
        } else {
            resultsContainerEl.innerHTML = '<p class="lead">Silakan masukkan kata kunci untuk memulai pencarian.</p>';
        }
    }

}); // Tutup DOMContentLoaded






     document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-button');
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('myLightbox');
            const lightboxImg = document.getElementById('img01');
            const closeBtn = document.querySelector('.close-lightbox');

            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.dataset.filter;

                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

// Lightbox Logic
    if (lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Mencegah link default jika ada
                e.preventDefault(); 
                lightbox.style.display = 'block';
                // Ambil gambar dari dalam item
                const img = this.querySelector('img');
                if (img) lightboxImg.src = img.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    }); // Tutup DOMContentLoaded

// Baru 2026

