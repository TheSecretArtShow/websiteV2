document.addEventListener('DOMContentLoaded', function () {
    // Existing functionality for the hero video and nav overlay
    const heroVideo = document.getElementById('hero-video');
    const heroVideoContainer = document.querySelector('.hero-video');
    const navOverlay = document.querySelector('.nav-overlay');

    // Additional variables for the logo transition
    const logoHero = document.querySelector('.logo-hero');
    const headerContainer = document.getElementById('header-container');

    // Set initial visibility and styles
    headerContainer.style.display = 'none'; // Hide the header on initial load
    logoHero.style.fontSize = '4em'; // Large font size initially
    logoHero.style.opacity = '1'; // Fully visible
    logoHero.style.position = 'absolute';
    logoHero.style.top = '33%'; // Positioned two-thirds down the hero video
    logoHero.style.left = '50%';
    logoHero.style.transform = 'translate(-50%, -50%)';

    // Handle scroll for video resizing and additional functionalities
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

        // Dynamic appearance of the header and resizing of the logo
        if (scrollY > 100) {
            headerContainer.style.display = 'block';
            logoHero.style.fontSize = '1em'; // Smaller font size on scroll
            logoHero.style.top = '15px';
            logoHero.style.left = '50%';
            logoHero.style.transform = 'translate(-50%, 0)';
        } else {
            headerContainer.style.display = 'none';
            logoHero.style.fontSize = '4em'; // Larger font size when scrolled back to top
            logoHero.style.top = '33%'; // Reset position
            logoHero.style.left = '50%';
            logoHero.style.transform = 'translate(-50%, -50%)';
        }

        // Show/hide nav buttons based on scroll (existing functionality)
        if (scrollY > window.innerHeight * 0.5) {
            navOverlay.style.bottom = '0';
        } else {
            navOverlay.style.bottom = '-100px';
        }
    });

    // Existing star trail cursor functionality and random popup functionality here
    // Please ensure this section remains unchanged unless it directly affects the new functionalities

    // Star Trail Cursor Functionality
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
            const delay = index * 200 * 1.7; // Increased delay to 1.7x for all non-main stars
            setTimeout(() => {
                const rect = star.getBoundingClientRect();
                const currentX = rect.left + rect.width / 2;
                const currentY = rect.top + rect.height / 2;

                // Only create trails for the last 4 stars
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

        // Position the trail at the starting point of the star's movement
        trail.style.left = `${startX}px`;
        trail.style.top = `${startY}px`;

        // Calculate angle and distance based on movement direction
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
        const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

        // Set the trail's appearance to match the star's movement
        trail.style.width = `${distance}px`;
        trail.style.transform = `rotate(${angle}deg)`;

        // Fade out the trail after it is positioned
        setTimeout(() => {
            trail.classList.add('fade');
            setTimeout(() => {
                trail.remove();
            }, 500); // Duration for the trail to disappear
        }, 10);
    }

    // Random Popup Functionality
    const popups = [
        { message: "For the few, not the many. Are you among the few?", buttonTextYes: "I'm one of one", buttonTextNo: "No" },
        { message: "Access is restricted for the ordinary. Are you extraordinary?", buttonTextYes: "I am more", buttonTextNo: "No" },
        { message: "This store is off limits to the general public. Are you different?", buttonTextYes: "I am one of one", buttonTextNo: "No" },
        { message: "This content is for insiders only. Are you really on the inside?", buttonTextYes: "I'm in", buttonTextNo: "No" },
        { message: "The doors to this content are closed to most. Should they open for you?", buttonTextYes: "I'm one of one", buttonTextNo: "No" },
        { message: "This content is for those who know. Do you belong?", buttonTextYes: "I belong", buttonTextNo: "No" },
        { message: "This content is reserved for those who stand out. Do you?", buttonTextYes: "I am one of one", buttonTextNo: "No" }
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

    // Display a random pop-up when the page loads
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

    // Product Carousel Functionality
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
