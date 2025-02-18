document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    const logoHero = document.querySelector('.logo-hero');

    // Handle scroll events to show or hide the header
    function handleScroll() {
        const scrollY = window.scrollY;
        const activationHeight = 100; // Distance from top after which the header should appear

        if (scrollY > activationHeight) {
            header.style.display = 'flex'; // Change to 'flex' to ensure the flexbox settings take effect
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Make header visible with a background
        } else {
            header.style.display = 'none'; // Hide the header when at the top of the page
            header.style.backgroundColor = 'transparent'; // Reset background color
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Initial settings for header to ensure it's correctly initialized
    header.style.display = 'none'; // Header is initially hidden
    header.style.backgroundColor = 'transparent'; // Initial background color is transparent
    header.style.width = '100%'; // Ensure the header is full width
    header.style.position = 'fixed'; // Header should be fixed at the top
    header.style.top = '0'; // Position at the top of the viewport
    header.style.zIndex = '1000'; // High z-index to stay on top of other content
    header.style.transition = 'background-color 0.5s, display 0.5s'; // Smooth transitions for visual effects

    // Ensure the video fills the screen correctly
    const heroVideo = document.getElementById('hero-video');
    heroVideo.style.position = 'absolute';
    heroVideo.style.top = '0';
    heroVideo.style.left = '0';
    heroVideo.style.width = '100%';
    heroVideo.style.height = '100vh'; // Cover the full height of the viewport
    heroVideo.style.objectFit = 'cover'; // Cover the full area of the video tag without distorting the aspect ratio
});
