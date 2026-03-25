
const destinations = [
    {
        name: "Siargao Island",
        description: "The surfing capital of the Philippines. Experience Cloud 9's legendary waves, tidal pools, and island vibes.",
        location: "Surigao del Norte",
        type: "video",
        mediaUrl: "Siargao Island Philippines_ More than just Surfing!.mp4",

    },
    {
        name: "Mount Timolan",
        description: "Mystical mountain range with lush trails, diverse wildlife, and breathtaking sunrise views in Zamboanga del Sur.",
        location: "Zamboanga del Sur",
        type: "video",
        mediaUrl: "Mt. Timolan inactive Volcano  2nd Tallest Mountain in Zamboanga Del Sur  Aerial View.mp4",

    },
    {
        name: "Blue Lagon",
        description: "Crystal clear turquoise waters surrounded by limestone cliffs — a hidden paradise in Tabina Municipality.",
        location: "Tabina Zamboanga del sur",
        type: "video",
        mediaUrl: "Blue Lagoon Tabina, Zamboanga Del Sur.mp4",

    },
    {
        name: "Secret Paradise Pagadian",
        description: "Discovering Secret Paradise in Pagadian City A perfect place to relax, eat, and enjoy the overlooking view.",
        location: "Pagadian City",
        type: "image",
        mediaUrl: "unnamed.webp"
    },
    {
        name: "Buluan Island",
        description: "Powdery white sandbars and crystal clear waters perfect for island hopping and sunset chasing.",
        location: "Maguindanao",
        type: "image",
        mediaUrl: "Buluan-1.jpg"
    },


];

// ========== RENDER DESTINATIONS ==========
function renderDestinations() {
    const grid = document.getElementById('placesGrid');
    if (!grid) return;
    
    grid.innerHTML = destinations.map(dest => {
        if (dest.type === 'video') {
            return `
                <div class="destination-card">
                    <div class="media-container">
                        <video poster="${dest.posterUrl}" controls playsinline muted>
                            <source src="${dest.mediaUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="card-content">
                        <h3>${dest.name}</h3>
                        <p>${dest.description}</p>
                        <div class="location"><i class="fas fa-map-pin"></i> ${dest.location}</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="destination-card">
                    <div class="media-container">
                        <img src="${dest.mediaUrl}" alt="${dest.name}" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>${dest.name}</h3>
                        <p>${dest.description}</p>
                        <div class="location"><i class="fas fa-map-pin"></i> ${dest.location}</div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// ========== MOBILE BURGER MENU ==========
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ========== BOOKING FORM HANDLER ==========
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const feedback = document.getElementById('formFeedback');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const packageVal = document.getElementById('tripPackage').value;
            const travelDate = document.getElementById('travelDate').value;
            
            if (!name || !email || !packageVal || !travelDate) {
                feedback.textContent = 'Please fill in all fields.';
                feedback.style.color = '#e74c3c';
                return;
            }
            
            feedback.textContent = `✨ Thank you ${name}! Your ${packageVal} trip is reserved. We'll email ${email} with details.`;
            feedback.style.color = '#27ae60';
            form.reset();
            setTimeout(() => {
                feedback.textContent = '';
            }, 5000);
        });
    }
}

// ========== CHATBOT AI LOGIC ==========
function initChatbot() {
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotHeader = document.getElementById('chatbotHeader');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    let isOpen = true;
    
    // Toggle chatbot visibility
    const toggleChat = () => {
        if (chatbotBody) {
            isOpen = !isOpen;
            chatbotBody.classList.toggle('hidden', !isOpen);
        }
    };
    
    if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChat);
    if (chatbotHeader) chatbotHeader.addEventListener('click', (e) => {
        if (e.target !== chatbotToggle && e.target !== chatbotToggle.querySelector('i')) {
            toggleChat();
        }
    });
    
    // AI response function
    function getBotReply(userMsg) {
        const msg = userMsg.toLowerCase();
        if (msg.includes('siargao')) {
            return "🏄 Siargao is the surfing capital! Visit Cloud 9, Magpupungko Rock Pools, and Sugba Lagoon. Best months: July-November for waves!";
        } else if (msg.includes('mount timolan') || msg.includes('timolan')) {
            return "⛰️ Mount Timolan offers stunning sunrise treks, diverse wildlife, and cool mountain air. Perfect for eco-adventurers!";
        } else if (msg.includes('blue lagon') || msg.includes('lagon')) {
            return "💙 Blue Lagon is a hidden turquoise paradise! Best visited by boat tour. Don't forget your snorkel gear!";
        } else if (msg.includes('pagafian') || msg.includes('secret paradise')) {
            return "🌴 Secret Paradise Pagafian is a secluded cove with pristine sands and rock formations. Perfect for a peaceful escape!";
        } else if (msg.includes('buluan')) {
            return "🏝️ Buluan Island features powdery white sandbars and clear waters — ideal for island hopping and sunset photos!";
        } else if (msg.includes('booking') || msg.includes('reserve')) {
            return "📅 To book your round trip, fill out the booking form above! We offer 3-day, 5-day, and 7-day premium packages.";
        } else if (msg.includes('price') || msg.includes('cost')) {
            return "💰 Our 3-day express starts at ₱8,500, 5-day classic at ₱15,000, and 7-day premium at ₱22,000 per person. Contact us for group discounts!";
        } else if (msg.includes('hello') || msg.includes('hi')) {
            return "👋 Hello traveler! Ready to explore Mindanao? Ask me about any destination, booking, or travel tips!";
        } else {
            return "🌟 Mindanao has amazing spots! Try asking about Siargao, Mount Timolan, Blue Lagon, Secret Paradise Pagafian, Buluan Island, or booking info!";
        }
    }
    
    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleUserMessage() {
        const userText = chatInput.value.trim();
        if (!userText) return;
        addMessage(userText, true);
        chatInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const reply = getBotReply(userText);
            addMessage(reply, false);
        }, 400);
    }
    
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
}

// ========== SMOOTH SCROLLING ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    renderDestinations();
    initMobileMenu();
    initBookingForm();
    initChatbot();
    initSmoothScroll();
    
    // Auto-close mobile menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const hamburger = document.getElementById('hamburger');
                if (hamburger) {
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});