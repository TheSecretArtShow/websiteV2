document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header-container');
    let isHeaderVisible = false; // State to keep track of header visibility

    window.addEventListener('wheel', function (event) {
        // Check if scrolling down (deltaY positive) or up (deltaY negative)
        if (event.deltaY > 0 && !isHeaderVisible) {
            // Show the header with a smooth transition
            header.classList.add('visible');
            isHeaderVisible = true;
        } else if (event.deltaY < 0 && isHeaderVisible) {
            // Hide the header with a smooth transition
            header.classList.remove('visible');
            isHeaderVisible = false;
        }
    });

    // Initialize header style to ensure it's correctly hidden initially
    header.classList.remove('visible'); // Start hidden
});
