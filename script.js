document.addEventListener('DOMContentLoaded', function () {
    const squares = document.querySelectorAll('.square');
    const shopNowButton = document.getElementById('shop-now');
    const products = document.querySelectorAll('.product');
    let lastX = 0, lastY = 0;
    let moveX = true;

    const productCarousel = document.querySelector('.product-carousel');

    if (productCarousel) {
        function resetScroll() {
            productCarousel.style.transition = 'none';
            productCarousel.style.transform = 'translateX(0)';
            productCarousel.append(...productCarousel.children);
            productCarousel.offsetHeight; // Trigger reflow to reset animation
            productCarousel.style.transition = 'transform 30s linear';
            productCarousel.style.transform = `translateX(-${productCarousel.scrollWidth}px)`;
        }

        productCarousel.addEventListener('animationiteration', resetScroll);
        resetScroll();
    }

    // Existing mousemove and pop-up code remains unchanged...

    // Handle Email Popup
    const emailPopup = document.getElementById('email-popup');
    const waitlistButton = document.getElementById('waitlist-button');
    const insiderButton = document.getElementById('insider-button');
    const resumeButton = document.getElementById('resume-browsing-button');

    if (waitlistButton) {
        waitlistButton.addEventListener('click', function () {
            const emailInput = document.getElementById('waitlist-email');
            if (emailInput) {
                emailInput.style.display = emailInput.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    if (insiderButton) {
        insiderButton.addEventListener('click', function () {
            const emailInput = document.getElementById('insider-email');
            if (emailInput) {
                emailInput.style.display = emailInput.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    if (resumeButton) {
        resumeButton.addEventListener('click', function () {
            if (emailPopup) {
                emailPopup.style.display = 'none';
            }
        });
    }

    // Function to show the popup when a "View Details" button is clicked
    function showEmailPopup() {
        if (emailPopup) {
            emailPopup.style.display = 'flex';
        }
    }

    // Attach the popup function to each "View Details" button
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    if (viewDetailsButtons.length > 0) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', showEmailPopup);
        });
    }

    // Send Email to Server function and handle response to show confirmation animation
    function sendEmailToServer(email, listType, buttonElement) {
        fetch('https://art-show-signup-rh2gqoobqa-uw.a.run.app/submit-email', {  // Replace with your actual URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, listType })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                showLuxuriousConfirmation(buttonElement);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function showLuxuriousConfirmation(buttonElement) {
        buttonElement.style.opacity = 0; // Fade out the button
        setTimeout(() => {
            buttonElement.style.display = 'none'; // Hide the button after fade out
            const confirmationMessage = document.createElement('div');
            confirmationMessage.className = 'luxurious-confirmation';
            confirmationMessage.innerHTML = '<span>Thank you! You are on the list.</span>';
            buttonElement.parentNode.appendChild(confirmationMessage); // Add confirmation message

            // Trigger the animation
            setTimeout(() => {
                confirmationMessage.classList.add('animate');
            }, 100); 
        }, 300);
    }

    // Bind email submission to buttons
    document.getElementById('submit-waitlist').addEventListener('click', function () {
        const emailInput = document.getElementById('waitlist-email');
        if (emailInput.value) {
            sendEmailToServer(emailInput.value, 'Waitlist', waitlistButton);
        }
    });

    document.getElementById('submit-insider').addEventListener('click', function () {
        const emailInput = document.getElementById('insider-email');
        if (emailInput.value) {
            sendEmailToServer(emailInput.value, 'Insider alerts', insiderButton);
        }
    });
});
