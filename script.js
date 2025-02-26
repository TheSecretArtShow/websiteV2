document.addEventListener('DOMContentLoaded', function () {
    const logoHero = document.querySelector('.logo-hero');
    const navButtons = document.querySelector('.nav-buttons');
    const heroVideo = document.getElementById('hero-video');
    const buttons = document.querySelectorAll('.nav-button');

    let isLogoSmall = false;
    let isNavVisible = false;

    // Glitch timestamps (update these to match your video)
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

    // Glitch effect handler
    heroVideo.addEventListener('timeupdate', function () {
        const currentTime = heroVideo.currentTime;
        let isGlitchActive = false;

        glitchTimestamps.forEach((timestamp) => {
            if (currentTime >= timestamp && currentTime < timestamp + glitchDuration) {
                isGlitchActive = true;
            }
        });

        buttons.forEach((button) => {
            const paint = button.querySelector('.glitch-paint');
            
            if (isGlitchActive) {
                button.classList.add('glitch-effect');
                if (paint) {
                    paint.style.transition = 'none';
                    paint.style.width = '200px';
                    paint.style.height = '200px';
                }
            } else {
                button.classList.remove('glitch-effect');
                if (paint) {
                    paint.style.transition = 'all 0.3s ease';
                    paint.style.width = '0';
                    paint.style.height = '0';
                }
            }
        });
    });
});
