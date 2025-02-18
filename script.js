document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    let isHeaderVisible = false; // State to keep track of header visibility

    window.addEventListener('wheel', function (event) {
        // Check if scrolling down (deltaY positive) or up (deltaY negative)
        if (event.deltaY > 0 && !isHeaderVisible) {
            // Show the header if not already visible and if scrolling down
            header.style.display = 'flex';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            isHeaderVisible = true;
        } else if (event.deltaY < 0 && isHeaderVisible) {
            // Hide the header if visible and if scrolling up
            header.style.display = 'none';
            header.style.backgroundColor = 'transparent';
            isHeaderVisible = false;
        }
    });

    // Initialize header style to ensure it's correctly hidden initially
    header.style.display = 'none';
    header.style.backgroundColor = 'transparent';
    header.style.width = '100%'; // Ensure the header is full width
    header.style.position = 'fixed'; // Header should be fixed at the top
    header.style.top = '0'; // Position at the top of the viewport
    header.style.zIndex = '1000'; // High z-index to stay on top of other content
    header.style.transition = 'background-color 0.5s, display 0.5s'; // Smooth transitions for visual effects
});
