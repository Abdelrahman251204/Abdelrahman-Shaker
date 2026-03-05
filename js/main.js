/**
 * Abdelrahman Deghady - Portfolio Main JS
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlEl.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        if (currentTheme === 'light') {
            htmlEl.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            initParticles('dark'); // Re-init to match color
        } else {
            htmlEl.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            initParticles('light'); // Re-init to match color
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Glass Header Scroll Effect ---
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Particles.js Initialization (Subtle Tech/Node Background) ---
    function initParticles(theme) {
        if (typeof particlesJS !== 'undefined') {
            const color = theme === 'dark' ? '#00e6e6' : '#002147'; // Brighter teal for dark mode
            const lineColor = theme === 'dark' ? '#00e6e6' : '#008080';

            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": { "enable": true, "value_area": 800 }
                    },
                    "color": { "value": color },
                    "shape": { "type": "circle" },
                    "opacity": {
                        "value": 0.8,
                        "random": false
                    },
                    "size": {
                        "value": 4,
                        "random": true
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": lineColor,
                        "opacity": 0.4,
                        "width": 1.5
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "grab" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        }
    }

    // Initialize particles on load
    const initialTheme = htmlEl.getAttribute('data-theme');
    initParticles(initialTheme);

    // --- Content Protection ---
    // Prevent right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Prevent common keyboard shortcuts for saving/inspecting
    document.addEventListener('keydown', function (e) {
        // Prevent F12
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+C
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
        }
    });
});
