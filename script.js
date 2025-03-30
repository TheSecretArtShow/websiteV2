document.addEventListener('DOMContentLoaded', function () {
    const logoHero = document.querySelector('.logo-hero');
    const navButtons = document.querySelector('.nav-buttons');
    const heroVideo = document.getElementById('hero-video');
    const buttons = document.querySelectorAll('.nav-button');

    let isLogoSmall = false; // State to keep track of logo size
    let isNavVisible = false; // State to keep track of navigation visibility

    // Timestamps for glitch effects (in seconds)
    const glitchTimestamps = [6, 13, 14.25, 15.93, 31]; // Replace with your video timestamps
    const glitchDuration = 1; // Duration of the glitch effect in seconds

    // Function to generate random paint texture URL
    function getRandomPaintTexture() {
        const randomNum = Math.floor(Math.random() * 8) + 2; // Generates 2-9
        return `url('paint-texture ${randomNum}.svg')`;
    }

    // Add hover event listeners to buttons (desktop hover effects)
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Check if it's the Inner Circle button
            if (this.textContent.trim() === "The Inner Circle") {
                this.style.setProperty('--random-paint', 'url("paint-texture-wide.svg")');
            } else {
                this.style.setProperty('--random-paint', getRandomPaintTexture());
            }
        });
    });

    // Functions to show and hide navigation elements
    function showNav() {
        if (!isLogoSmall) {
            logoHero.classList.add('small');
            navButtons.classList.add('visible');
            isLogoSmall = true;
            isNavVisible = true;
        }
    }

    function hideNav() {
        if (isLogoSmall) {
            logoHero.classList.remove('small');
            navButtons.classList.remove('visible');
            isLogoSmall = false;
            isNavVisible = false;
        }
    }

    // Desktop: Use wheel event (only when viewport width is larger)
    window.addEventListener('wheel', function (event) {
        if (window.innerWidth > 768) {
            if (event.deltaY > 0) {
                showNav();
            } else if (event.deltaY < 0) {
                hideNav();
            }
        }
    });

    // Mobile: Use scroll event to trigger navigation changes
    window.addEventListener('scroll', function () {
        if (window.innerWidth <= 768) {
            if (window.scrollY > 10) {
                showNav();
            } else {
                hideNav();
            }
        }
    });

    // Mobile: Toggle dropdown menu on tap for navigation containers
    if (window.innerWidth <= 768) {
        const navButtonContainers = document.querySelectorAll('.nav-button-container');
        navButtonContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                // Prevent default link behavior
                e.preventDefault();
                const dropdown = container.querySelector('.dropdown');
                if (dropdown) {
                    // Toggle the dropdown's display style
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }

    // Sync glitch effects with video timestamps
    heroVideo.addEventListener('timeupdate', function () {
        const currentTime = heroVideo.currentTime;
        let isGlitchActive = false;

        glitchTimestamps.forEach((timestamp) => {
            if (currentTime >= timestamp && currentTime < timestamp + glitchDuration) {
                isGlitchActive = true;
            }
        });

        // Toggle glitch effect on each button
        buttons.forEach((button) => {
            if (isGlitchActive) {
                button.classList.add('glitch-effect');
                button.setAttribute('data-text', button.textContent);
            } else {
                button.classList.remove('glitch-effect');
            }
        });
    });
});
