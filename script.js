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
    const squares = document.querySelectorAll('.square');
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
                        square.style.backgroundColor = 'white';
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


//STAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR TRAAAAAAAAAIIIIIIIIIIIIILLLLLLLLLSS

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.square');
    const trails = [];

    // Create trail segments dynamically
    stars.forEach(star => {
        for (let i = 0; i < 5; i++) { // Number of trailing segments per star
            const trail = document.createElement('div');
            trail.className = 'trail';
            document.body.appendChild(trail);
            trails.push({ element: trail, star, offset: i * 5 });
        }
    });

    let lastPositions = stars.map(() => ({ x: 0, y: 0 }));

    // Update the positions of the stars and trails
    document.addEventListener('mousemove', (event) => {
        stars.forEach((star, starIndex) => {
            const currentPosition = {
                x: event.clientX,
                y: event.clientY
            };

            // Move the star with some lag effect
            setTimeout(() => {
                star.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
            }, starIndex * 30); // Adjust timing for lag effect

            // Update trails for this star
            trails.forEach((trail, trailIndex) => {
                if (trail.star === star) {
                    setTimeout(() => {
                        const deltaX = currentPosition.x - lastPositions[starIndex].x;
                        const deltaY = currentPosition.y - lastPositions[starIndex].y;

                        // Calculate the position for the trail behind the star
                        const trailX = lastPositions[starIndex].x - deltaX * (trailIndex / 5);
                        const trailY = lastPositions[starIndex].y - deltaY * (trailIndex / 5);

                        trail.element.style.transform = `translate(${trailX}px, ${trailY}px)`;
                        trail.element.style.opacity = 1 - (trailIndex * 0.15); // Fade effect as trail goes further
                    }, trail.offset);
                }
            });

            // Update the last known position of the star
            lastPositions[starIndex] = currentPosition;
        });
    });
});

