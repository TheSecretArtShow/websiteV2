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

    // Dynamic Galaxy Background - Creating Stars
    const starContainer = document.createElement('div');
    starContainer.style.position = 'fixed';
    starContainer.style.top = 0;
    starContainer.style.left = 0;
    starContainer.style.width = '100%';
    starContainer.style.height = '100%';
    starContainer.style.pointerEvents = 'none';
    starContainer.style.zIndex = '-1'; // Ensure it stays behind all content
    document.body.appendChild(starContainer);

    function createStar() {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 0.5;

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

        setTimeout(() => {
            starContainer.removeChild(star);
        }, 10000);
    }

    // Function to continuously create stars
    setInterval(createStar, 100); // Adjust interval for star density

    // Shooting Stars Glitch Effect
    const starCount = 5; // Number of stars for the glitch effect
    const starTrail = [];

    for (let i = 0; i < starCount; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.opacity = 1 - i * 0.2; // Fainter stars for the trail effect
        document.body.appendChild(shootingStar);
        starTrail.push({ element: shootingStar, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
        starTrail[0].x = e.clientX;
        starTrail[0].y = e.clientY;

        for (let i = 1; i < starTrail.length; i++) {
            starTrail[i].x += (starTrail[i - 1].x - starTrail[i].x) * 0.3;
            starTrail[i].y += (starTrail[i - 1].y - starTrail[i].y) * 0.3;
            starTrail[i].element.style.transform = `translate(${starTrail[i].x}px, ${starTrail[i].y}px)`;
        }
    });
});
