




// =====================
    // Inisialisasi AOS (dari berbagai file HTML)
    // =====================
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

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

        // =====================
        // Animasi Counter Stat (dari index.html)
        // Ini hanya akan berjalan jika elemen .stat-number ada di halaman
        // =====================
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length > 0) {
            const speed = 2000; // durasi animasi

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
                        observer.unobserve(counter); // Hentikan observasi setelah animasi dimulai
                    }
                });
            }, { threshold: 0.6 }); // Mulai saat 60% elemen terlihat

            counters.forEach(counter => {
                observer.observe(counter);
            });
        }


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
