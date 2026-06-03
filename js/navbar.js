// ===================== NAVBAR INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarNav = document.querySelector('.navbar-nav');
    const navbarBrand = document.querySelector('.navbar-brand');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // ==================== MOBILE MENU ====================
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navbarNav.classList.toggle('active');
        });
    }

    // ==================== CLOSE MENU ON LINK CLICK ====================
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('active');
        });
    });

    // ==================== CLOSE MENU ON CLICK OUTSIDE ====================
    document.addEventListener('click', (e) => {
        if (navbarNav && !navbarNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navbarNav.classList.remove('active');
        }
    });

    // ==================== THEME TOGGLE ====================
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem(
                'theme',
                document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
            );
        });

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    }

    // ==================== UPDATE ACTIVE NAV LINK ====================
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (
            (currentPath.includes('/booking.html') && href.includes('booking.html')) ||
            (currentPath.includes('/blog.html') && href.includes('blog.html')) ||
            (currentPath.includes('/courses.html') && href.includes('courses.html')) ||
            (currentPath.includes('/contact.html') && href.includes('contact.html')) ||
            (currentPath.includes('/mountains.html') && href.includes('mountains.html')) ||
            (currentPath.includes('/trips.html') && href.includes('trips.html')) ||
            (currentPath === '/' && href === './') ||
            (currentPath.endsWith('index.html') && href === './')
        ) {
            link.classList.add('active');
        }
    });
}
