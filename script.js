document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    const logoHero = document.querySelector('.logo-hero');
    const heroSection = document.querySelector('.hero-image');
    const heroVideo = document.getElementById('hero-video');

    // Function to handle scrolling effects
    function handleScroll() {
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        // Check if the page is scrolled more than 100 pixels
        if (scrollY > 100) {
            header.style.display = 'block'; // Show the header
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Add background color to header
            logoHero.style.fontSize = '1em'; // Reduce the font size of the logo
            logoHero.style.top = `${headerHeight}px`; // Position logo within the visible header
            logoHero.style.transform = 'translate(-50%, -50%)';
        } else {
            header.style.display = 'none'; // Hide the header
            logoHero.style.fontSize = '4em'; // Return the logo to its original size
            logoHero.style.top = '50%'; // Center the logo vertically
            logoHero.style.transform = 'translate(-50%, -50%)';
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Initial setup for hero video to cover the viewport without scrolling
    heroVideo.style.width = '100vw';
    heroVideo.style.height = '100vh';
    heroSection.style.height = '100vh'; // Ensure the hero section takes full viewport height
    logoHero.style.position = 'absolute';
    logoHero.style.left = '50%';
    logoHero.style.transform = 'translate(-50%, -50%)';

    // Ensure the header is prepared to handle transition effects
    header.style.position = 'fixed';
    header.style.width = '100%';
    header.style.transition = 'background-color 0.5s ease, top 0.5s ease';

    // Optional: Reset scroll position on page load to top
    window.scrollTo(0, 0);
});
