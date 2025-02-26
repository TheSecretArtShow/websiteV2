document.addEventListener('DOMContentLoaded', function () {
    const logoHero = document.querySelector('.logo-hero');
    const navButtons = document.querySelector('.nav-buttons');
    const heroVideo = document.getElementById('hero-video');
    const buttons = document.querySelectorAll('.nav-button');

    let isLogoSmall = false;
    let isNavVisible = false;

    const glitchTimestamps = [6, 13, 14.25, 15.93, 31];
    const glitchDuration = 1;

    window.addEventListener('wheel', function (event) {
        if (event.deltaY > 0 && !isLogoSmall) {
            logoHero.classList.add('small');
            isLogoSmall = true;
            navButtons.classList.add('visible');
            isNavVisible = true;
        } else if (event.deltaY < 0 && isLogoSmall) {
            logoHero.classList.remove('small');
            isLogoSmall = false;
            navButtons.classList.remove('visible');
            isNavVisible = false;
        }
    });

    heroVideo.addEventListener('timeupdate', function () {
        const currentTime = heroVideo.currentTime;
        let isGlitchActive = false;
        
        glitchTimestamps.forEach((timestamp) => {
            if (currentTime >= timestamp && currentTime < timestamp + glitchDuration) {
                isGlitchActive = true;
            }
        });

        if (isGlitchActive) {
            buttons.forEach((button) => {
                button.classList.add('glitch-effect');
            });
        } else {
            buttons.forEach((button) => {
                button.classList.remove('glitch-effect');
            });
        }
    });
});
