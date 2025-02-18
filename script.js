document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    const logoHero = document.querySelector('.logo-hero');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 100) { // Adjust if needed based on your design
            header.style.display = 'flex'; // Make sure it's flex to keep your layout
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Add a background color for visibility
        } else {
            header.style.display = 'none'; // Hide the header when at the top of the page
            header.style.backgroundColor = 'transparent'; // Reset background
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Initialize header style
    header.style.display = 'none'; // Ensure header is initially hidden
    header.style.transition = 'all 0.5s ease'; // Smooth transition for all properties
});
