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

    function sendEmailToServer(email, listType, confirmationElement) {
        fetch('https://art-show-signup-rh2gqoobqa-uw.a.run.app/submit-email', { // Replace with your Cloud Run URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, listType: listType })
        })
            .then(response => response.json())
            .then(data => {
                showLuxuriousConfirmation(confirmationElement);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }

    function showLuxuriousConfirmation(parentElement) {
        // Clear existing content
        parentElement.innerHTML = '';

        // Create the luxurious confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.style.padding = '20px';
        confirmationMessage.style.background = 'linear-gradient(135deg, gold, #e5c100, #f5e1b9)';
        confirmationMessage.style.color = '#2a2a2a';
        confirmationMessage.style.fontFamily = "'Garamond', serif"; // Classic luxury font style
        confirmationMessage.style.fontWeight = 'bold';
        confirmationMessage.style.borderRadius = '12px';
        confirmationMessage.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        confirmationMessage.style.animation = 'fadeIn 1.5s cubic-bezier(0.25, 1.25, 0.5, 1) forwards, glowPulse 2s infinite alternate';
        confirmationMessage.style.textAlign = 'center';
        confirmationMessage.textContent = 'Thank you! You are on the list.';

        // Optional: Add a glowing border effect
        confirmationMessage.style.border = '1px solid transparent';
        confirmationMessage.style.transition = 'border 0.5s ease';
        confirmationMessage.style.borderImage = 'linear-gradient(45deg, gold, #f5e1b9) 1';
        confirmationMessage.style.borderImageSlice = 1;

        // Optional: Pulse effect to mimic light reflection seen in luxury branding
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes glowPulse {
                from { box-shadow: 0 0 15px rgba(255, 223, 0, 0.5); }
                to { box-shadow: 0 0 30px rgba(255, 215, 0, 0.7); }
            }
        `;
        document.head.appendChild(style);

        // Append to parent
        parentElement.appendChild(confirmationMessage);
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
                sendEmailToServer(email, 'Waitlist', waitlistButton.parentElement);
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
                sendEmailToServer(email, 'Insider Alerts', insiderButton.parentElement);
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
