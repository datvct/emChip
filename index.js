// Elements
const wishText1 = document.getElementById('wishText1');
const wishText2 = document.getElementById('wishText2');
const wishText3 = document.getElementById('wishText3');

// Wish texts
const wishes = [
    "Chúc em Chip Chip Xinh luôn xinh đẹp, rạng rỡ và tràn đầy năng lượng tích cực! 🌸",
    "Mãi yêu đời, mãi tươi trẻ như hoa ! ✨",
    "From Datvct to Chip Chip with love 💖"
];

let typingTimeouts = [];
let hasStartedTyping = false;

// Create particles effect
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
};

// Create falling petals
const createPetals = () => {
    const petalsContainer = document.getElementById('petals');
    const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼', '🏵️'];
    const petalCount = 30;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        petalsContainer.appendChild(petal);
    }
};

// Typing effect
const typeText = (element, text, speed = 50) => {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                const timeout = setTimeout(type, speed);
                typingTimeouts.push(timeout);
            } else {
                element.classList.add('done');
                resolve();
            }
        };
        
        type();
    });
};

// Start typing all wishes sequentially
const startTypingWishes = async () => {
    if (hasStartedTyping) return;
    hasStartedTyping = true;
    
    // Clear any existing timeouts
    typingTimeouts.forEach(timeout => clearTimeout(timeout));
    typingTimeouts = [];
    
    // Reset elements
    wishText1.textContent = '';
    wishText2.textContent = '';
    wishText3.textContent = '';
    wishText1.classList.remove('done');
    wishText2.classList.remove('done');
    wishText3.classList.remove('done');
    
    // Wait a bit before starting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Type each wish
    await typeText(wishText1, wishes[0], 40);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await typeText(wishText2, wishes[1], 40);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await typeText(wishText3, wishes[2], 40);
};

// Continuous petal generation
setInterval(() => {
    const petalsContainer = document.getElementById('petals');
    const existingPetals = petalsContainer.querySelectorAll('.petal');
    
    if (existingPetals.length < 30) {
        const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼', '🏵️'];
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        petalsContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 15000);
    }
}, 500);

// Initialize
const initialize = () => {
    createParticles();
    createPetals();
    
    // Auto start typing after page load
    setTimeout(() => {
        startTypingWishes();
    }, 500);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

