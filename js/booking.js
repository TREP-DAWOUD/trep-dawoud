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
            },
            {
                id: 3,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-28',
                price: 350,
                duration: '2 أيام',
                available: 15,
                description: 'رحلة جوية مباشرة'
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
                id: 4,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-10',
                price: 650,
                duration: '3 أيام',
                available: 10,
                description: 'رحلة جوية خاصة للمتوسطين'
            },
            {
                id: 5,
                type: 'بحرية',
                typeCode: 'sea',
                date: '2026-02-18',
                price: 550,
                duration: '4 أيام',
                available: 6,
                description: 'رحلة بحرية فاخرة'
            },
            {
                id: 6,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-03-05',
                price: 650,
                duration: '3 أيام',
                available: 9,
                description: 'رحلة جوية مع مرشدين خبراء'
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
                id: 7,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-02-05',
                price: 950,
                duration: '5 أيام',
                available: 8,
                description: 'رحلة جوية متقدمة للخبراء'
            },
            {
                id: 8,
                type: 'بحرية',
                typeCode: 'sea',
                date: '2026-02-22',
                price: 850,
                duration: '6 أيام',
                available: 5,
                description: 'رحلة بحرية تحت إشراف المتخصصين'
            },
            {
                id: 9,
                type: 'جوية',
                typeCode: 'air',
                date: '2026-03-10',
                price: 950,
                duration: '5 أيام',
                available: 7,
                description: 'رحلة جوية متقدمة مع تدريب عملي'
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

// ===================== DOM ELEMENTS =====================
const mountainsGrid = document.getElementById('mountainsGrid');
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const tripsContainer = document.getElementById('tripsContainer');
const selectedTripSection = document.getElementById('selectedTripSection');
const bookingForm = document.getElementById('bookingForm');
const confirmBookingBtn = document.getElementById('confirmBookingBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
    renderMountains();
    setupEventListeners();
});

// ===================== RENDER MOUNTAINS =====================
function renderMountains() {
    mountainsGrid.innerHTML = mountainsData.map(mountain => `
        <div class="card glass-card mountain-card reveal hover-lift" data-mountain-id="${mountain.id}">
            <img src="${mountain.image}" alt="${mountain.name}" class="mountain-image" onerror="this.src='../images/logo.jpg'">
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

// ===================== MODAL FUNCTIONS =====================
function openBookingModal(mountainId) {
    currentMountain = mountainsData.find(m => m.id === mountainId);
    selectedTrip = null;
    bookingData.mountain = currentMountain;
    bookingData.trip = null;

    // Update modal header
    document.getElementById('mountainName').textContent = currentMountain.name;

    // Render trips
    renderTrips();

    // Reset form
    bookingForm.reset();
    bookingData.passengers = 1;
    updateSummary();

    // Show modal
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedTrip = null;
    selectedTripSection.style.display = 'none';
}

function renderTrips() {
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

    // Update UI
    document.querySelectorAll('.trip-option').forEach(el => {
        el.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Show selected trip section
    selectedTripSection.style.display = 'block';

    // Update trip details display
    document.getElementById('selectedTripType').textContent = selectedTrip.type;
    document.getElementById('selectedTripDate').textContent = formatDate(selectedTrip.date);
    document.getElementById('selectedTripPrice').textContent = selectedTrip.price + ' ر.س';
    document.getElementById('selectedTripDuration').textContent = selectedTrip.duration;

    updateSummary();

    // Scroll to form
    setTimeout(() => {
        document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
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

// ===================== FORM HANDLERS =====================
function setupEventListeners() {
    // Modal close
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

    // Form inputs
    document.getElementById('firstName').addEventListener('change', (e) => {
        bookingData.firstName = e.target.value;
    });

    document.getElementById('lastName').addEventListener('change', (e) => {
        bookingData.lastName = e.target.value;
    });

    document.getElementById('email').addEventListener('change', (e) => {
        bookingData.email = e.target.value;
    });

    document.getElementById('phone').addEventListener('change', (e) => {
        bookingData.phone = e.target.value;
    });

    document.getElementById('specialRequests').addEventListener('change', (e) => {
        bookingData.specialRequests = e.target.value;
    });

    // Confirm booking
    confirmBookingBtn.addEventListener('click', confirmBooking);
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        closeBookingModal();
    });
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
    // Validate form
    if (!bookingForm.checkValidity()) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        bookingForm.reportValidity();
        return;
    }

    if (!selectedTrip) {
        alert('يرجى اختيار رحلة');
        return;
    }

    if (!document.getElementById('agreeTerms').checked) {
        alert('يرجى الموافقة على الشروط والأحكام');
        return;
    }

    // Generate booking reference
    const bookingRef = generateBookingReference();

    // Show success modal
    document.getElementById('bookingRef').textContent = bookingRef;
    bookingModal.classList.remove('active');
    successModal.classList.add('active');

    // Log booking data (in real app, send to backend)
    console.log('Booking Data:', {
        ...bookingData,
        reference: bookingRef,
        totalPrice: selectedTrip.price * bookingData.passengers
    });

    // You can send this data to backend here
    // sendBookingToBackend({...bookingData, reference: bookingRef});
}
