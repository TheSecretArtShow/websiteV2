document.addEventListener('DOMContentLoaded', function () {
    const logoHero = document.querySelector('.logo-hero');
    const navButtons = document.querySelector('.nav-buttons');
    let isLogoSmall = false; // State to keep track of logo size
    let isNavVisible = false; // State to keep track of navigation visibility

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
});
