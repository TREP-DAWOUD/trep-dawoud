// ===================== DATA =====================
const mountainsData = [
    {
        id: 1,
        name: 'جبل سلامة',
        image: '../images/salama.jpg',
        difficulty: 'easy',
        description: 'رحلة ممتعة للمبتدئين مع مناظر طبيعية خلابة',
        trips: [
            {
                id: 1,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-15',
                price: 350,
                duration: '2 أيام',
                available: 12,
                description: 'رحلة جوية براحة وأمان'
            },
            {
                id: 2,
                type: 'بحرية',
                typeCode: 'sea',
                date: '2026-02-20',
                price: 280,
                duration: '3 أيام',
                available: 8,
                description: 'رحلة بحرية مع وجبات كاملة'
            }
        ]
    },
    {
        id: 2,
        name: 'جبل تهامة',
        image: '../images/tihama.jpg',
        difficulty: 'medium',
        description: 'تحدٍ مثير مع مناظر جبلية رائعة',
        trips: [
            {
                id: 3,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-10',
                price: 650,
                duration: '3 أيام',
                available: 10,
                description: 'رحلة جوية خاصة للمتوسطين'
            },
            {
                id: 4,
                type: 'بحرية',
                typeCode: 'sea',
                date: '2026-02-18',
                price: 550,
                duration: '4 أيام',
                available: 6,
                description: 'رحلة بحرية فاخرة'
            }
        ]
    },
    {
        id: 3,
        name: 'جبل فيفاء',
        image: '../images/fayfa.jpg',
        difficulty: 'hard',
        description: 'مغامرة متقدمة للمتسلقين الخبراء',
        trips: [
            {
                id: 5,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-05',
                price: 950,
                duration: '5 أيام',
                available: 8,
                description: 'رحلة جوية متقدمة للخبراء'
            },
            {
                id: 6,
                type: 'بحرية',
                typeCode: 'sea',
                date: '2026-02-22',
                price: 850,
                duration: '6 أيام',
                available: 5,
                description: 'رحلة بحرية تحت إشراف المتخصصين'
            }
        ]
    }
];

// ===================== STATE =====================
let currentMountain = null;
let selectedTrip = null;
let bookingData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    specialRequests: '',
    mountain: null,
    trip: null
};

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    renderMountains();
    setupEventListeners();
    updateActiveNavLink();
});

// ===================== RENDER MOUNTAINS =====================
function renderMountains() {
    const mountainsGrid = document.getElementById('mountainsGrid');
    
    if (!mountainsGrid) return;

    mountainsGrid.innerHTML = mountainsData.map(mountain => `
        <div class="card glass-card mountain-card reveal hover-lift" data-mountain-id="${mountain.id}">
            <img src="${mountain.image}" alt="${mountain.name}" class="mountain-image" 
                 onerror="this.src='../images/logo.jpg'">
            <div class="mountain-content">
                <h3 class="mountain-title">${mountain.name}</h3>
                <span class="mountain-difficulty ${mountain.difficulty}">
                    ${getDifficultyLabel(mountain.difficulty)}
                </span>
                <p class="mountain-description">${mountain.description}</p>
                <div class="mountain-info">
                    <span class="mountain-trips-count">🛫 ${mountain.trips.length} رحلات</span>
                    <span class="mountain-price-range">${getMinPrice(mountain.trips)} - ${getMaxPrice(mountain.trips)} ر.س</span>
                </div>
                <button class="mountain-btn" onclick="openBookingModal(${mountain.id})">احجز الآن</button>
            </div>
        </div>
    `).join('');
}

// ===================== HELPER FUNCTIONS =====================
function getDifficultyLabel(difficulty) {
    const labels = {
        easy: 'سهل',
        medium: 'متوسط',
        hard: 'صعب'
    };
    return labels[difficulty] || 'غير محدد';
}

function getMinPrice(trips) {
    return Math.min(...trips.map(t => t.price));
}

function getMaxPrice(trips) {
    return Math.max(...trips.map(t => t.price));
}

function generateBookingReference() {
    return 'TRD' + Date.now() + Math.floor(Math.random() * 1000);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===================== MODAL FUNCTIONS =====================
function openBookingModal(mountainId) {
    currentMountain = mountainsData.find(m => m.id === mountainId);
    selectedTrip = null;
    bookingData.mountain = currentMountain;
    bookingData.trip = null;

    document.getElementById('mountainName').textContent = currentMountain.name;
    renderTrips();

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.reset();
    bookingData.passengers = 1;
    updateSummary();

    const bookingModal = document.getElementById('bookingModal');
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedTrip = null;
    document.getElementById('selectedTripSection').style.display = 'none';
}

function renderTrips() {
    const tripsContainer = document.getElementById('tripsContainer');
    
    tripsContainer.innerHTML = currentMountain.trips.map(trip => `
        <div class="trip-option" onclick="selectTrip(${trip.id})">
            <div class="trip-header">
                <span class="trip-type-badge ${trip.typeCode}">${trip.type}</span>
                <div class="trip-price">
                    ${trip.price} ر.س
                    <small>لكل شخص</small>
                </div>
            </div>
            <div class="trip-details-grid">
                <div class="trip-detail-item">
                    <span>📅 التاريخ:</span>
                    <strong>${formatDate(trip.date)}</strong>
                </div>
                <div class="trip-detail-item">
                    <span>⏱️ المدة:</span>
                    <strong>${trip.duration}</strong>
                </div>
                <div class="trip-detail-item">
                    <span>👥 المقاعد:</span>
                    <strong>${trip.available} متاحة</strong>
                </div>
                <div class="trip-detail-item">
                    <span>📝 ${trip.description}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function selectTrip(tripId) {
    selectedTrip = currentMountain.trips.find(t => t.id === tripId);
    bookingData.trip = selectedTrip;

    document.querySelectorAll('.trip-option').forEach(el => {
        el.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    const selectedTripSection = document.getElementById('selectedTripSection');
    selectedTripSection.style.display = 'block';

    document.getElementById('selectedTripType').textContent = selectedTrip.type;
    document.getElementById('selectedTripDate').textContent = formatDate(selectedTrip.date);
    document.getElementById('selectedTripPrice').textContent = selectedTrip.price + ' ر.س';
    document.getElementById('selectedTripDuration').textContent = selectedTrip.duration;

    updateSummary();

    setTimeout(() => {
        document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

// ===================== FORM HANDLERS =====================
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', closeBookingModal);
    });

    // Passenger controls
    document.getElementById('increasePassengers').addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.getElementById('passengers');
        if (parseInt(input.value) < 20) {
            input.value = parseInt(input.value) + 1;
            bookingData.passengers = parseInt(input.value);
            updateSummary();
        }
    });

    document.getElementById('decreasePassengers').addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.getElementById('passengers');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            bookingData.passengers = parseInt(input.value);
            updateSummary();
        }
    });

    // Form input tracking
    ['firstName', 'lastName', 'email', 'phone', 'specialRequests'].forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('change', (e) => {
                bookingData[field] = e.target.value;
            });
        }
    });

    // Confirm booking
    const confirmBtn = document.getElementById('confirmBookingBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmBooking);
    }

    // Close success modal
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            const successModal = document.getElementById('successModal');
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            closeBookingModal();
        });
    }
}

function updateSummary() {
    if (!currentMountain || !selectedTrip) {
        document.getElementById('summaryMountain').textContent = '-';
        document.getElementById('summaryTripType').textContent = '-';
        document.getElementById('summaryPassengers').textContent = '1';
        document.getElementById('summaryUnitPrice').textContent = '0';
        document.getElementById('summaryTotal').textContent = '0 ر.س';
        return;
    }

    const passengers = parseInt(document.getElementById('passengers').value) || 1;
    const unitPrice = selectedTrip.price;
    const total = unitPrice * passengers;

    document.getElementById('summaryMountain').textContent = currentMountain.name;
    document.getElementById('summaryTripType').textContent = selectedTrip.type;
    document.getElementById('summaryPassengers').textContent = passengers;
    document.getElementById('summaryUnitPrice').textContent = unitPrice + ' ر.س';
    document.getElementById('summaryTotal').textContent = total.toLocaleString('ar-SA') + ' ر.س';
}

function confirmBooking() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingForm.checkValidity()) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        bookingForm.reportValidity();
        return;
    }

    if (!selectedTrip) {
        alert('يرجى اختيار رحلة');
        return;
    }

    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
        alert('يرجى الموافقة على الشروط والأحكام');
        return;
    }

    const bookingRef = generateBookingReference();
    document.getElementById('bookingRef').textContent = bookingRef;

    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    
    bookingModal.classList.remove('active');
    successModal.classList.add('active');

    console.log('Booking Data:', {
        ...bookingData,
        reference: bookingRef,
        totalPrice: selectedTrip.price * bookingData.passengers,
        timestamp: new Date().toISOString()
    });
}

// ===================== NAV LINK UPDATER =====================
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
            (currentPath === '/' && href === '../') ||
            (currentPath.endsWith('index.html') && href === '../')
        ) {
            link.classList.add('active');
        }
    });
}
