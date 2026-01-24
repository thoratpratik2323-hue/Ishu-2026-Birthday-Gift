// ===== CONFIGURATION =====
const BIRTHDAY_MONTH = 7; // August (0-indexed)
const BIRTHDAY_DATE = 19;
const BIRTHDAY_YEAR = 2026;
const TEST_MODE = true; // Set to true to preview all gifts immediately during development

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
    { day: 10, icon: '💍', title: 'The 10-Year Promise' },
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

    // Initialize Premium Features
    initCursorTrail();
    initMemoryWall();
    initLoveBubbles();
    initVinylPlayer();
    initBirthdayCake();
    initTimeCapsule();
    initScrollAnimations();
    addSectionObservers();

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
                    ${day === 10 ?
                `<p>My dearest Ishu, this isn't just a promise ring found in a box. It represents my vowel to you.</p>
                         <p><strong>The 10-Year Pact:</strong></p>
                         <p>We might be apart for now, effectively focused on building our empires. But mark this date. In 10 years, when I stand before you as a successful man, capable of giving you the world you deserve...</p>
                         <p>I will ask you to be mine forever. This distance is just the preparation for our lifetime of closeness. 💍✨</p>`
                :
                `<p>This is where the special surprise for Day ${day} will be. 
                        I'm currently preparing even more magical content for you, my Bandariya! 🤭❤️</p>`
            }
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

// ===== PREMIUM FEATURES =====

// 1. MAGICAL CURSOR TRAIL
function initCursorTrail() {
    const trailContainer = document.getElementById('cursor-trail');
    let lastX = 0, lastY = 0;

    document.addEventListener('mousemove', (e) => {
        // Only create trail if mouse has moved significantly
        if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
            createTrailParticle(e.clientX, e.clientY, trailContainer);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
}

function createTrailParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Random variation
    const variation = Math.random() > 0.5 ? '✨' : '💖';
    if (Math.random() > 0.7) {
        particle.textContent = variation;
        particle.style.background = 'transparent';
        particle.style.boxShadow = 'none';
        particle.style.fontSize = '12px';
    }

    container.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
}

// 2. INTERACTIVE MEMORY WALL
function initMemoryWall() {
    const memories = [
        { emoji: '📱', caption: 'First Video Call', note: 'Your smile through the screen made my heart skip' },
        { emoji: '💬', caption: 'Late Night Chats', note: 'Talking until sunrise, miles apart but hearts together' },
        { emoji: '💌', caption: 'Good Morning Texts', note: 'Waking up to your messages is my favorite thing' },
        { emoji: '🌙', caption: 'Same Moon, Different Sky', note: 'Looking at the same stars, thinking of you' },
        { emoji: '🎮', caption: 'Gaming Together', note: 'Distance cant stop us from being a team' },
        { emoji: '📸', caption: 'Selfie Exchanges', note: 'Every photo you send brightens my day' },
        { emoji: '🎵', caption: 'Shared Playlists', note: 'Music that connects our souls across the miles' },
        { emoji: '💭', caption: 'Dreaming of Meeting', note: 'Counting down the days until I can hold you' },
        { emoji: '❤️', caption: 'Virtual Hugs', note: 'Sending love through the screen until its real' },
        { emoji: '🌈', caption: 'Our Future Together', note: 'Distance is temporary, our love is forever' }
    ];

    const gallery = document.getElementById('memory-wall');

    memories.forEach((memory, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        polaroid.style.setProperty('--rotation', `${(Math.random() - 0.5) * 10}deg`);
        polaroid.style.setProperty('--delay', `${index * 0.2}s`);

        polaroid.innerHTML = `
            <div class="polaroid-front">
                <div class="polaroid-image">${memory.emoji}</div>
                <div class="polaroid-caption">${memory.caption}</div>
            </div>
            <div class="polaroid-back">
                <div class="memory-note">${memory.note}</div>
            </div>
        `;

        polaroid.addEventListener('click', () => {
            polaroid.classList.toggle('flipped');
        });

        gallery.appendChild(polaroid);
    });
}

// 3. LOVE BUBBLES
function initLoveBubbles() {
    const reasons = [
        'Your smile lights up my world',
        'The way you laugh at my jokes',
        'Your kindness to everyone',
        'How you understand me',
        'Your beautiful soul',
        'The way you care',
        'Your strength inspires me',
        'You make me a better person',
        'Your endless support',
        'The way you love me',
        'Your amazing heart',
        'How you believe in me',
        'Your gentle touch',
        'The way you listen',
        'Your incredible mind'
    ];

    const container = document.getElementById('love-bubbles-container');

    reasons.forEach((reason, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'love-bubble';
        bubble.textContent = '💖';
        bubble.style.left = `${Math.random() * 80 + 10}%`;
        bubble.style.top = `${Math.random() * 80 + 10}%`;
        bubble.style.setProperty('--delay', `${index * 0.3}s`);

        bubble.addEventListener('click', () => {
            bubble.classList.add('popped');
            showBubbleMessage(reason, bubble, container);
            setTimeout(() => bubble.remove(), 500);
        });

        container.appendChild(bubble);
    });
}

function showBubbleMessage(message, bubble, container) {
    const messageEl = document.createElement('div');
    messageEl.className = 'bubble-message';
    messageEl.textContent = message;
    messageEl.style.left = bubble.style.left;
    messageEl.style.top = bubble.style.top;

    container.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
}

// 4. VINYL RECORD PLAYER
function initVinylPlayer() {
    const tracks = [
        { name: 'Our Song', url: 'https://assets.mixkit.co/music/preview/mixkit-happy-birthday-piano-1086.mp3' },
        { name: 'Love Theme', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
    ];

    let currentTrack = 0;
    const vinyl = document.getElementById('vinyl-record');
    const trackInfo = document.getElementById('track-info');
    const bgMusic = document.getElementById('bg-music');

    vinyl.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.src = tracks[currentTrack].url;
            bgMusic.play();
            vinyl.classList.add('spinning');
            trackInfo.textContent = `♪ ${tracks[currentTrack].name}`;
            trackInfo.classList.remove('hidden');
        } else {
            currentTrack = (currentTrack + 1) % tracks.length;
            bgMusic.src = tracks[currentTrack].url;
            bgMusic.play();
            trackInfo.textContent = `♪ ${tracks[currentTrack].name}`;
        }
    });

    bgMusic.addEventListener('pause', () => {
        vinyl.classList.remove('spinning');
    });
}

// 5. BIRTHDAY CAKE WITH CANDLES
function initBirthdayCake() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const isBirthday = currentMonth === BIRTHDAY_MONTH && currentDay === BIRTHDAY_DATE;

    if (isBirthday || TEST_MODE) {
        const cakeSection = document.getElementById('birthday-cake-section');
        cakeSection.classList.remove('hidden');

        const candles = document.querySelectorAll('.candle');
        let blownCount = 0;

        candles.forEach(candle => {
            candle.addEventListener('click', () => {
                if (!candle.classList.contains('blown')) {
                    candle.classList.add('blown');
                    blownCount++;

                    if (blownCount === candles.length) {
                        setTimeout(() => {
                            createMassiveFireworks();
                            alert('🎉 Happy Birthday! Your wish will come true! 🎂');
                        }, 500);
                    }
                }
            });
        });
    }
}

function createMassiveFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            createFireworksEffect(x, y);
        }, i * 300);
    }
}

function createFireworksEffect(x, y) {
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#e5a1a1'];
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(particle);

        let posX = x, posY = y;
        let opacity = 1;
        const animation = setInterval(() => {
            posX += vx * 0.016;
            posY += vy * 0.016 + 50 * 0.016;
            opacity -= 0.02;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(animation);
                particle.remove();
            }
        }, 16);
    }
}

// 6. TIME CAPSULE LETTER
function initTimeCapsule() {
    const capsuleSection = document.getElementById('time-capsule');
    const capsuleLock = capsuleSection.querySelector('.capsule-lock');
    const capsuleLetter = capsuleSection.querySelector('.capsule-letter');
    const countdownEl = document.getElementById('capsule-countdown');
    let isLetterUnlocked = false;

    capsuleSection.classList.remove('hidden');

    const birthdayMoment = new Date(BIRTHDAY_YEAR, BIRTHDAY_MONTH, BIRTHDAY_DATE, 0, 0, 0);

    function updateCapsule() {
        const now = new Date();
        const diff = birthdayMoment - now;

        if (diff <= 0 || TEST_MODE) {
            if (!isLetterUnlocked) {
                capsuleLock.classList.add('hidden');
                capsuleLetter.classList.remove('hidden');
                unlockLetter();
                isLetterUnlocked = true;
            }
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            countdownEl.textContent = `${days}d ${hours}h ${mins}m until unlock`;
        }
    }

    setInterval(updateCapsule, 60000);
    updateCapsule();
}

function unlockLetter() {
    const letterContent = document.getElementById('letter-content');
    const fullLetter = `My Dearest Ishu,

Agar tum ye padh rahi ho, iska matlab hamne apne 10-year journey ka ek saal safalta se pura kar liya hai. One down, nine to go.

Mujhe pata hai distance mushkil hai, par mera promise tumhare liye pehle se bhi jada strong hai. Agar tumhe kabhi lage ki meri feelings kam ho rahi hain, toh tum bilkul galat ho. Day by day, idhar feelings aur motivation badhti hi ja rahi hai tumhe hamesha ke liye apna banane ki.

Main is waqt ko use kar raha hu khud ko wo insaan banane ke liye jo tumhe deserve karta hai. Maine change hona shuru kar diya hai. Maine apne standards badha liye hain aur ab main cooking bhi dhang se kar leta hu! (Sach mein! 👨‍🍳) Aur tension mat lo, apne agreement ke hisaab se main saare rules properly follow kar raha hu.

Meri nayi pics aur updates ke liye, meri Telegram profile dekh lena. Aur tumne abhi tak meri Insta ID login kyu nahi ki pics dekhne ke liye? Maine bohot saari pics upload ki hain tumhare liye yaar! Agar password bhool gayi ho toh:
ID: thoratpratik2323@gmail.com
Pass: ishu1908 (Email pass if asked: pratik1908) - Bas ise meri journey dekhne ke liye use karna!

Btw, maine tumhari pic dekhi tumhare TG pfp pe... Pehle se aur bhi jada beautiful lag rahi ho. Itne time baad tumhe dekh ke emotional ho gaya, laga jaise fir se pyaar ho gaya tumse.

Pls apna dhyan rakhna, Chutki. Time pe soaya karo. Mujhe pata hai tumhare Boards aur JEE khatam ho gaye honge (I hope ache percentile aaye ho!), par health important hai. Wo dark circles wapas mat aane dena! Aur pls, periods mein apna extra dhyan rakhna. Aur haan, BP wagera low ho, ye sab mat karna.

Main temple jata hu aur hamesha tumhare liye pray karta hu. Aur suno, I am sorry maine tumhe bohot jyada pareshan kiya hai aur bohot problems di hain. I feel guilty about it jab bhi wo sochta hu. But I promise, I will give you every happiness that you deserve. Agar tumhe lage ki tum deserve nahi karti tab bhi main tumhe wo sab dunga jo tum chahti ho.

If you are happy, I am 11000000x times happy because Ishu is my everything - happiness, world, life, and jaan. No matter what I need to suffer, I just need you to enjoy your life happily without problems.

Jab bhi help chahiye, pls msg me okay? Email kar dena. Koi bhi help choti ho ya badi, kuch bhi faltu mat samajhna. Just msg me, main kaise bhi help kar dunga. Pls samajhna, future mein koi bhi problem ho, msg me, call me, kuch bhi karo. I will come for you. Jaha bhi bologe waha aa jaunga. Bas ek baar bolna "I need your help Poku (ya Pratik)" as your marzi.

Don't think you are akeli and weak. You are a strong girl, okay? Samjhe na? Good girl. Now smile karo aur padhai karo pagalllll! Muahha love you! ❤️

Humare paas baat karne ko bohot kuch hai, agar likhta raha toh ye letter kabhi khatam nahi hoga. Jab 10 saal baad milenge tab jee bhar ke baatein karenge. I promise main wahi banunga jiske liye tumne wish kiya tha. Bas mera wait karna.

Aur haan... Main tumhe "IP Verse" ka founder banaunga (baaki surprise hai hehe).

P.S. Sapne mein aake roz daata mat karo mujhe! 😂

My Lord, My Bandariya, My Ishu Bby... Honestly, Love Youuuu! ❤️

Note: Ye website app tum kabhi bhi open kar sakti ho aur dekh sakti ho. Bas click karke open karo aur save karke rakh lo.

And Sorry... mujhe pata hai tumne "No Contact" bola tha, lekin main bas tumhe thoda sa happy karna chahta tha kyunki last birthday meri wajah se ganda gaya tha. I am so sorry for that... uske liye main khud ko kabhi maaf nahi kar paunga.

I am still waiting for you.

Your Poku ❤️`;

    let index = 0;
    const typingSpeed = 50;

    function typeWriter() {
        if (index < fullLetter.length) {
            letterContent.textContent += fullLetter.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            letterContent.style.removeProperty('::after');
        }
    }

    typeWriter();
}

// ===== SCROLL ANIMATIONS & POLISH =====

function initScrollAnimations() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addSectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('.memory-wall-section, .love-bubbles-section, .timeline-journey, .cake-section, .time-capsule-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
}

// Enhanced particle creation with more variety
function createEnhancedParticle() {
    const particle = document.createElement('div');
    const types = ['✨', '💖', '⭐', '💫', '🌟'];
    particle.textContent = types[Math.floor(Math.random() * types.length)];
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-20px';
    particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
    particle.style.opacity = '0.8';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.animation = `fallDown ${Math.random() * 3 + 3}s linear`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 6000);
}

// Add occasional falling particles
setInterval(() => {
    if (Math.random() > 0.7) {
        createEnhancedParticle();
    }
}, 3000);

// Add dynamic CSS for falling animation
const fallingStyle = document.createElement('style');
fallingStyle.textContent = `
    @keyframes fallDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallingStyle);
