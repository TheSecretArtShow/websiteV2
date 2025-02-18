document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    const logoHero = document.querySelector('.logo-hero');
    let isHeaderVisible = false; // State to keep track of header visibility

    // Initialize header style to ensure it's correctly hidden initially
    header.style.display = 'flex'; // Use flex for layout (required for transitions)
    header.style.opacity = '0'; // Start fully transparent
    header.style.transform = 'translateY(-100%)'; // Start off-screen
    header.style.backgroundColor = 'transparent'; // Start with transparent background
    header.style.width = '100%'; // Ensure the header is full width
    header.style.position = 'fixed'; // Header should be fixed at the top
    header.style.top = '0'; // Position at the top of the viewport
    header.style.zIndex = '1000'; // High z-index to stay on top of other content
    header.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease'; // Smooth transitions

    window.addEventListener('wheel', function (event) {
        // Check if scrolling down (deltaY positive) or up (deltaY negative)
        if (event.deltaY > 0 && !isHeaderVisible) {
            // Show the header with a smooth transition
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Semi-transparent black background
            isHeaderVisible = true;

            // Shrink and move the hero title to the header
            logoHero.classList.add('small');
        } else if (event.deltaY < 0 && isHeaderVisible) {
            // Hide the header with a smooth transition
            header.style.opacity = '0';
            header.style.transform = 'translateY(-100%)';
            header.style.backgroundColor = 'transparent';
            isHeaderVisible = false;

            // Restore the hero title to its original position
            logoHero.classList.remove('small');
        }
    });
});
