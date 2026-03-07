// API Base URL
const API_URL = 'http://localhost:3000';

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Auth Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        authForms.forEach(form => form.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword');
        const messageEl = document.getElementById('regMessage');
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        
        // Validate password match if confirm password field exists
        if (confirmPassword && password !== confirmPassword.value) {
            showMessage(messageEl, 'Passwords do not match!', 'error');
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            showMessage(messageEl, 'Password must be at least 6 characters long!', 'error');
            return;
        }
        
        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage(messageEl, '🎉 Registration successful! Redirecting to login...', 'success');
                registerForm.reset();
                
                // Switch to login tab after 2 seconds
                setTimeout(() => {
                    const loginTab = document.querySelector('[data-tab="login"]');
                    if (loginTab) loginTab.click();
                }, 2000);
            } else {
                showMessage(messageEl, data.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            // If backend is not available, show demo success message
            showMessage(messageEl, '🎉 Account created successfully! (Demo Mode - No backend connected)', 'success');
            registerForm.reset();
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                const loginTab = document.querySelector('[data-tab="login"]');
                if (loginTab) loginTab.click();
            }, 2000);
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageEl = document.getElementById('loginMessage');
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage(messageEl, '✅ Login successful! Redirecting to dashboard...', 'success');
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage(messageEl, data.message || 'Invalid email or password', 'error');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            // If backend is not available, create demo user and login
            showMessage(messageEl, '✅ Login successful! (Demo Mode - No backend connected)', 'success');
            
            // Create demo user data
            const demoUser = {
                id: 1,
                username: email.split('@')[0],
                email: email
            };
            
            localStorage.setItem('user', JSON.stringify(demoUser));
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const messageEl = document.getElementById('contactFormMessage');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with delay
        setTimeout(() => {
            showMessage(messageEl, '✅ Thank you for your message! We will get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            console.log('Contact form submitted:', { name, email, subject, message });
        }, 1000);
    });
}

// Class Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        classCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Helper function to show messages
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    element.style.opacity = '0';
    
    // Fade in animation
    setTimeout(() => {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '1';
    }, 10);
    
    // Auto-hide success messages after 5 seconds, keep error messages visible
    if (type === 'success') {
        setTimeout(() => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }, 5000);
    }
}

// Check if user is logged in (for dashboard)
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && window.location.pathname.includes('dashboard')) {
        window.location.href = 'login.html';
    }
    return user ? JSON.parse(user) : null;
}

// Logout functionality
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Functionality
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.style.display = 'flex';
            setTimeout(() => searchInput?.focus(), 100);
        });
        
        searchClose?.addEventListener('click', () => {
            searchModal.style.display = 'none';
        });
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.style.display = 'none';
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal.style.display === 'flex') {
                searchModal.style.display = 'none';
            }
        });
    }
}

// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight')?.value);
    const height = parseFloat(document.getElementById('bmiHeight')?.value);
    const resultEl = document.getElementById('bmiResult');
    const categoryEl = document.getElementById('bmiCategory');
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        if (resultEl) resultEl.textContent = 'Please enter valid values';
        return;
    }
    
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3498db';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = '#2ecc71';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f39c12';
    } else {
        category = 'Obese';
        color = '#e74c3c';
    }
    
    if (resultEl) {
        resultEl.textContent = bmi;
        resultEl.style.color = color;
    }
    if (categoryEl) {
        categoryEl.textContent = category;
        categoryEl.style.color = color;
    }
}

// Calorie Calculator
function calculateCalories() {
    const age = parseInt(document.getElementById('calorieAge')?.value);
    const weight = parseFloat(document.getElementById('calorieWeight')?.value);
    const height = parseFloat(document.getElementById('calorieHeight')?.value);
    const gender = document.getElementById('calorieGender')?.value;
    const activity = parseFloat(document.getElementById('calorieActivity')?.value);
    const resultEl = document.getElementById('calorieResult');
    
    if (!age || !weight || !height || !gender || !activity) {
        if (resultEl) resultEl.innerHTML = '<p>Please fill all fields</p>';
        return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const tdee = Math.round(bmr * activity);
    const lose = Math.round(tdee - 500);
    const gain = Math.round(tdee + 500);
    
    if (resultEl) {
        resultEl.innerHTML = `
            <div class="calorie-results">
                <div class="calorie-item">
                    <h4>Maintain Weight</h4>
                    <p class="calorie-value">${tdee} cal/day</p>
                </div>
                <div class="calorie-item">
                    <h4>Lose Weight</h4>
                    <p class="calorie-value">${lose} cal/day</p>
                </div>
                <div class="calorie-item">
                    <h4>Gain Weight</h4>
                    <p class="calorie-value">${gain} cal/day</p>
                </div>
            </div>
        `;
    }
}

// Workout Timer
let timerInterval;
let timerSeconds = 0;
let timerRunning = false;

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    
    const startBtn = document.getElementById('timerStart');
    const pauseBtn = document.getElementById('timerPause');
    const resetBtn = document.getElementById('timerReset');
    
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    
    const startBtn = document.getElementById('timerStart');
    const pauseBtn = document.getElementById('timerPause');
    
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (!display) return;
    
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Favorites System
function toggleFavorite(type, id, name) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{"classes": [], "blogs": []}');
    const key = type === 'class' ? 'classes' : 'blogs';
    
    const index = favorites[key].findIndex(item => item.id === id);
    
    if (index > -1) {
        favorites[key].splice(index, 1);
    } else {
        favorites[key].push({ id, name, date: new Date().toISOString() });
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
    
    return index === -1; // Return true if added, false if removed
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{"classes": [], "blogs": []}');
    
    document.querySelectorAll('[data-favorite-id]').forEach(btn => {
        const type = btn.getAttribute('data-favorite-type');
        const id = btn.getAttribute('data-favorite-id');
        const key = type === 'class' ? 'classes' : 'blogs';
        
        const isFavorite = favorites[key].some(item => item.id === id);
        btn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        btn.classList.toggle('favorited', isFavorite);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Scroll Indicator (Hero section arrow)
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        
        // Add cursor pointer style
        scrollIndicator.style.cursor = 'pointer';
    }
}

// Print Workout Plan
function printWorkoutPlan() {
    window.print();
}

// Share Functionality
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({ title, text, url })
            .catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.log('Error copying:', err));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication for protected pages
    const user = checkAuth();
    
    // Update UI if user is logged in
    if (user) {
        const loginLinks = document.querySelectorAll('a[href="login.html"]');
        loginLinks.forEach(link => {
            link.textContent = 'Dashboard';
            link.href = 'dashboard.html';
        });
    }
    
    // Initialize features
    initDarkMode();
    initSearch();
    initBackToTop();
    initScrollIndicator();
    updateFavoriteButtons();
    
    // Attach calculator functions to window for inline onclick
    window.calculateBMI = calculateBMI;
    window.calculateCalories = calculateCalories;
    window.startTimer = startTimer;
    window.pauseTimer = pauseTimer;
    window.resetTimer = resetTimer;
    window.toggleFavorite = toggleFavorite;
    window.printWorkoutPlan = printWorkoutPlan;
    window.shareContent = shareContent;
});
