 const destinations = [
            {
                name: "Siargao Island",
                description: "The surfing capital of the Philippines. Experience Cloud 9's legendary waves, tidal pools, and island vibes.",
                location: "Surigao del Norte",
                type: "video",
                mediaUrl: "Siargao Island Philippines_ More than just Surfing!.mp4",
                price: 2500
            },
            {
                name: "Mount Timolan",
                description: "Mystical mountain range with lush trails, diverse wildlife, and breathtaking sunrise views in Zamboanga del Sur.",
                location: "Zamboanga del Sur",
                type: "video",
                mediaUrl: "Mt. Timolan inactive Volcano  2nd Tallest Mountain in Zamboanga Del Sur  Aerial View.mp4",
                price: 1800
            },
            {
                name: "Blue Lagon",
                description: "Crystal clear turquoise waters surrounded by limestone cliffs — a hidden paradise in Tabina Municipality.",
                location: "Tabina Zamboanga del sur",
                type: "video",
                mediaUrl: "Blue Lagoon Tabina, Zamboanga Del Sur.mp4",
                price: 1500
            },
            {
                name: "Secret Paradise Pagadian",
                description: "Discovering Secret Paradise in Pagadian City A perfect place to relax, eat, and enjoy the overlooking view.",
                location: "Pagadian City",
                type: "image",
                mediaUrl: "unnamed.webp",
                price: 1200
            },
            {
                name: "Buluan Island",
                description: "Powdery white sandbars and crystal clear waters perfect for island hopping and sunset chasing.",
                location: "Maguindanao",
                type: "image",
                mediaUrl: "Buluan-1.jpg",
                price: 2000
            }
        ];

        function renderDestinations() {
            const grid = document.getElementById('placesGrid');
            if (!grid) return;
            
            grid.innerHTML = destinations.map(dest => {
                const priceHtml = `<div class="price-tag"><i class="fas fa-tag"></i> ₱${dest.price.toLocaleString()}</div>`;
                if (dest.type === 'video') {
                    return `
                        <div class="destination-card">
                            <div class="media-container">
                                <video controls playsinline muted>
                                    <source src="${dest.mediaUrl}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="card-content">
                                <h3>${dest.name}</h3>
                                <p>${dest.description}</p>
                                <div class="location"><i class="fas fa-map-pin"></i> ${dest.location}</div>
                                ${priceHtml}
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
                                ${priceHtml}
                            </div>
                        </div>
                    `;
                }
            }).join('');
        }

        function renderDestinationCheckboxes() {
            const container = document.getElementById('destinationsChecklist');
            if (!container) return;
            
            container.innerHTML = '<label style="font-weight: 600; margin-bottom: 10px; display: block;">Select Destinations:</label>';
            
            destinations.forEach((dest, index) => {
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'checkbox-item';
                checkboxDiv.innerHTML = `
                    <input type="checkbox" id="dest_${index}" value="${dest.price}" data-name="${dest.name}" data-price="${dest.price}">
                    <label for="dest_${index}">${dest.name} - <span style="color: #2c7a4d; font-weight: 600;">₱${dest.price.toLocaleString()}</span></label>
                `;
                container.appendChild(checkboxDiv);
            });
            
            const checkboxes = document.querySelectorAll('#destinationsChecklist input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.addEventListener('change', updateSubtotal);
            });
        }

        function updateSubtotal() {
            const checkboxes = document.querySelectorAll('#destinationsChecklist input[type="checkbox"]:checked');
            let total = 0;
            checkboxes.forEach(cb => {
                total += parseInt(cb.value);
            });
            
            const packageSelect = document.getElementById('packageSelect');
            if (packageSelect && packageSelect.value === 'all') {
                const allTotal = destinations.reduce((sum, dest) => sum + dest.price, 0);
                const discountedTotal = Math.floor(allTotal * 0.85);
                document.getElementById('subtotalAmount').innerHTML = `₱${discountedTotal.toLocaleString()} <span style="font-size: 0.8rem;">(15% off round trip)</span>`;
            } else {
                document.getElementById('subtotalAmount').innerHTML = `₱${total.toLocaleString()}`;
            }
        }

        function initPackageSelector() {
            const packageSelect = document.getElementById('packageSelect');
            if (!packageSelect) return;
            
            packageSelect.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('#destinationsChecklist input[type="checkbox"]');
                
                if (this.value === 'all') {
                    checkboxes.forEach(cb => {
                        cb.checked = true;
                    });
                } else {
                    checkboxes.forEach(cb => {
                        cb.checked = false;
                    });
                }
                updateSubtotal();
            });
        }

        function initMobileMenu() {
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            
            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = hamburger.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
                
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

        function initBookingForm() {
            const form = document.getElementById('bookingForm');
            const feedback = document.getElementById('formFeedback');
            
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('fullname').value;
                    const email = document.getElementById('email').value;
                    const travelDate = document.getElementById('travelDate').value;
                    const selectedDests = document.querySelectorAll('#destinationsChecklist input[type="checkbox"]:checked');
                    const totalAmount = document.getElementById('subtotalAmount').innerText;
                    
                    if (!name || !email || !travelDate) {
                        feedback.textContent = 'Please fill in all required fields.';
                        feedback.style.color = '#e74c3c';
                        return;
                    }
                    
                    if (selectedDests.length === 0) {
                        feedback.textContent = 'Please select at least one destination.';
                        feedback.style.color = '#e74c3c';
                        return;
                    }
                    
                    const selectedNames = Array.from(selectedDests).map(cb => cb.getAttribute('data-name')).join(', ');
                    
                    feedback.textContent = `✨ Thank you ${name}! Your booking for ${selectedNames} (${totalAmount}) is confirmed. We'll send details to ${email}.`;
                    feedback.style.color = '#27ae60';
                    form.reset();
                    document.querySelectorAll('#destinationsChecklist input[type="checkbox"]').forEach(cb => cb.checked = false);
                    document.getElementById('packageSelect').value = 'custom';
                    updateSubtotal();
                    
                    setTimeout(() => {
                        feedback.textContent = '';
                    }, 5000);
                });
            }
        }

        function initChatbot() {
            const chatbotBody = document.getElementById('chatbotBody');
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatbotHeader = document.getElementById('chatbotHeader');
            const chatInput = document.getElementById('chatInput');
            const chatSendBtn = document.getElementById('chatSendBtn');
            const chatMessages = document.getElementById('chatMessages');
            
            let isOpen = true;
            
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
            
            function getBotReply(userMsg) {
                const msg = userMsg.toLowerCase();
                if (msg.includes('siargao')) {
                    return "🏄 Siargao Island (₱2,500) - The surfing capital! Visit Cloud 9, Magpupungko Rock Pools, and Sugba Lagoon.";
                } else if (msg.includes('mount timolan') || msg.includes('timolan')) {
                    return "⛰️ Mount Timolan (₱1,800) - Stunning sunrise treks, diverse wildlife, and cool mountain air.";
                } else if (msg.includes('blue lagon') || msg.includes('lagon')) {
                    return "💙 Blue Lagon (₱1,500) - Hidden turquoise paradise with limestone cliffs. Perfect for snorkeling!";
                } else if (msg.includes('secret paradise') || msg.includes('pagadian')) {
                    return "🌴 Secret Paradise Pagadian (₱1,200) - Secluded cove with pristine sands and rock formations.";
                } else if (msg.includes('buluan')) {
                    return "🏝️ Buluan Island (₱2,000) - Powdery white sandbars and crystal clear waters for island hopping.";
                } else if (msg.includes('price') || msg.includes('cost')) {
                    return "💰 Destination prices: Siargao ₱2,500, Mount Timolan ₱1,800, Blue Lagon ₱1,500, Secret Paradise ₱1,200, Buluan Island ₱2,000. Round trip package gets 15% discount!";
                } else if (msg.includes('package') || msg.includes('round trip')) {
                    return "🎒 Round Trip Package includes all 5 destinations with 15% discount! Total only ₱7,650 instead of ₱9,000.";
                } else if (msg.includes('booking') || msg.includes('reserve')) {
                    return "📅 To book, select your destinations above, fill out the booking form, and click Reserve Now!";
                } else {
                    return "🌟 Ask me about Siargao, Mount Timolan, Blue Lagon, Secret Paradise, Buluan Island, prices, or the round trip package!";
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

        document.addEventListener('DOMContentLoaded', () => {
            renderDestinations();
            renderDestinationCheckboxes();
            initPackageSelector();
            initMobileMenu();
            initBookingForm();
            initChatbot();
            initSmoothScroll();
            updateSubtotal();
            
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
