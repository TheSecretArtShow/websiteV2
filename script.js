document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');
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
            .then(() => {
                showLuxuriousConfirmation(confirmationElement, name);
                document.cookie = `waitlisted_${name}=true; path=/`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }

    function showLuxuriousConfirmation(parentElement, name) {
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

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInScale {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
            @keyframes shimmerEffect {
                from { background-position: 0 0; }
                to { background-position: 100% 0; }
            }
        `;
        document.head.appendChild(style);
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
                sendEmailToServer(email, 'Waitlist', productName, waitlistButton.parentElement);
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
                sendEmailToServer(email, 'Insider Alerts', '', insiderButton.parentElement);
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
            showLuxuriousConfirmation(waitlistButton.parentElement, productName);
        } else {
            if (emailPopup) {
                emailPopup.style.display = 'flex';
                resetForm(waitlistEmailInput, submitWaitlistButton);
            }
        }
    }

    const viewDetailsButtons = document.querySelectorAll('.view-details');
    if (viewDetailsButtons.length > 0) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function () {
                showEmailPopup(button);
            });
        });
    }
});
