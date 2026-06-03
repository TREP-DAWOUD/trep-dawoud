// ===================== MOROCCAN MOUNTAINS DATA =====================
const mountainsData = [
    {
        id: 1,
        name: 'جبل طوبقال',
        region: 'أطلس الكبير - مراكش',
        height: '4,167 م',
        difficulty: 'hard',
        description: 'أعلى قمة في المغرب والمغرب العربي، تجربة متقدمة مع مناظر خلابة',
        image: '../images/toubkal.jpg',
        trips: [
            {
                id: 101,
                type: 'جوية',
                icon: '🛫',
                price: 1200,
                airline: 'Royal Air Maroc',
                flightLink: 'https://www.royalairmaroc.com'
            },
            {
                id: 102,
                type: 'بحرية',
                icon: '🌊',
                price: 900,
                airline: 'من الدار البيضاء',
                seaLink: '#'
            }
        ]
    },
    {
        id: 2,
        name: 'جبل إملل',
        region: 'أطلس الأوسط - إفران',
        height: '3,444 م',
        difficulty: 'medium',
        description: 'ثاني أعلى قمة في المغرب، رحلة متوسطة مع منظر ثلجي جميل',
        image: '../images/imlil.jpg',
        trips: [
            {
                id: 103,
                type: 'جوية',
                icon: '🛫',
                price: 950,
                airline: 'Atlas Blue',
                flightLink: 'https://www.atlasblue.com'
            },
            {
                id: 104,
                type: 'بحرية',
                icon: '🌊',
                price: 750,
                airline: 'من طنجة',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 3,
        name: 'جبل أنزراين',
        region: 'أطلس الأوسط - تاالات',
        height: '3,196 م',
        difficulty: 'hard',
        description: 'قمة صعبة مع طرق وعرة وإطلالات رائعة على الوديان',
        image: '../images/anzarein.jpg',
        trips: [
            {
                id: 105,
                type: 'جوية',
                icon: '🛫',
                price: 1100,
                airline: 'Ryanair',
                flightLink: 'https://www.ryanair.com'
            },
            {
                id: 106,
                type: 'بحرية',
                icon: '🌊',
                price: 850,
                airline: 'من مليلية',
                seaLink: '#'
            }
        ]
    },
    {
        id: 4,
        name: 'جبل تيزناي',
        region: 'أطلس الصحراوي - ورزازات',
        height: '2,877 م',
        difficulty: 'medium',
        description: 'جبل صحراوي خلاب مع إطلالات على ساحل تافيلالت',
        image: '../images/tizni.jpg',
        trips: [
            {
                id: 107,
                type: 'جوية',
                icon: '🛫',
                price: 850,
                airline: 'Royal Air Maroc',
                flightLink: 'https://www.royalairmaroc.com'
            },
            {
                id: 108,
                type: 'بحرية',
                icon: '🌊',
                price: 650,
                airline: 'من أكادير',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 5,
        name: 'جبل مكون',
        region: 'أطلس الأوسط - إفران',
        height: '3,367 م',
        difficulty: 'medium',
        description: 'جبل جميل مع إطلالات على بحيرة إفران المشهورة',
        image: '../images/moukaoun.jpg',
        trips: [
            {
                id: 109,
                type: 'جوية',
                icon: '🛫',
                price: 900,
                airline: 'Ryanair',
                flightLink: 'https://www.ryanair.com'
            },
            {
                id: 110,
                type: 'بحرية',
                icon: '🌊',
                price: 700,
                airline: 'من سلا',
                seaLink: '#'
            }
        ]
    },
    {
        id: 6,
        name: 'جبل سارو',
        region: 'أطلس الريف - الحسيمة',
        height: '2,450 م',
        difficulty: 'easy',
        description: 'جبل متوسط الصعوبة مع مناظر بحرية وجبلية متنوعة',
        image: '../images/saro.jpg',
        trips: [
            {
                id: 111,
                type: 'جوية',
                icon: '🛫',
                price: 650,
                airline: 'Royal Air Maroc',
                flightLink: 'https://www.royalairmaroc.com'
            },
            {
                id: 112,
                type: 'بحرية',
                icon: '🌊',
                price: 500,
                airline: 'من الحسيمة',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 7,
        name: 'جبل تجدة',
        region: 'أطلس الشرقي - تاجيموت',
        height: '2,464 م',
        difficulty: 'medium',
        description: 'جبل في قلب أطلس الشرقي مع أفاق بانورامية خلابة',
        image: '../images/tajdite.jpg',
        trips: [
            {
                id: 113,
                type: 'جوية',
                icon: '🛫',
                price: 800,
                airline: 'Atlas Blue',
                flightLink: 'https://www.atlasblue.com'
            },
            {
                id: 114,
                type: 'بحرية',
                icon: '🌊',
                price: 600,
                airline: 'من الناظور',
                seaLink: '#'
            }
        ]
    },
    {
        id: 8,
        name: 'جبل أوجوج',
        region: 'أطلس الكبير - قلعة السراغنة',
        height: '3,002 م',
        difficulty: 'hard',
        description: 'قمة نائية وصعبة مع تجربة تسلق حقيقية واستكشافية',
        image: '../images/aujduj.jpg',
        trips: [
            {
                id: 115,
                type: 'جوية',
                icon: '🛫',
                price: 1050,
                airline: 'Ryanair',
                flightLink: 'https://www.ryanair.com'
            },
            {
                id: 116,
                type: 'بحرية',
                icon: '🌊',
                price: 800,
                airline: 'من الدار البيضاء',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 9,
        name: 'جبل جبيلات',
        region: 'أطلس الأوسط - جبيليات',
        height: '3,052 م',
        difficulty: 'medium',
        description: 'قمة صعبة نسبياً مع طرق وعرة وطرق الجبليين التقليدية',
        image: '../images/jebilat.jpg',
        trips: [
            {
                id: 117,
                type: 'جوية',
                icon: '🛫',
                price: 950,
                airline: 'Royal Air Maroc',
                flightLink: 'https://www.royalairmaroc.com'
            },
            {
                id: 118,
                type: 'بحرية',
                icon: '🌊',
                price: 700,
                airline: 'من الرباط',
                seaLink: '#'
            }
        ]
    },
    {
        id: 10,
        name: 'جبل تيفيناين',
        region: 'أطلس الصغير - تارودانت',
        height: '2,345 م',
        difficulty: 'easy',
        description: 'جبل صغير وسهل مناسب للمبتدئين مع مناظر زراعية جميلة',
        image: '../images/tifinayne.jpg',
        trips: [
            {
                id: 119,
                type: 'جوية',
                icon: '🛫',
                price: 550,
                airline: 'Atlas Blue',
                flightLink: 'https://www.atlasblue.com'
            },
            {
                id: 120,
                type: 'بحرية',
                icon: '🌊',
                price: 450,
                airline: 'من أكادير',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 11,
        name: 'جبل فيفاء',
        region: 'جزيرة فيفاء - الشمال',
        height: '1,658 م',
        difficulty: 'easy',
        description: 'جبل على جزيرة بحرية جميلة مع أجواء بحرية فريدة',
        image: '../images/fifaa.jpg',
        trips: [
            {
                id: 121,
                type: 'جوية',
                icon: '🛫',
                price: 700,
                airline: 'Ryanair',
                flightLink: 'https://www.ryanair.com'
            },
            {
                id: 122,
                type: 'بحرية',
                icon: '🌊',
                price: 450,
                airline: 'رحلة بحرية مباشرة',
                seaLink: 'https://www.grimaldi-lines.com'
            }
        ]
    },
    {
        id: 12,
        name: 'جبل سيدي تاوفيق',
        region: 'أطلس الصحراوي - تميعا',
        height: '2,705 م',
        difficulty: 'medium',
        description: 'جبل صحراوي نائي مع نجوم ليلية رائعة وسكون تام',
        image: '../images/sidi-taoufik.jpg',
        trips: [
            {
                id: 123,
                type: 'جوية',
                icon: '🛫',
                price: 1000,
                airline: 'Royal Air Maroc',
                flightLink: 'https://www.royalairmaroc.com'
            },
            {
                id: 124,
                type: 'بحرية',
                icon: '🌊',
                price: 750,
                airline: 'من الصويرة',
                seaLink: '#'
            }
        ]
    }
];

// ===================== STATE =====================
let filteredMountains = [...mountainsData];

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    renderMountains();
    setupFilterListeners();
    updateActiveNavLink();
});

// ===================== RENDER MOUNTAINS =====================
function renderMountains() {
    const mountainsGrid = document.getElementById('mountainsGrid');
    const noResults = document.getElementById('noResults');

    if (filteredMountains.length === 0) {
        mountainsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    
    mountainsGrid.innerHTML = filteredMountains.map(mountain => `
        <div class="card glass-card mountain-card reveal hover-lift" data-mountain-id="${mountain.id}">
            <div class="mountain-image-wrapper">
                <img src="${mountain.image}" alt="${mountain.name}" class="mountain-image" 
                     onerror="this.src='../images/logo.jpg'">
                <div class="mountain-image-overlay"></div>
                <div class="mountain-badge">${getDifficultyLabel(mountain.difficulty)}</div>
                <div class="mountain-height">${mountain.height}</div>
            </div>
            <div class="mountain-content">
                <h3 class="mountain-title">${mountain.name}</h3>
                <div class="mountain-region">📍 ${mountain.region}</div>
                <div class="mountain-difficulty ${mountain.difficulty}">
                    ${getDifficultyLabel(mountain.difficulty)}
                </div>
                <p class="mountain-description">${mountain.description}</p>
                <div class="mountain-stats">
                    <div class="stat-item">
                        <span class="stat-label">الارتفاع</span>
                        <span class="stat-value">${mountain.height}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">نوع الرحلة</span>
                        <span class="stat-value">${mountain.trips.length} خيار</span>
                    </div>
                </div>
                <div class="trips-section">
                    ${mountain.trips.map(trip => `
                        <div class="trip-item">
                            <div class="trip-type">
                                <span class="trip-badge ${trip.type === 'جوية' ? 'air' : 'sea'}">
                                    ${trip.icon} ${trip.type}
                                </span>
                                <span style="color: var(--text-secondary); font-size: 0.85rem;">${trip.airline}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span class="trip-price">${trip.price} ر.س</span>
                                ${renderBookButton(trip)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderBookButton(trip) {
    const link = trip.type === 'جوية' ? trip.flightLink : trip.seaLink;
    const isDisabled = link === '#';
    
    if (isDisabled) {
        return `
            <button class="btn-book btn-book-disabled" title="الرحلة غير متاحة حالياً">
                غير متاح
            </button>
        `;
    }
    
    return `
        <a href="${link}" class="btn-book" target="_blank" rel="noopener noreferrer" 
           title="احجز الآن على ${trip.airline}">
            احجز الآن
        </a>
    `;
}

// ===================== FILTER FUNCTIONS =====================
function setupFilterListeners() {
    const difficultyFilter = document.getElementById('difficultyFilter');
    const priceFilter = document.getElementById('priceFilter');
    const resetBtn = document.getElementById('resetFilters');

    difficultyFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
}

function applyFilters() {
    const difficulty = document.getElementById('difficultyFilter').value;
    const price = document.getElementById('priceFilter').value;

    filteredMountains = mountainsData.filter(mountain => {
        let difficultyMatch = !difficulty || mountain.difficulty === difficulty;
        let priceMatch = true;

        if (price) {
            const minPrice = mountain.trips[0].price;
            if (price === '0-500') priceMatch = minPrice <= 500;
            else if (price === '500-1000') priceMatch = minPrice >= 500 && minPrice <= 1000;
            else if (price === '1000') priceMatch = minPrice > 1000;
        }

        return difficultyMatch && priceMatch;
    });

    renderMountains();
}

function resetFilters() {
    document.getElementById('difficultyFilter').value = '';
    document.getElementById('priceFilter').value = '';
    filteredMountains = [...mountainsData];
    renderMountains();
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

// ===================== NAV LINK UPDATER =====================
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (currentPath.includes('/booking.html') && href.includes('booking.html')) {
            link.classList.add('active');
        }
    });
}
