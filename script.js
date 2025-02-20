document.addEventListener('DOMContentLoaded', function () {
    const logoHero = document.querySelector('.logo-hero');
    const navButtons = document.querySelector('.nav-buttons');
    const heroVideo = document.getElementById('hero-video');
    const buttons = document.querySelectorAll('.nav-button');

    let isLogoSmall = false; // State to keep track of logo size
    let isNavVisible = false; // State to keep track of navigation visibility

    // Timestamps for glitch effects (in seconds)
    const glitchTimestamps = [5, 10, 15, 20]; // Replace with your video timestamps

    window.addEventListener('wheel', function (event) {
        // Check if scrolling down (deltaY positive) or up (deltaY negative)
        if (event.deltaY > 0 && !isLogoSmall) {
            // Shrink and move the hero logo to the top
            logoHero.classList.add('small');
            isLogoSmall = true;

            // Slide the navigation buttons into view
            navButtons.classList.add('visible');
            isNavVisible = true;
        } else if (event.deltaY < 0 && isLogoSmall) {
            // Restore the hero logo to its original position
            logoHero.classList.remove('small');
            isLogoSmall = false;

            // Slide the navigation buttons out of view
            navButtons.classList.remove('visible');
            isNavVisible = false;
        }
    });

    // Sync glitch effects with video timestamps
    heroVideo.addEventListener('timeupdate', function () {
        const currentTime = heroVideo.currentTime;

        // Check if the current time matches any glitch timestamp
        glitchTimestamps.forEach((timestamp) => {
            if (currentTime >= timestamp && currentTime < timestamp + 1) {
                // Add glitch effect to buttons
                buttons.forEach((button) => {
                    button.classList.add('glitch-effect');
                    button.setAttribute('data-text', button.textContent); // Add data-text for pseudo-elements
                });
            } else {
                // Remove glitch effect
                buttons.forEach((button) => {
                    button.classList.remove('glitch-effect');
                });
            }
        });
    });
});
