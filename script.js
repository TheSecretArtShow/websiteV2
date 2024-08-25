const squares = document.querySelectorAll('.square');
const shopNowButton = document.getElementById('shop-now');
const products = document.querySelectorAll('.product');
let lastX = 0, lastY = 0;
let moveX = true;

const productCarousel = document.querySelector('.product-carousel');

function resetScroll() {
    productCarousel.style.transition = 'none';
    productCarousel.style.transform = 'translateX(0)';
    productCarousel.append(...productCarousel.children);
    productCarousel.offsetHeight; // Trigger reflow to reset animation
    productCarousel.style.transition = 'transform 30s linear';
    productCarousel.style.transform = `translateX(-${productCarousel.scrollWidth}px)`;
}

productCarousel.addEventListener('animationiteration', resetScroll);

// Initial setup
resetScroll();

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
});

// Handle Random Pop-up
const popups = [
    {
        message: "For the few, not the many. Are you among the few?",
        buttonText: "I'm one of one"
    },
    {
        message: "Access is restricted for the ordinary. Are you extraordinary?",
        buttonText: "I am more"
    },
    {
        message: "This store is off limits to the general public. Are you different?",
        buttonText: "I am one of one"
    },
    {
        message: "This content is for insiders only. Are you really on the inside?",
        buttonText: "I'm in"
    },
    {
        message: "The doors to this content are closed to most. Should they open for you?",
        buttonText: "I'm one of one"
    },
    {
        message: "This content is for those who know. Do you belong?",
        buttonText: "I belong"
    },
    {
        message: "This content is reserved for those who stand out. Do you?",
        buttonText: "I am one of one"
    }
];

function showRandomPopup() {
    const randomPopup = popups[Math.floor(Math.random() * popups.length)];
    document.querySelector('.popup-content h2').textContent = randomPopup.message;
    document.querySelector('.popup-content button').textContent = randomPopup.buttonText;
}

// Display a random pop-up when the page loads
showRandomPopup();

document.getElementById('popup-button').addEventListener('click', function() {
    document.getElementById('popup-overlay').style.display = 'none';
});
