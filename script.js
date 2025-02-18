document.addEventListener('DOMContentLoaded', function () {
    const heroVideo = document.getElementById('hero-video');
    const heroVideoContainer = document.querySelector('.hero-video');
    const navOverlay = document.querySelector('.nav-overlay');
    const logoHero = document.querySelector('.logo-hero');
    const headerContainer = document.getElementById('header-container');

    // Initially hide the header
    headerContainer.style.display = 'none';
    logoHero.style.fontSize = '4em';
    logoHero.style.opacity = '1';
    logoHero.style.position = 'absolute';
    logoHero.style.top = '33%';
    logoHero.style.left = '50%';
    logoHero.style.transform = 'translate(-50%, -50%)';

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Adjust video size based on scroll
        if (scrollY <= window.innerHeight) {
            const scale = 1 + (scrollY / window.innerHeight);
            heroVideoContainer.style.width = `${50 * scale}%`;
            heroVideoContainer.style.height = `${50 * scale}vh`;
            heroVideo.style.transform = `scale(${scale})`;
        } else {
            heroVideoContainer.style.width = '50%';
            heroVideoContainer.style.height = '50vh';
            heroVideo.style.transform = 'scale(1)';
        }

        // Show the header and adjust the logo when scrolled down
        if (scrollY > 100) {
            headerContainer.style.display = 'block';
            logoHero.style.fontSize = '1em';
            logoHero.style.top = '15px';
            logoHero.style.left = '50%';
            logoHero.style.transform = 'translate(-50%, 0)';
        } else {
            headerContainer.style.display = 'none';
            logoHero.style.fontSize = '4em';
            logoHero.style.top = '33%';
            logoHero.style.left = '50%';
            logoHero.style.transform = 'translate(-50%, -50%)';
        }
    });

    const stars = document.querySelectorAll('.star');
    let lastX = 0, lastY = 0;
    let moveX = true;

    document.addEventListener('mousemove', (e) => {
        const gridSize = 20;
        let targetX = Math.floor(e.clientX / gridSize) * gridSize;
        let targetY = Math.floor(e.clientY / gridSize) * gridSize;

        if (moveX) {
            lastX = targetX;
        } else {
            lastY = targetY;
        }
        moveX = !moveX;

        stars.forEach((star, index) => {
            const delay = index * 200 * 1.7; 
            setTimeout(() => {
                const rect = star.getBoundingClientRect();
                const currentX = rect.left + rect.width / 2;
                const currentY = rect.top + rect.height / 2;

                if (index >= stars.length - 4) {
                    createTrail(currentX, currentY, lastX, lastY, delay);
                }

                star.style.transform = `translate(${lastX}px, ${lastY}px)`;
            }, delay);
        });
    });

    function createTrail(startX, startY, endX, endY, starDelay) {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        document.body.appendChild(trail);
        trail.style.left = `${startX}px`;
        trail.style.top = `${startY}px`;
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
        const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        trail.style.width = `${distance}px`;
        trail.style.transform = `rotate(${angle}deg)`;

        setTimeout(() => {
            trail.classList.add('fade');
            setTimeout(() => {
                trail.remove();
            }, 500);
        }, 10);
    }

    const popups = [
        { message: "For the few, not the many. Are you among the few?", buttonTextYes: "I'm one of one", buttonTextNo: "No" },
        // Additional popup messages
    ];

    function showRandomPopup() {
        const randomPopup = popups[Math.floor(Math.random() * popups.length)];
        const popupTitle = document.querySelector('.popup-content h2');
        const popupButtonYes = document.getElementById('popup-button-yes');
        const popupButtonNo = document.getElementById('popup-button-no');

        if (popupTitle && popupButtonYes && popupButtonNo) {
            popupTitle.textContent = randomPopup.message;
            popupButtonYes.textContent = randomPopup.buttonTextYes;
            popupButtonNo.textContent = randomPopup.buttonTextNo;
        }
    }

    showRandomPopup();

    const popupYesButton = document.getElementById('popup-button-yes');
    const popupNoButton = document.getElementById('popup-button-no');

    if (popupYesButton) {
        popupYesButton.addEventListener('click', function () {
            const popupOverlay = document.getElementById('popup-overlay');
            if (popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    if (popupNoButton) {
        popupNoButton.addEventListener('click', function () {
            window.location.href = 'https://www.gap.com';
        });
    }

    const productCarousel = document.querySelector('.product-carousel');

    if (productCarousel) {
        function resetScroll() {
            productCarousel.style.transition = 'none';
            productCarousel.style.transform = 'translateX(0)';
            productCarousel.append(...productCarousel.children);
            productCarousel.offsetHeight; // Trigger reflow to reset animation
            productCarousel.style.transition = 'transform 30s linear';
            productCarousel.style.transform = `translateX(-${productCarousel.scrollWidth}px)`;
        }

        productCarousel.addEventListener('animationiteration', resetScroll);
        resetScroll();
    }
});
