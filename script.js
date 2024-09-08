document.addEventListener('DOMContentLoaded', function () {
    // Define the sendEmailToServer function near the start
    function sendEmailToServer(email, listType, name, confirmationElement) {
        fetch('https://art-show-signup-rh2gqoobqa-uw.a.run.app/submit-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, listType: listType, name: name })
        })
        .then(response => response.json())
        .then(data => {
            if (listType === 'Waitlist') {
                setWaitlistConfirmationDisplayed(name);
                showLuxuriousConfirmationInPopup(confirmationElement, name, true);
            } else if (listType === 'Insider Alerts') {
                setInsiderAlertSignedUp();
                showInsiderAlertConfirmation(confirmationElement, true); // Show first-time confirmation
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    // General setup
    const stars = document.querySelectorAll('.star');
    const shopNowButton = document.getElementById('shop-now');
    const products = document.querySelectorAll('.product, .collection-item');
    let lastX = 0, lastY = 0;
    let moveX = true;

    const productCarousel = document.querySelector('.product-carousel');

    if (productCarousel) {
        function resetScroll() {
            productCarousel.style.transition = 'none';
            productCarousel.style.transform = 'translateX(0)';
            productCarousel.append(...productCarousel.children);
            productCarousel.offsetHeight;
            productCarousel.style.transition = 'transform 30s linear';
            productCarousel.style.transform = `translateX(-${productCarousel.scrollWidth}px)`;
        }

        productCarousel.addEventListener('animationiteration', resetScroll);
        resetScroll();
    }

    // Mouse movement effect for the star trail cursor
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

        stars.forEach((star, index) => {
            const delay = index * 200 * 1.7; // Increased delay to 1.7x for all non-main stars
            setTimeout(() => {
                const rect = star.getBoundingClientRect();
                const currentX = rect.left + rect.width / 2;
                const currentY = rect.top + rect.height / 2;

                // Only create trails for the last 4 stars
                if (index >= stars.length - 4) {
                    createTrail(currentX, currentY, lastX, lastY, delay);
                }

                star.style.transform = `translate(${lastX}px, ${lastY}px)`;
            }, delay);
        });
    });

    function createTrail(startX, startY, endX, endY, starDelay) {
    const trail = document.createElement('div');
    trail.classList.add('trail');

    // Append trail to the body and ensure it has the correct positioning context
    document.body.appendChild(trail);

    // Set the position based on viewport coordinates
    trail.style.position = 'fixed'; // Use fixed positioning to align with the screen
    trail.style.left = `${startX}px`;
    trail.style.top = `${startY}px`;

    // Calculate angle and distance based on movement direction
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    // Set the trail's appearance to match the star's movement
    trail.style.width = `${distance}px`;
    trail.style.transform = `rotate(${angle}deg)`;

    // Fade out the trail after it is positioned
    setTimeout(() => {
        trail.classList.add('fade');
        setTimeout(() => {
            trail.remove();
        }, 500); // Duration for the trail to disappear
    }, 10);
}


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
    
        // Create the waitlist confirmation message
        const waitlistConfirmationMessage = document.createElement('div');
        waitlistConfirmationMessage.style.padding = '20px';
        waitlistConfirmationMessage.style.background = 'linear-gradient(135deg, gold, #e5c100, #f5e1b9)';
        waitlistConfirmationMessage.style.color = '#2a2a2a';
        waitlistConfirmationMessage.style.fontFamily = "'Garamond', serif";
        waitlistConfirmationMessage.style.fontWeight = 'bold';
        waitlistConfirmationMessage.style.borderRadius = '12px';
        waitlistConfirmationMessage.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        waitlistConfirmationMessage.style.animation = 'fadeInScale 1s ease-out forwards, shimmerEffect 3s infinite alternate';
        waitlistConfirmationMessage.style.textAlign = 'center';
        waitlistConfirmationMessage.style.marginBottom = '20px';
        waitlistConfirmationMessage.textContent = isFirstTime
            ? `Thank you! You've been added to the waitlist for ${productName}.`
            : `You're waitlisted for ${productName}.`;
    
        // Append the waitlist confirmation first
        confirmationElement.appendChild(waitlistConfirmationMessage);
    
        // Check and append insider alerts confirmation second
        const insiderAlertStatus = getInsiderAlertStatus();
        if (insiderAlertStatus) {
            // Create the insider alert confirmation message
            const insiderConfirmationMessage = document.createElement('div');
            insiderConfirmationMessage.style.padding = '20px';
            insiderConfirmationMessage.style.background = 'linear-gradient(135deg, #d3d3d3, #e5e5e5)';
            insiderConfirmationMessage.style.color = '#2a2a2a';
            insiderConfirmationMessage.style.fontFamily = "'Garamond', serif";
            insiderConfirmationMessage.style.fontWeight = 'bold';
            insiderConfirmationMessage.style.borderRadius = '12px';
            insiderConfirmationMessage.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            insiderConfirmationMessage.style.textAlign = 'center';
            insiderConfirmationMessage.style.marginBottom = '20px';
            insiderConfirmationMessage.textContent = `You're signed up for insider alerts.`;
    
            // Append the insider confirmation after the waitlist confirmation
            confirmationElement.appendChild(insiderConfirmationMessage);
        } else {
            setupInsiderAlertSection(confirmationElement);
        }
    
        // Add the "Resume Browsing" button at the end
        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Resume browsing';
        resumeButton.className = 'resume-button';
        resumeButton.style.marginTop = '20px';
        resumeButton.addEventListener('click', function () {
            emailPopup.style.display = 'none';
        });
    
        confirmationElement.appendChild(resumeButton);
        emailPopup.style.display = 'flex'; // Ensure the popup shows up
    }

    // Display insider alert confirmation
    function showInsiderAlertConfirmation(confirmationElement, firstTime = false) {
        // Find the insider section and replace it
        const insiderOption = document.getElementById('insider-option');
        if (insiderOption) {
            insiderOption.innerHTML = ''; // Clear the insider alert section
        }
    
        // Create the insider confirmation message
        const insiderConfirmationMessage = document.createElement('div');
        insiderConfirmationMessage.style.padding = '20px';
        insiderConfirmationMessage.style.background = 'linear-gradient(135deg, #d3d3d3, #e5e5e5)';
        insiderConfirmationMessage.style.color = '#2a2a2a';
        insiderConfirmationMessage.style.fontFamily = "'Garamond', serif";
        insiderConfirmationMessage.style.fontWeight = 'bold';
        insiderConfirmationMessage.style.borderRadius = '12px';
        insiderConfirmationMessage.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        insiderConfirmationMessage.style.textAlign = 'center';
        insiderConfirmationMessage.style.marginBottom = '20px'; 
        insiderConfirmationMessage.textContent = firstTime
            ? `Thank you! You've signed up for insider alerts.`
            : `You're signed up for insider alerts.`;
    
        // Append the insider confirmation inside the insider option element
        if (insiderOption) {
            insiderOption.appendChild(insiderConfirmationMessage);
        }
    }

    // Setup the insider alert section if not signed up yet
    function setupInsiderAlertSection(confirmationElement) {
        const insiderOption = document.createElement('div');
        insiderOption.className = 'signup-option';
        insiderOption.id = 'insider-option';
        insiderOption.innerHTML = `
            <button id="insider-button">Insider alerts</button>
            <input type="email" id="insider-email" placeholder="Enter your email" class="email-input" style="display:none;">
            <button id="submit-insider" class="submit-button" style="display:none;">Submit</button>
        `;
        confirmationElement.appendChild(insiderOption);
        setupInsiderAlertListeners();
    }

    // Function to display the email popup specific to each product or collection
    function showEmailPopup(button) {
        const productElement = button.closest('.product, .collection-item');
        if (!productElement) {
            console.error("Product element not found.");
            return;
        }

        const productNameElement = productElement.querySelector('h3');
        if (!productNameElement) {
            console.error("Product name element not found.");
            return;
        }

        const productName = productNameElement.textContent;

        emailPopup.style.display = 'flex';
        const isWaitlisted = getWaitlistStatus(productName);
        const isFirstConfirmationDisplayed = !isFirstWaitlistConfirmationDisplayed(productName);
        resetForm();

        if (isWaitlisted) {
            showLuxuriousConfirmationInPopup(popupContent, productName, isFirstConfirmationDisplayed);
        }

        setupPopupListeners(productName);
    }

    // Function to reset the email input form
    function resetForm() {
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

        setupInsiderAlertListeners();

        if (resumeButton) {
            resumeButton.addEventListener('click', function () {
                emailPopup.style.display = 'none';
            });
        }
    }

    // Setup listeners for insider alerts
    function setupInsiderAlertListeners() {
        const insiderButton = document.getElementById('insider-button');
        const insiderEmailInput = document.getElementById('insider-email');
        const submitInsiderButton = document.getElementById('submit-insider');

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
    }

    // Attach the popup function to each "View Details" button
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            showEmailPopup(button);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.createElement('div');
    starContainer.style.position = 'fixed';
    starContainer.style.top = 0;
    starContainer.style.left = 0;
    starContainer.style.width = '100%';
    starContainer.style.height = '100%';
    starContainer.style.pointerEvents = 'none'; // Ensures it does not block interactions
    starContainer.style.zIndex = '-1'; // Keeps it behind all other content
    document.body.appendChild(starContainer);

    const createStar = () => {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 0.5; // Random star size

        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.background = 'rgba(255, 255, 255, 0.8)';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite alternate`;

        starContainer.appendChild(star);

        // Remove stars after some time to keep the container light
        setTimeout(() => {
            starContainer.removeChild(star);
        }, 10000);
    };

    // Function to continuously create stars
    setInterval(createStar, 100); // Adjust interval for star density
});

