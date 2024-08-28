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

    document.addEventListener('mousemove', (e) => {
        const gridSize = 20;
        let targetX = Math.floor(e.clientX / gridSize) * gridSize;
        let targetY = Math.floor(e.clientY / gridSize) * gridSize;

        if (moveX) {
            lastX = targetX;
        } else {
            lastY = targetY;
        }
        moveX = !moveX;

        if (shopNowButton) {
            const shopRect = shopNowButton.getBoundingClientRect();
            const isInShopNowButton = e.clientX >= shopRect.left && e.clientX <= shopRect.right && e.clientY >= shopRect.top && e.clientY <= shopRect.bottom;

            let isInProduct = false;
            products.forEach(product => {
                const productRect = product.getBoundingClientRect();
                if (e.clientX >= productRect.left && e.clientX <= productRect.right && e.clientY >= productRect.top && e.clientY <= productRect.bottom) {
                    isInProduct = true;
                }
            });

            squares.forEach((square, index) => {
                const delay = index * 250;
                setTimeout(() => {
                    square.style.transform = `translate(${lastX}px, ${lastY}px)`;
                    if (isInShopNowButton || isInProduct) {
                        square.style.backgroundColor = 'blue';
                    } else if ((e.clientX >= shopRect.left - gridSize && e.clientX <= shopRect.right + gridSize && e.clientY >= shopRect.top - gridSize && e.clientY <= shopRect.bottom + gridSize) || isInProduct) {
                        square.style.backgroundColor = 'purple';
                    } else {
                        square.style.backgroundColor = 'red';
                    }
                }, delay);
            });
        }
    });

    // Handle Random Pop-up
    const popups = [
        { message: "For the few, not the many. Are you among the few?", buttonTextYes: "I'm one of one", buttonTextNo: "No" },
        { message: "Access is restricted for the ordinary. Are you extraordinary?", buttonTextYes: "I am more", buttonTextNo: "No" },
        { message: "This store is off limits to the general public. Are you different?", buttonTextYes: "I am one of one", buttonTextNo: "No" },
        { message: "This content is for insiders only. Are you really on the inside?", buttonTextYes: "I'm in", buttonTextNo: "No" },
        { message: "The doors to this content are closed to most. Should they open for you?", buttonTextYes: "I'm one of one", buttonTextNo: "No" },
        { message: "This content is for those who know. Do you belong?", buttonTextYes: "I belong", buttonTextNo: "No" },
        { message: "This content is reserved for those who stand out. Do you?", buttonTextYes: "I am one of one", buttonTextNo: "No" }
    ];

    function showRandomPopup() {
        const randomPopup = popups[Math.floor(Math.random() * popups.length)];
        const popupTitle = document.querySelector('.popup-content h2');
        const popupButtonYes = document.getElementById('popup-button-yes');
        const popupButtonNo = document.getElementById('popup-button-no');

        if (popupTitle && popupButtonYes && popupButtonNo) {
            popupTitle.textContent = randomPopup.message;
            popupButtonYes.textContent = randomPopup.buttonTextYes;
            popupButtonNo.textContent = randomPopup.buttonTextNo;
        }
    }

    // Display a random pop-up when the page loads
    showRandomPopup();

    const popupYesButton = document.getElementById('popup-button-yes');
    const popupNoButton = document.getElementById('popup-button-no');

    if (popupYesButton) {
        popupYesButton.addEventListener('click', function () {
            const popupOverlay = document.getElementById('popup-overlay');
            if (popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    if (popupNoButton) {
        popupNoButton.addEventListener('click', function () {
            window.location.href = 'https://www.gap.com';
        });
    }

    // Handle Email Popup
    const emailPopup = document.getElementById('email-popup');
    const waitlistButton = document.getElementById('waitlist-button');
    const insiderButton = document.getElementById('insider-button');
    const resumeButton = document.getElementById('resume-browsing-button');
    const waitlistEmailInput = document.getElementById('waitlist-email');
    const insiderEmailInput = document.getElementById('insider-email');
    const submitWaitlistButton = document.getElementById('submit-waitlist');
    const submitInsiderButton = document.getElementById('submit-insider');

    function sendEmailToServer(email, listType) {
    fetch('https://art-show-signup-rh2gqoobqa-uw.a.run.app/submit-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, listType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Optionally handle error case
            console.error(data.error);
        } else {
            // Create a more seamless notification, such as a toast message
            showNotification(`Email ${email} added to ${listType} list.`);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}


    if (waitlistButton) {
        waitlistButton.addEventListener('click', function () {
            if (waitlistEmailInput) {
                waitlistEmailInput.style.display = waitlistEmailInput.style.display === 'none' ? 'block' : 'none';
                submitWaitlistButton.style.display = 'block';
            }
        });
    }

    if (submitWaitlistButton) {
        submitWaitlistButton.addEventListener('click', function () {
            const email = waitlistEmailInput.value;
            if (email) {
                sendEmailToServer(email, 'Waitlist');
            }
        });
    }

    if (insiderButton) {
        insiderButton.addEventListener('click', function () {
            if (insiderEmailInput) {
                insiderEmailInput.style.display = insiderEmailInput.style.display === 'none' ? 'block' : 'none';
                submitInsiderButton.style.display = 'block';
            }
        });
    }

    if (submitInsiderButton) {
        submitInsiderButton.addEventListener('click', function () {
            const email = insiderEmailInput.value;
            if (email) {
                sendEmailToServer(email, 'Insider Alerts');
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
});
