/**
 * TREP DAWOUD - Weather Widget System
 * Displays real-time mountain weather data with API integration
 */

// Mountain locations with coordinates
const MOUNTAIN_LOCATIONS = {
    'atlas_toubkal': {
        name: 'جبل توبقال - أطلس',
        elevation: '4167 متر',
        latitude: 31.0596,
        longitude: -5.5589,
        region: 'المغرب'
    },
    'atlas_mgoun': {
        name: 'جبل مغون - أطلس',
        elevation: '4071 متر',
        latitude: 31.7869,
        longitude: -5.7769,
        region: 'المغرب'
    },
    'atlas_ouftas': {
        name: 'جبل أوفتاس - أطلس',
        elevation: '3988 متر',
        latitude: 31.6433,
        longitude: -5.0236,
        region: 'المغرب'
    },
    'himalaya_base': {
        name: 'معسكر الهيمالايا',
        elevation: '5000+ متر',
        latitude: 27.9881,
        longitude: 86.9250,
        region: 'النيبال'
    }
};

// Mock weather data (for testing)
const MOCK_WEATHER_DATA = {
    'atlas_toubkal': {
        current: {
            temp: -5,
            feelsLike: -12,
            condition: 'غائم جزئياً',
            windSpeed: 35,
            windGust: 48,
            humidity: 65,
            precipitation: 0,
            visibility: 8000,
            uvIndex: 6,
            cloudCover: 45
        },
        hourly: [
            { time: '14:00', temp: -4, icon: '⛅', wind: 32, rain: 0 },
            { time: '15:00', temp: -5, icon: '🌤️', wind: 35, rain: 0 },
            { time: '16:00', temp: -6, icon: '⛅', wind: 38, rain: 5 },
            { time: '17:00', temp: -8, icon: '☁️', wind: 40, rain: 10 },
            { time: '18:00', temp: -10, icon: '🌧️', wind: 42, rain: 25 },
            { time: '19:00', temp: -12, icon: '🌧️', wind: 45, rain: 30 },
            { time: '20:00', temp: -14, icon: '🌨️', wind: 48, rain: 40 }
        ],
        alerts: [
            { level: 'تحذير', message: 'تحذير من الرياح القوية فوق 4000 متر' },
            { level: 'معلومة', message: 'توقع تساقط ثلوج بعد الساعة 17:00' }
        ],
        recommendation: 'العودة إلى المعسكر قبل غروب الشمس - أحوال طقس متدهورة متوقعة'
    },
    'atlas_mgoun': {
        current: {
            temp: -3,
            feelsLike: -10,
            condition: 'صافي',
            windSpeed: 28,
            windGust: 40,
            humidity: 55,
            precipitation: 0,
            visibility: 12000,
            uvIndex: 7,
            cloudCover: 20
        },
        hourly: [
            { time: '14:00', temp: -2, icon: '☀️', wind: 25, rain: 0 },
            { time: '15:00', temp: -3, icon: '☀️', wind: 28, rain: 0 },
            { time: '16:00', temp: -4, icon: '🌤️', wind: 30, rain: 0 },
            { time: '17:00', temp: -6, icon: '⛅', wind: 35, rain: 0 },
            { time: '18:00', temp: -8, icon: '⛅', wind: 38, rain: 0 },
            { time: '19:00', temp: -10, icon: '☁️', wind: 40, rain: 5 },
            { time: '20:00', temp: -12, icon: '☁️', wind: 42, rain: 10 }
        ],
        alerts: [
            { level: 'آمن', message: 'ظروف آمنة نسبياً للتسلق حالياً' }
        ],
        recommendation: 'أحوال ممتازة للتسلق - استمتع بالرؤية الواضحة'
    },
    'atlas_ouftas': {
        current: {
            temp: 2,
            feelsLike: -5,
            condition: 'ماطر',
            windSpeed: 42,
            windGust: 55,
            humidity: 80,
            precipitation: 5,
            visibility: 3000,
            uvIndex: 2,
            cloudCover: 95
        },
        hourly: [
            { time: '14:00', temp: 3, icon: '🌧️', wind: 40, rain: 8 },
            { time: '15:00', temp: 2, icon: '🌧️', wind: 42, rain: 12 },
            { time: '16:00', temp: 1, icon: '🌧️', wind: 45, rain: 15 },
            { time: '17:00', temp: 0, icon: '🌨️', wind: 50, rain: 20 },
            { time: '18:00', temp: -1, icon: '🌨️', wind: 52, rain: 30 },
            { time: '19:00', temp: -2, icon: '🌨️', wind: 55, rain: 35 },
            { time: '20:00', temp: -3, icon: '❄️', wind: 55, rain: 40 }
        ],
        alerts: [
            { level: 'خطر', message: '⚠️ تحذير من الانهيارات الثلجية - لا تصعد' },
            { level: 'تحذير', message: 'رياح قوية جداً - مخاطر عالية' }
        ],
        recommendation: 'غير آمن للتسلق - أجل الرحلة'
    },
    'himalaya_base': {
        current: {
            temp: -20,
            feelsLike: -35,
            condition: 'عاصفة ثلجية',
            windSpeed: 60,
            windGust: 80,
            humidity: 90,
            precipitation: 15,
            visibility: 500,
            uvIndex: 1,
            cloudCover: 100
        },
        hourly: [
            { time: '14:00', temp: -18, icon: '🌨️', wind: 55, rain: 12 },
            { time: '15:00', temp: -20, icon: '🌨️', wind: 60, rain: 15 },
            { time: '16:00', temp: -22, icon: '❄️', wind: 65, rain: 20 },
            { time: '17:00', temp: -25, icon: '❄️', wind: 70, rain: 25 },
            { time: '18:00', temp: -28, icon: '❄️', wind: 75, rain: 30 },
            { time: '19:00', temp: -30, icon: '❄️', wind: 80, rain: 35 },
            { time: '20:00', temp: -32, icon: '❄️', wind: 80, rain: 40 }
        ],
        alerts: [
            { level: 'خطر جداً', message: '❌ خطر شديد - عاصفة ثلجية - ابق في الملجأ' },
            { level: 'خطر', message: 'برودة شديدة - مخاطر تجمد' }
        ],
        recommendation: 'خطر شديد - لا تغادر الملجأ - انتظر تحسن الأحوال'
    }
};

/**
 * Load weather data for a specific mountain
 */
function loadWeather(locationId, locationName) {
    const widget = document.getElementById('weatherWidget');
    
    // Show loading state
    widget.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>جاري تحميل بيانات الطقس...</p>
        </div>
    `;

    // Update active button
    document.querySelectorAll('.location-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Simulate API delay
    setTimeout(() => {
        const location = MOUNTAIN_LOCATIONS[locationId];
        const weatherData = MOCK_WEATHER_DATA[locationId];

        if (location && weatherData) {
            renderWeatherWidget(location, weatherData);
        }
    }, 500);
}

/**
 * Render weather widget with data
 */
function renderWeatherWidget(location, data) {
    const widget = document.getElementById('weatherWidget');
    const currentTime = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    
    // Determine weather condition icon and color
    const weatherIcon = getWeatherIcon(data.current.condition);
    const weatherColor = getWeatherColor(data.current.condition);
    
    let alertsHTML = '';
    data.alerts.forEach(alert => {
        const alertClass = alert.level.includes('خطر') ? 'active' : '';
        alertsHTML += `
            <div class="weather-warning ${alertClass}">
                <strong>${alert.level}:</strong> ${alert.message}
            </div>
        `;
    });

    let hourlyHTML = '';
    data.hourly.forEach(hour => {
        hourlyHTML += `
            <div class="hourly-item">
                <div class="hourly-time">${hour.time}</div>
                <div class="hourly-icon">${hour.icon}</div>
                <div class="hourly-temp">${hour.temp}°م</div>
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">💨 ${hour.wind} كم/س</div>
            </div>
        `;
    });

    widget.innerHTML = `
        <div class="weather-header">
            <div class="weather-location">
                <h3>${weatherIcon} ${location.name}</h3>
                <p>الارتفاع: ${location.elevation} | ${location.region}</p>
            </div>
            <div class="weather-update-time">
                <p>آخر تحديث:</p>
                <p>${currentTime}</p>
            </div>
        </div>

        <div class="weather-description">
            <strong>الحالة الحالية:</strong> ${data.current.condition}
        </div>

        <div class="weather-main">
            <div class="weather-item">
                <div class="weather-icon">🌡️</div>
                <div class="weather-label">درجة الحرارة</div>
                <div class="weather-value">${data.current.temp}°م</div>
                <div class="weather-label">محسوس: ${data.current.feelsLike}°م</div>
            </div>
            <div class="weather-item">
                <div class="weather-icon">💨</div>
                <div class="weather-label">سرعة الرياح</div>
                <div class="weather-value">${data.current.windSpeed}</div>
                <div class="weather-label">كم/س | ذروة: ${data.current.windGust}</div>
            </div>
            <div class="weather-item">
                <div class="weather-icon">💧</div>
                <div class="weather-label">نسبة الرطوبة</div>
                <div class="weather-value">${data.current.humidity}%</div>
                <div class="weather-label">أمطار: ${data.current.precipitation}مم</div>
            </div>
            <div class="weather-item">
                <div class="weather-icon">👁️</div>
                <div class="weather-label">الرؤية</div>
                <div class="weather-value">${(data.current.visibility / 1000).toFixed(1)}</div>
                <div class="weather-label">كم | شعاع UV: ${data.current.uvIndex}</div>
            </div>
        </div>

        ${alertsHTML}

        <div class="weather-description">
            <strong>التوصية:</strong> ${data.recommendation}
        </div>

        <div class="hourly-forecast">
            <h4>التوقعات الساعية (7 ساعات القادمة)</h4>
            <div class="hourly-items">
                ${hourlyHTML}
            </div>
        </div>

        <div class="weather-description">
            <strong>ملاحظات مهمة:</strong>
            <ul style="text-align: right; margin: 0.5rem 0 0 0; padding-right: 1.5rem;">
                <li>درجات الحرارة تنخفض بحوالي 1°م لكل 100 متر ارتفاع</li>
                <li>سرعة الرياح الفعلية قد تكون أعلى في الأودية الضيقة</li>
                <li>البيانات محدثة كل 30 دقيقة من محطات الطقس الجبلية</li>
                <li>تحقق من التوقعات قبل التسلق بـ 3-6 ساعات</li>
            </ul>
        </div>
    `;
}

/**
 * Get weather icon based on condition
 */
function getWeatherIcon(condition) {
    const iconMap = {
        'صافي': '☀️',
        'غائم جزئياً': '⛅',
        'ماطر': '🌧️',
        'عاصفة ثلجية': '🌨️',
        'ثلوج': '❄️',
        'غائم': '☁️',
        'ضباب': '🌫️',
        'برد': '🧊'
    };
    return iconMap[condition] || '🌤️';
}

/**
 * Get color class based on condition severity
 */
function getWeatherColor(condition) {
    const colorMap = {
        'صافي': 'success',
        'غائم جزئياً': 'warning',
        'ماطر': 'danger',
        'عاصفة ثلجية': 'danger',
        'ثلوج': 'danger',
        'غائم': 'warning'
    };
    return colorMap[condition] || 'info';
}

/**
 * Initialize with default location
 */
window.addEventListener('load', () => {
    loadWeather('atlas_toubkal', 'جبل توبقال - أطلس');
});

/**
 * Integration point for real weather API (Open-Meteo)
 * 
 * Example implementation:
 * 
 * async function fetchRealWeatherData(lat, lon, elevation) {
 *     try {
 *         const response = await fetch(
 *             `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
 *             `&hourly=temperature_2m,windspeed_10m,relative_humidity_2m,precipitation` +
 *             `&daily=precipitation_sum,snowfall_sum,windspeed_10m_max` +
 *             `&timezone=auto`
 *         );
 *         const data = await response.json();
 *         return transformWeatherData(data, elevation);
 *     } catch (error) {
 *         console.error('Weather API Error:', error);
 *         return MOCK_WEATHER_DATA; // Fallback to mock data
 *     }
 * }
 * 
 * function transformWeatherData(apiData, elevation) {
 *     // Transform API response to expected format
 *     const current = {
 *         temp: apiData.current.temperature_2m - (elevation / 100) * 0.65, // Adjust for elevation
 *         feelsLike: apiData.current.temperature_2m - (elevation / 100) * 0.65 - (apiData.current.windspeed_10m / 5),
 *         // ... more transformations
 *     };
 *     return { current, hourly: [...] };
 * }
 */
