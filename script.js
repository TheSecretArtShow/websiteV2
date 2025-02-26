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

        // Check if the current time is within any glitch timestamp range
        let isGlitchActive = false;
        glitchTimestamps.forEach((timestamp) => {
            if (currentTime >= timestamp && currentTime < timestamp + glitchDuration) {
                isGlitchActive = true;
            }
        });

        // Add or remove glitch effect based on the current time
        if (isGlitchActive) {
            buttons.forEach((button) => {
                button.classList.add('glitch-effect');
                button.setAttribute('data-text', button.textContent); // Add data-text for pseudo-elements
            });
        } else {
            buttons.forEach((button) => {
                button.classList.remove('glitch-effect');
            });
        }
    });
});
