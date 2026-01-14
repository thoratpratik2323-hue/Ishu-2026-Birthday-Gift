// ===== CONFIGURATION =====
const BIRTHDAY_MONTH = 7; // August (0-indexed)
const BIRTHDAY_DATE = 19;
const BIRTHDAY_YEAR = 2026;
const TEST_MODE = false; // Set to true to preview all gifts immediately during development

// ===== STATE =====
let isMusicPlaying = false;
const gifts = [
    { day: 1, icon: '🌟', title: 'A New Beginning' },
    { day: 2, icon: '🤝', title: 'Strength in US' },
    { day: 3, icon: '🦋', title: 'Butterfly Effect' },
    { day: 4, icon: '🎭', title: 'Your Laugh' },
    { day: 5, icon: '🕯️', title: 'Inner Glow' },
    { day: 6, icon: '📔', title: 'Our Story' },
    { day: 7, icon: '🏡', title: 'Safe Haven' },
    { day: 8, icon: '💆', title: 'Solace' },
    { day: 9, icon: '🏰', title: 'Memory Castle' },
    { day: 10, icon: '💍', title: 'The Promise' },
    { day: 11, icon: '🎨', title: 'Beautiful Chaos' },
    { day: 12, icon: '🏥', title: 'Healer Ishu' },
    { day: 13, icon: '🌌', title: 'Infinite' },
    { day: 14, icon: '💝', title: 'Eternal Val' },
    { day: 15, icon: '⏳', title: 'Timeless' },
    { day: 16, icon: '👵', title: 'Golden Years' },
    { day: 17, icon: '🌈', title: 'Miracle' },
    { day: 18, icon: '🇰🇷', title: 'Sarange' },
    { day: 19, icon: '🎂', title: 'The Big Day' }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const unlockBtn = document.getElementById('unlock-btn');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    // Intro Transition
    unlockBtn.addEventListener('click', () => {
        startExperience();
    });

    // Music Player
    musicToggle.addEventListener('click', () => {
        toggleMusic(bgMusic, musicToggle);
    });

    renderTimeline();
    initCountdown();
    createParticles();

    // Modal Closure
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.id === 'gift-modal') closeModal();
    });
}

// ===== CORE FUNCTIONS =====

function startExperience() {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    intro.classList.add('fade-out');

    setTimeout(() => {
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in-content');

        // Auto-play music when starting
        if (!isMusicPlaying) {
            toggleMusic(bgMusic, musicToggle);
        }
    }, 800);
}

function toggleMusic(audio, button) {
    if (isMusicPlaying) {
        audio.pause();
        button.innerHTML = '🎵';
    } else {
        audio.play().catch(e => console.log("Music blocked by browser"));
        button.innerHTML = '🎶';
    }
    isMusicPlaying = !isMusicPlaying;
}

function renderTimeline() {
    const container = document.getElementById('gift-journey');
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();

    const isBirthdayMonth = currentMonth === BIRTHDAY_MONTH;

    gifts.forEach(gift => {
        const giftNode = document.createElement('div');
        giftNode.className = 'gift-node';

        const isUnlocked = TEST_MODE || (isBirthdayMonth && gift.day <= currentDay);

        giftNode.innerHTML = `
            <div class="gift-info">
                <span class="day-label">DAY ${gift.day}</span>
                <h3 class="gift-title">${isUnlocked ? gift.title : '???'}</h3>
            </div>
            <div class="gift-sphere ${isUnlocked ? '' : 'locked'}">
                ${isUnlocked ? gift.icon : '🔒'}
            </div>
        `;

        if (isUnlocked) {
            giftNode.querySelector('.gift-sphere').addEventListener('click', () => {
                openGift(gift.day);
            });
        }

        container.appendChild(giftNode);
    });
}

function openGift(day) {
    const modal = document.getElementById('gift-modal');
    const modalBody = document.getElementById('modal-body');
    const gift = gifts.find(g => g.day === day);

    modal.classList.remove('hidden');
    modalBody.innerHTML = `
        <div class="parcel-opening-anim">
            <span class="opening-icon">📦</span>
            <p>Unwrapping Day ${day}...</p>
        </div>
    `;

    // Simulate "opening" animation
    setTimeout(() => {
        modalBody.innerHTML = `
            <div class="gift-content-reveal">
                <span class="revealed-emoji">${gift.icon}</span>
                <h2 class="reveal-title">Day ${day}: ${gift.title}</h2>
                <div class="content-body">
                    <p>This is where the special surprise for Day ${day} will be. 
                    I'm currently preparing even more magical content for you, my Bandariya! 🤭❤️</p>
                    <div class="media-placeholder">✨ Special Memory Loading... ✨</div>
                </div>
                <button onclick="closeModal()" class="close-reveal-btn">Keep Journeying</button>
            </div>
        `;
    }, 1500);
}

function closeModal() {
    const modal = document.getElementById('gift-modal');
    modal.classList.add('hidden');
}

function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bokeh-particle';

        const size = Math.random() * 50 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        particle.style.background = Math.random() > 0.5 ? 'var(--rose-gold)' : 'var(--vivid-pink)';
        particle.style.opacity = Math.random() * 0.2;
        particle.style.filter = 'blur(10px)';

        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }
}

function initCountdown() {
    const container = document.getElementById('countdown');
    const target = new Date(BIRTHDAY_YEAR, BIRTHDAY_MONTH, BIRTHDAY_DATE);

    function update() {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            container.innerHTML = "It's your day, Ishu! ❤️";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        container.innerHTML = `
            <div class="cd-item"><span>${d}</span><small>DAYS</small></div>
            <div class="cd-item"><span>${h}</span><small>HOURS</small></div>
            <div class="cd-item"><span>${m}</span><small>MINS</small></div>
            <div class="cd-item"><span>${s}</span><small>SECS</small></div>
        `;
    }

    setInterval(update, 1000);
    update();
}

// Add CSS for countdown items dynamically
const style = document.createElement('style');
style.textContent = `
    .premium-countdown {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
    }
    .cd-item {
        text-align: center;
        background: var(--glass);
        padding: 20px 25px;
        border-radius: 15px;
        border: 1px solid var(--glass-border);
        min-width: 100px;
    }
    .cd-item span {
        display: block;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--rose-gold);
    }
    .cd-item small {
        font-size: 0.7rem;
        letter-spacing: 2px;
        opacity: 0.6;
    }
    .fade-in-content {
        animation: contentFadeIn 1s forwards;
    }
    @keyframes contentFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
