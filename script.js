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
                showLuxuriousConfirmation(confirmationElement, name);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }

    function showLuxuriousConfirmation(parentElement, name) {
        if (!parentElement) {
            console.error('Parent element not found for confirmation display.');
            return;
        }
        parentElement.innerHTML = '';
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
        confirmationMessage.textContent = `Thank you! You've been added to the waitlist for ${name}.`;
        parentElement.appendChild(confirmationMessage);
    }

    function resetForm(emailInput, submitButton) {
        if (emailInput) {
            emailInput.value = '';
            emailInput.style.display = 'none';
        }
        if (submitButton) {
            submitButton.style.display = 'none';
        }
    }

    function checkIfWaitlisted(productName) {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`waitlisted_${productName}=`));
        return cookieValue && cookieValue.split('=')[1] === 'true';
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
            const productName = submitWaitlistButton.dataset.productName;
            if (email) {
                sendEmailToServer(email, 'Waitlist', productName, document.getElementById('email-popup-content'));
                document.cookie = `waitlisted_${productName}=true; path=/`;
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
                sendEmailToServer(email, 'Insider Alerts', '', document.getElementById('email-popup-content'));
                resetForm(insiderEmailInput, submitInsiderButton);
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

    function showEmailPopup(button) {
        const productName = button.closest('.product').querySelector('h3').textContent;
        submitWaitlistButton.dataset.productName = productName;

        if (checkIfWaitlisted(productName)) {
            showLuxuriousConfirmation(document.querySelector('.email-popup-content'), productName);
        } else {
            if (emailPopup) {
                emailPopup.style.display = 'flex';
                resetForm(waitlistEmailInput, submitWaitlistButton);
            }
        }
    }

    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function () {
            showEmailPopup(button);
        });
    });
});
