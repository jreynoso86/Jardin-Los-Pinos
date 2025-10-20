// Partner Modal Functions
function openPartnerModal(name, phone, email) {
    const modal = document.getElementById('partnerModal');
    document.getElementById('partnerName').textContent = name;
    document.getElementById('partnerPhone').textContent = phone;
    document.getElementById('partnerEmail').textContent = email;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePartnerModal() {
    const modal = document.getElementById('partnerModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('partnerModal');
    if (event.target === modal) {
        closePartnerModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePartnerModal();
    }
});

// Hero Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Add active class to current slide
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides every 4 seconds
setInterval(nextSlide, 4000);

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const eventType = document.getElementById('eventType').value;
    const guestCount = document.getElementById('guestCount').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !eventType || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (in production, this would send to a server)
    formMessage.textContent = 'Sending your message...';
    formMessage.className = 'form-message';
    formMessage.style.display = 'block';

    setTimeout(() => {
        showMessage('Thank you for your inquiry! We will get back to you within 24 hours.', 'success');
        contactForm.reset();
    }, 1500);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Calendar Implementation
let currentDate = new Date();
let selectedDate = null;

// Define which days are available for tours (only Tuesdays and Thursdays, 6-9 PM)
function isAvailableDate(date) {
    const day = date.getDay();
    // Only Tuesday (2) and Thursday (4) are available
    if (day !== 2 && day !== 4) return false;

    // You can add specific dates that are booked if needed
    const dateString = date.toDateString();
    const bookedDates = [
        // Add booked dates here if needed
        // new Date(2025, 9, 22).toDateString(),
    ];

    return !bookedDates.includes(dateString);
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    // Add previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayDiv = createDayElement(daysInPrevMonth - i, true, new Date(year, month - 1, daysInPrevMonth - i));
        calendarDays.appendChild(dayDiv);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayDiv = createDayElement(day, false, date);
        calendarDays.appendChild(dayDiv);
    }

    // Add next month's days to fill the grid
    const totalCells = calendarDays.children.length;
    const remainingCells = 35 - totalCells; // 5 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayElement(day, true, new Date(year, month + 1, day));
        calendarDays.appendChild(dayDiv);
    }
}

function createDayElement(day, isOtherMonth, date) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.textContent = day;

    if (isOtherMonth) {
        dayDiv.classList.add('other-month');
        return dayDiv;
    }

    // Check if it's today
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        dayDiv.classList.add('today');
    }

    // Check if it's the selected date
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        dayDiv.classList.add('selected');
    }

    // Check if date is in the past
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check availability
    if (isPast || !isAvailableDate(date)) {
        dayDiv.classList.add('unavailable');
    } else {
        dayDiv.classList.add('available');
        dayDiv.addEventListener('click', () => selectDate(date, dayDiv));
    }

    return dayDiv;
}

function selectDate(date, element) {
    selectedDate = date;

    // Remove selected class from all days
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });

    // Add selected class to clicked day
    element.classList.add('selected');

    // Show confirmation message with available hours
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);

    alert(`Great! You've selected ${dateString} for a venue tour.\n\nAvailable hours: 6:00 PM - 9:00 PM\n\nPlease fill out the contact form above to confirm your appointment and choose your preferred time slot.`);
}

// Calendar navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initialize calendar on page load
renderCalendar();

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const caption = this.getAttribute('data-caption');
        // In a production environment, you would implement a proper lightbox modal here
        console.log('Gallery item clicked:', caption);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.package-card, .service-card, .partner-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Placeholder images generator (for demo purposes)
// In production, replace with actual venue images
window.addEventListener('load', () => {
    // Add placeholder background colors to images that fail to load
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Image placeholder';
        });
    });

    // Image error handling for hero slider
    document.querySelectorAll('.hero-slide img').forEach(img => {
        img.addEventListener('error', function() {
            console.log('Hero slide image failed to load:', this.alt);
            this.style.backgroundColor = '#6B8E23';
        });
    });
});
