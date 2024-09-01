document.addEventListener('DOMContentLoaded', function () {
    // Define the sendEmailToServer function near the start
    function sendEmailToServer(email, listType, name, confirmationElement) {
        fetch('https://art-show-signup-rh2gqoobqa-uw.a.run.app/submit-email', { // Replace with your Cloud Run URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, listType: listType, name: name })
        })
        .then(response => response.json())
        .then(data => {
            if (listType === 'Waitlist') {
                setWaitlistConfirmationDisplayed(name); // Mark that the first confirmation was shown
                showLuxuriousConfirmationInPopup(confirmationElement, name, true);
            } else if (listType === 'Insider Alerts') {
                setInsiderAlertSignedUp();
                showInsiderAlertConfirmation(confirmationElement); // Show confirmation styled like a box
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    // General setup
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

    // Mouse movement effect
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

    // Email Popup Functionality
    const emailPopup = document.getElementById('email-popup');
    const popupContent = document.querySelector('.email-popup-content');

    // Track waitlist status per product
    function getWaitlistStatus(productName) {
        return localStorage.getItem(`waitlisted_${productName}`) === 'true';
    }

    function setWaitlistStatus(productName) {
        localStorage.setItem(`waitlisted_${productName}`, 'true');
    }

    // Track if insider alerts have been signed up for
    function getInsiderAlertStatus() {
        return localStorage.getItem('insider_signed_up') === 'true';
    }

    function setInsiderAlertSignedUp() {
        localStorage.setItem('insider_signed_up', 'true');
    }

    // Track if the initial waitlist confirmation has been shown
    function isFirstWaitlistConfirmationDisplayed(productName) {
        return localStorage.getItem(`first_confirmation_displayed_${productName}`) === 'true';
    }

    function setWaitlistConfirmationDisplayed(productName) {
        localStorage.setItem(`first_confirmation_displayed_${productName}`, 'true');
    }

    // Display luxurious confirmation inside the email popup
    function showLuxuriousConfirmationInPopup(confirmationElement, productName, isFirstTime = false) {
        confirmationElement.innerHTML = ''; // Clear existing content

        // Create the confirmation message based on first-time signup
        const confirmationMessage = document.createElement('div');
        confirmationMessage.style.padding = '20px';
        confirmationMessage.style.background = 'linear-gradient(135deg, gold, #e5c100, #f5e1b9)';
        confirmationMessage.style.color = '#2a2a2a';
        confirmationMessage.style.fontFamily = "'Garamond', serif";
        confirmationMessage.style.fontWeight = 'bold';
        confirmationMessage.style.borderRadius = '12px';
        confirmationMessage.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        confirmationMessage.style.animation = 'fadeInScale 1s ease-out forwards, shimmerEffect 3s infinite alternate';
        confirmationMessage.style.textAlign = 'center';
        confirmationMessage.style.marginBottom = '20px'; // Increase spacing between confirmations
        confirmationMessage.textContent = isFirstTime
            ? `Thank you! You've been added to the waitlist for ${productName}.`
            : `You're waitlisted for ${productName}.`;

        // Append the confirmation message to the email popup content
        confirmationElement.appendChild(confirmationMessage);

        // Add the "Resume Browsing" button below confirmations
        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Resume browsing';
        resumeButton.className = 'resume-button';
        resumeButton.style.marginTop = '20px';
        resumeButton.addEventListener('click', function () {
            emailPopup.style.display = 'none';
        });

        // Add insider alert status if signed up and place it below the waitlist confirmation
        if (getInsiderAlertStatus()) {
            showInsiderAlertConfirmation(confirmationElement, true); // Passing true to place below
        }

        confirmationElement.appendChild(resumeButton);
        emailPopup.style.display = 'flex'; // Ensure the popup shows up
    }

    // Display insider alert confirmation in box format and place it accordingly
    function showInsiderAlertConfirmation(confirmationElement, placeBelow = false) {
        const insiderConfirmationMessage = document.createElement('div');
        insiderConfirmationMessage.style.padding = '20px';
        insiderConfirmationMessage.style.background = 'linear-gradient(135deg, #d3d3d3, #e5e5e5)';
        insiderConfirmationMessage.style.color = '#2a2a2a';
        insiderConfirmationMessage.style.fontFamily = "'Garamond', serif";
        insiderConfirmationMessage.style.fontWeight = 'bold';
        insiderConfirmationMessage.style.borderRadius = '12px';
        insiderConfirmationMessage.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        insiderConfirmationMessage.style.textAlign = 'center';
        insiderConfirmationMessage.style.marginBottom = '20px'; // Add margin to separate confirmations
        insiderConfirmationMessage.textContent = `You're signed up for insider alerts.`;

        // Append accordingly based on the flag
        if (placeBelow) {
            confirmationElement.appendChild(insiderConfirmationMessage);
        } else {
            confirmationElement.prepend(insiderConfirmationMessage);
        }
    }

    // Function to display the email popup specific to each product
    function showEmailPopup(button) {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('h3').textContent;

        // Always bring up the email popup first
        emailPopup.style.display = 'flex';

        // Check if the product is already waitlisted
        const isWaitlisted = getWaitlistStatus(productName);
        const isFirstConfirmationDisplayed = !isFirstWaitlistConfirmationDisplayed(productName);

        // Reset form each time to ensure proper setup
        resetForm();

        // Show the waitlist confirmation if already waitlisted
        if (isWaitlisted) {
            showLuxuriousConfirmationInPopup(popupContent, productName, isFirstConfirmationDisplayed);
        }

        // Set up buttons and listeners for waitlist and insider alerts
        setupPopupListeners(productName);
    }

    // Function to reset the email input form
    function resetForm() {
        // Ensure insider alerts are shown based on status
        const insiderAlertStatus = getInsiderAlertStatus();

        popupContent.innerHTML = `
            <h2>Join Our Community</h2>
            <p>Enter your email to sign up for exclusive access to our collections.</p>
            <div class="signup-option" id="waitlist-option">
                <button id="waitlist-button">Waitlist</button>
                <input type="email" id="waitlist-email" placeholder="Enter your email" class="email-input" style="display:none;">
                <button id="submit-waitlist" class="submit-button" style="display:none;">Submit</button>
            </div>
            <div class="signup-option" id="insider-option">
                ${insiderAlertStatus ? 
                    `<div style="padding: 20px; background: linear-gradient(135deg, #d3d3d3, #e5e5e5); color: #2a2a2a; font-family: 'Garamond', serif; font-weight: bold; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); text-align: center; margin-bottom: 20px;">You're signed up for insider alerts.</div>` :
                    `<button id="insider-button">Insider alerts</button>
                    <input type="email" id="insider-email" placeholder="Enter your email" class="email-input" style="display:none;">
                    <button id="submit-insider" class="submit-button" style="display:none;">Submit</button>`
                }
            </div>
            <button id="resume-browsing-button" class="resume-button">Resume browsing</button>
        `;
    }

    // Set up listeners for dynamically created popup elements
    function setupPopupListeners(productName) {
        const waitlistButton = document.getElementById('waitlist-button');
        const submitWaitlistButton = document.getElementById('submit-waitlist');
        const resumeButton = document.getElementById('resume-browsing-button');
        const waitlistEmailInput = document.getElementById('waitlist-email');
        const insiderButton = document.getElementById('insider-button');
        const insiderEmailInput = document.getElementById('insider-email');
        const submitInsiderButton = document.getElementById('submit-insider');

        if (waitlistButton) {
            waitlistButton.addEventListener('click', function () {
                waitlistEmailInput.style.display = 'block';
                submitWaitlistButton.style.display = 'block';
            });
        }

        if (submitWaitlistButton) {
            submitWaitlistButton.addEventListener('click', function () {
                const email = waitlistEmailInput.value;
                if (email) {
                    sendEmailToServer(email, 'Waitlist', productName, popupContent);
                    setWaitlistStatus(productName);
                }
            });
        }

        if (insiderButton) {
            insiderButton.addEventListener('click', function () {
                insiderEmailInput.style.display = 'block';
                submitInsiderButton.style.display = 'block';
            });
        }

        if (submitInsiderButton) {
            submitInsiderButton.addEventListener('click', function () {
                const email = insiderEmailInput.value;
                if (email) {
                    sendEmailToServer(email, 'Insider Alerts', '', popupContent);
                }
            });
        }

        if (resumeButton) {
            resumeButton.addEventListener('click', function () {
                emailPopup.style.display = 'none';
            });
        }
    }

    // Attach the popup function to each "View Details" button
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            showEmailPopup(button);
        });
    });
});
