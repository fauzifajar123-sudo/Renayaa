document.addEventListener('DOMContentLoaded', () => {

    // ===== SEARCH OVERLAY LOGIC =====
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const navMenuBtn = document.getElementById('nav-menu-btn');

    // Define all searchable pages/sections
    const searchableItems = [
        { title: 'Beranda', desc: 'Halaman utama website', emoji: '🏠', type: 'section', target: '#hero-section' },
        { title: 'Catatan Awal', desc: 'Pengantar tentang kenangan', emoji: '📖', type: 'section', target: '#intro' },
        { title: 'Surat Kenangan', desc: 'Sepucuk surat untuk kenangan', emoji: '💌', type: 'section', target: '#surat' },
        { title: 'Tentang Yang Pernah Ada', desc: 'Cerita yang pernah ditulis bersama', emoji: '📝', type: 'section', target: '.story' },
        { title: 'Dokumentasi Kita', desc: 'Foto-foto kenangan bersama', emoji: '📸', type: 'section', target: '#documentation' },
        { title: 'Serpihan Ingatan', desc: 'Potongan-potongan memori', emoji: '🍂', type: 'section', target: '.fragments' },
        { title: 'Yang Tertinggal', desc: 'Pelajaran dari perpisahan', emoji: '🌿', type: 'section', target: '.lessons' },
        { title: 'Melepaskan', desc: 'Berdamai dengan masa lalu', emoji: '🤍', type: 'section', target: '.acceptance' },
        { title: 'Memory Game', desc: 'Game memori kenangan', emoji: '🎮', type: 'section', target: '#game' },
        { title: 'Penutup', desc: 'Catatan penutup', emoji: '✨', type: 'section', target: '.closing' },
        { title: 'Galeri Kenangan', desc: 'Lihat semua foto kenangan', emoji: '🖼️', type: 'page', target: 'gallery.html' },
    ];

    function renderSearchResults(query) {
        searchResults.innerHTML = '';
        const q = query.toLowerCase().trim();
        const filtered = q === '' ? searchableItems : searchableItems.filter(item =>
            item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">Tidak ada hasil ditemukan 😔</div>';
            return;
        }

        filtered.forEach(item => {
            const el = document.createElement('div');
            el.className = 'search-result-item';
            el.innerHTML = `
                <div class="search-result-emoji">${item.emoji}</div>
                <div class="search-result-info">
                    <div class="search-result-title">${item.title}</div>
                    <p class="search-result-desc">${item.desc}</p>
                </div>
                <span class="search-result-arrow">→</span>
            `;
            el.addEventListener('click', () => {
                closeSearch();
                if (item.type === 'page') {
                    window.location.href = item.target;
                } else {
                    const targetEl = document.querySelector(item.target);
                    if (targetEl) {
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 400);
                    }
                }
            });
            searchResults.appendChild(el);
        });
    }

    function openSearch() {
        searchOverlay.classList.add('active');
        navMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 300);
        renderSearchResults('');
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        navMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
    }

    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', () => {
            if (searchOverlay.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        });
    }

    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Close when clicking outside the inner content
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    // ===== END SEARCH OVERLAY LOGIC =====

    // ===== POPUP OVERLAY LOGIC =====
    const popupOverlay = document.getElementById('popup-overlay');
    const popupBtn = document.getElementById('popup-btn');
    const popupParticles = document.getElementById('popup-particles');

    // Create floating particles
    const particleEmojis = ['🍂', '🍃', '🥀', '🤍', '🍁', '✨', '💫'];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.classList.add('popup-particle');
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        popupParticles.appendChild(particle);
    }

    // Dismiss popup and auto-play music
    popupBtn.addEventListener('click', () => {
        popupOverlay.classList.add('hidden');
        setTimeout(() => {
            popupOverlay.remove();
        }, 900);

        // Auto-play music when popup is dismissed
        const bgMusic = document.getElementById('bg-music');
        const musicBtn = document.getElementById('music-btn');
        if (bgMusic) {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<span id="music-icon">⏸️</span> Pause Music';
                localStorage.setItem('musicPlaying', 'true');
            }).catch(err => {
                console.log('Autoplay blocked:', err);
            });
        }
    });
    // ===== END POPUP OVERLAY LOGIC =====

    // ===== SURAT KENANGAN LOGIC =====
    const suratOpenBtn = document.getElementById('surat-open-btn');
    const suratEnvelope = document.getElementById('surat-envelope');
    const suratContent = document.getElementById('surat-content');
    const videoKenangan = document.getElementById('video-kenangan');
    const suratParticles = document.getElementById('surat-particles');
    const suratSparkles = document.getElementById('surat-sparkles');

    // Create floating petals for surat section
    if (suratParticles) {
        const petalEmojis = ['🌸', '🍃', '🥀', '🤍', '✨', '💫', '🌷'];
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('span');
            petal.classList.add('surat-petal');
            petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
            petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            suratParticles.appendChild(petal);
        }
    }

    // Sparkle burst function
    function createSparkleBurst() {
        if (!suratSparkles) return;
        const sparkleCount = 30;
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('surat-sparkle');
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = 80 + Math.random() * 120;
            sparkle.style.setProperty('--sx', Math.cos(angle) * distance + 'px');
            sparkle.style.setProperty('--sy', Math.sin(angle) * distance + 'px');
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
            sparkle.style.width = (Math.random() * 4 + 3) + 'px';
            sparkle.style.height = sparkle.style.width;
            suratSparkles.appendChild(sparkle);
            // Cleanup after animation
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    // Staggered text reveal function
    function revealSuratText() {
        const suratPaper = document.querySelector('.surat-paper');
        if (!suratPaper) return;

        const elements = suratPaper.querySelectorAll(
            '.surat-greeting, .surat-body, .surat-inner-divider, .surat-video-container, .surat-closing, .surat-sign'
        );

        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('surat-text-reveal');
            }, 400 + (index * 350));
        });
    }

    if (suratOpenBtn) {
        suratOpenBtn.addEventListener('click', () => {
            // Trigger sparkle burst
            createSparkleBurst();

            // Hide envelope with dramatic effect
            suratEnvelope.classList.add('hidden');

            // Show letter content after envelope animation
            setTimeout(() => {
                suratContent.classList.add('open');

                // Start staggered text reveal
                setTimeout(() => {
                    revealSuratText();
                }, 600);

                // Auto-play video when surat is opened
                if (videoKenangan) {
                    setTimeout(() => {
                        videoKenangan.play().catch(err => {
                            console.log('Video autoplay blocked:', err);
                        });
                    }, 300);
                }
            }, 600);
        });
    }
    // ===== END SURAT KENANGAN LOGIC =====

    // ===== HERO PARTICLES =====
    const heroParticlesContainer = document.getElementById('hero-particles');
    if (heroParticlesContainer) {
        const heroParticleColors = [
            'rgba(212, 165, 165, 0.5)',
            'rgba(232, 160, 176, 0.4)',
            'rgba(212, 168, 85, 0.35)',
            'rgba(255, 200, 150, 0.3)',
            'rgba(200, 180, 160, 0.4)',
        ];
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('hero-particle');
            const size = Math.random() * 6 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.background = heroParticleColors[Math.floor(Math.random() * heroParticleColors.length)];
            p.style.boxShadow = `0 0 ${size * 2}px ${p.style.background}`;
            p.style.animationDuration = (Math.random() * 10 + 8) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            heroParticlesContainer.appendChild(p);
        }
    }

    // ===== SMOOTH SCROLL FOR CTA =====
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(heroCta.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Select all sections that need animation
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // Use the viewport
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== MEMORY GAME LOGIC =====
    const memoryGameContainer = document.getElementById('memory-game');
    const moveCountElem = document.getElementById('move-count');
    const timeCountElem = document.getElementById('time-count');
    const restartBtn = document.getElementById('restart-btn');
    const gameMessage = document.getElementById('game-message');

    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let isGameActive = false;
    let timerInterval;
    let seconds = 0;
    let matchCount = 0;
    const totalPairs = 6;

    // Card data (using generated images)
    const cardImages = [
        'assets/fauzi1.jpeg',
        'assets/fauzi2.jpeg',
        'assets/fauzi3.jpeg',
        'assets/fauzi4.jpeg',
        'assets/fauzi5.jpeg',
        'assets/fauzi6.jpeg'
    ];

    function initGame() {
        if (!memoryGameContainer) return;

        // Reset state
        cards = [];
        memoryGameContainer.innerHTML = '';
        moves = 0;
        seconds = 0;
        matchCount = 0;
        hasFlippedCard = false;
        lockBoard = false;
        isGameActive = false;
        clearInterval(timerInterval);

        moveCountElem.textContent = moves;
        timeCountElem.textContent = '00:00';
        gameMessage.classList.remove('show');

        // Create pairs
        const gamePairs = [...cardImages, ...cardImages];
        // Shuffle
        gamePairs.sort(() => 0.5 - Math.random());

        // Render cards
        gamePairs.forEach(imgSrc => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.framework = imgSrc; // Identifier for matching

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            const img = document.createElement('img');
            img.src = imgSrc;
            frontFace.appendChild(img);

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.textContent = '🍂';

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.addEventListener('click', flipCard);
            memoryGameContainer.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        if (!isGameActive) {
            isGameActive = true;
            startTimer();
        }

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        incrementMoves();
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        if (isMatch) {
            disableCards();
            matchCount++;
            if (matchCount === totalPairs) {
                endGame();
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function incrementMoves() {
        moves++;
        moveCountElem.textContent = moves;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timeCountElem.textContent =
                `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    }

    function endGame() {
        clearInterval(timerInterval);
        setTimeout(() => {
            gameMessage.classList.add('show');
        }, 500);
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', initGame);
    }

    // Initialize the game
    initGame();
    // ===== END MEMORY GAME LOGIC =====

    // Audio Player Logic
    const musicBtn2 = document.getElementById('music-btn');
    const bgMusic2 = document.getElementById('bg-music');

    // Resume music if coming back from gallery
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    const popupExists = document.getElementById('popup-overlay');

    if (wasPlaying && bgMusic2 && !popupExists) {
        bgMusic2.currentTime = savedTime;
        bgMusic2.play().then(() => {
            musicBtn2.innerHTML = '<span id="music-icon">⏸️</span> Pause Music';
        }).catch(err => console.log('Resume blocked:', err));
    }

    musicBtn2.addEventListener('click', () => {
        if (!bgMusic2.paused) {
            bgMusic2.pause();
            musicBtn2.innerHTML = '<span id="music-icon">🎵</span> Play Music';
            localStorage.setItem('musicPlaying', 'false');
        } else {
            bgMusic2.play().then(() => {
                musicBtn2.innerHTML = '<span id="music-icon">⏸️</span> Pause Music';
                localStorage.setItem('musicPlaying', 'true');
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
    });

    // Save music state continuously
    setInterval(() => {
        if (bgMusic2 && !bgMusic2.paused) {
            localStorage.setItem('musicTime', bgMusic2.currentTime);
            localStorage.setItem('musicPlaying', 'true');
        }
    }, 500);

    // Save state before leaving page
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicTime', bgMusic2.currentTime);
        localStorage.setItem('musicPlaying', (!bgMusic2.paused).toString());
    });

    // ===== 3D CAROUSEL LOGIC =====
    const carouselTrack = document.getElementById('carousel-track');
    const carouselNav = document.getElementById('carousel-nav');

    if (carouselTrack && carouselNav) {
        const carouselCards = Array.from(carouselTrack.children);
        const cardCount = carouselCards.length;
        let activeIndex = Math.floor(cardCount / 2); // Start in the middle

        // Initialize Dots
        carouselCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (index === activeIndex) dot.classList.add('active');
            dot.addEventListener('click', () => updateCarousel(index));
            carouselNav.appendChild(dot);
        });

        const dots = Array.from(carouselNav.children);

        function updateCarousel(index) {
            activeIndex = index;

            // Update Cards
            carouselCards.forEach((card, i) => {
                // Reset classes
                card.className = 'carousel-card'; // Remove all modifiers

                if (i === activeIndex) {
                    card.classList.add('active');
                } else if (i === activeIndex - 1) {
                    card.classList.add('prev');
                } else if (i === activeIndex + 1) {
                    card.classList.add('next');
                } else if (i === activeIndex - 2) {
                    card.classList.add('prev-2');
                } else if (i === activeIndex + 2) {
                    card.classList.add('next-2');
                } else {
                    // Hide other cards or style them as far away
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.5)';
                    card.style.pointerEvents = 'none';
                }

                // Make card clickable to rotate to it
                if (i !== activeIndex) {
                    card.onclick = () => updateCarousel(i);
                } else {
                    card.onclick = null; // Active card needs different interaction if any
                }
            });

            // Update Dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }

        // Initial update
        updateCarousel(activeIndex);

        // ===== SWIPE & DRAG LOGIC =====
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTime = 0;
        let didMove = false;

        // Touch Events
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = startX;
            startTime = new Date().getTime();
            isDragging = true;
            didMove = false;
        }, { passive: true });

        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            didMove = true;
            // Optional: visual feedback during drag could go here
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging || !didMove) return;
            isDragging = false;
            handleSwipe(startX, currentX);
        });

        // Mouse Events
        carouselTrack.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            currentX = startX;
            startTime = new Date().getTime();
            isDragging = true;
            didMove = false;
            carouselTrack.style.cursor = 'grabbing';
            // Prevent text selection during drag
            e.preventDefault();
        });

        carouselTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
            didMove = true;
        });

        carouselTrack.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carouselTrack.style.cursor = 'grab';

            if (didMove) {
                handleSwipe(startX, currentX);
            }
        });

        carouselTrack.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                carouselTrack.style.cursor = 'grab';
            }
        });

        function handleSwipe(start, end) {
            const threshold = 50; // Minimum distance to trigger swipe
            const diff = start - end;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped Left -> Next Card
                    if (activeIndex < cardCount - 1) {
                        updateCarousel(activeIndex + 1);
                    } else {
                        updateCarousel(0); // Loop
                    }
                } else {
                    // Swiped Right -> Prev Card
                    if (activeIndex > 0) {
                        updateCarousel(activeIndex - 1);
                    } else {
                        updateCarousel(cardCount - 1); // Loop
                    }
                }
            }
        }
    }
});
