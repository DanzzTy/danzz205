document.addEventListener('DOMContentLoaded', () => {
            // === SISTEM LOGIN + FILTER + MUSIK BACKGROUND ===
            const loginOverlay = document.getElementById('login-overlay');
            const usernameInput = document.getElementById('username-input');
            const loginBtn = document.getElementById('login-btn');
            const usernameDisplay = document.getElementById('username-display');
            const logoutBtn = document.getElementById('logout-btn');
            const errorMessage = document.getElementById('error-message');
            const warningMessage = document.getElementById('warning-message');

            const bgMusic = document.getElementById('bg-music');
            const musicToggle = document.getElementById('music-toggle');
            const musicIcon = document.getElementById('music-icon');

            let isMuted = false;

            // Toggle mute/unmute
            musicToggle.addEventListener('click', () => {
                if (bgMusic.paused) {
                    bgMusic.play();
                    musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
                } else {
                    bgMusic.pause();
                    musicIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
                }
            });

            const badWords = [
                'kontol', 'memek', 'puki', 'pepek', 'anjing', 'asu', 'bangsat', 'babi', 
                'bajingan', 'brengsek', 'jancuk', 'tai', 'goblok', 'tolol', 'ngentot', 
                'fuck', 'shit', 'bitch'
            ];

            const savedUsername = localStorage.getItem('kipasUsername');
            if (savedUsername) {
                usernameDisplay.textContent = savedUsername;
                logoutBtn.classList.remove('hidden');
                loginOverlay.classList.add('hidden');
                bgMusic.volume = 0.3;
                bgMusic.play();
            }

            function checkBadWord(name) {
                const lowerName = name.toLowerCase();
                return badWords.some(word => lowerName.includes(word));
            }

            function checkNumber(name) {
                return /\d/.test(name);
            }

            usernameInput.addEventListener('input', () => {
                const name = usernameInput.value.trim();
                errorMessage.style.display = 'none';
                warningMessage.style.display = 'none';

                if (name && checkNumber(name)) {
                    warningMessage.style.display = 'block';
                }
            });

            loginBtn.addEventListener('click', () => {
                let name = usernameInput.value.trim();
                errorMessage.style.display = 'none';
                warningMessage.style.display = 'none';

                if (name === '') name = 'Player';

                if (checkBadWord(name)) {
                    errorMessage.style.display = 'block';
                    usernameInput.value = '';
                    usernameInput.focus();
                    return;
                }

                if (checkNumber(name)) {
                    warningMessage.style.display = 'block';
                    usernameInput.focus();
                    return;
                }

                // LOGIN BERHASIL → PLAY MUSIK
                localStorage.setItem('kipasUsername', name);
                usernameDisplay.textContent = name;
                logoutBtn.classList.remove('hidden');
                loginOverlay.style.opacity = '0';
                setTimeout(() => {
                    loginOverlay.classList.add('hidden');
                    bgMusic.volume = 0.3;
                    bgMusic.play().catch(e => console.log("Musik diblokir browser:", e));
                }, 500);
            });

            usernameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') loginBtn.click();
            });

            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('kipasUsername');
                bgMusic.pause();
                location.reload();
            });

            // Mobile menu, partikel, animasi count-up tetap sama seperti kodingan kamu
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileBtn && mobileMenu) {
                mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            }

            const particlesContainer = document.getElementById('particles-container');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 5 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}vw`;
                const duration = Math.random() * 10 + 10;
                particle.style.animation = `fall ${duration}s linear infinite`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                particle.style.opacity = Math.random() * 0.6 + 0.3;
                particlesContainer.appendChild(particle);
            }

            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fall {
                    0% { transform: translateY(-100vh) translateX(0); }
                    100% { transform: translateY(100vh) translateX(100px); }
                }
            `;
            document.head.appendChild(style);

            function animateCountUp(element, target) {
                let count = 0;
                const increment = target / 200;
                const interval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(interval);
                    }
                    element.textContent = Math.floor(count).toLocaleString('en-US');
                }, 20);
            }

            const countElements = document.querySelectorAll('.animate-count');
            countElements.forEach(el => {
                const target = parseInt(el.getAttribute('data-target')) || 0;
                animateCountUp(el, target);
            });
        });
