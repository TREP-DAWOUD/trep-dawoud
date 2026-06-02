/**
 * TREP DAWOUD - Trail Status System
 * Real-time trail status updates and reporting
 */

// Trail data structure
const TRAILS_DATA = [
    {
        id: 'trail_toubkal_main',
        name: 'طريق جبل توبقال الرئيسي',
        difficulty: 'متوسط',
        elevation: '4167 متر',
        distance: '22 كم',
        duration: '2 يوم',
        status: 'open',
        lastReport: '2026-06-01T12:30:00Z',
        conditions: ['ثلوج متبقية', 'درجات حرارة منخفضة', 'رياح قوية في الأعلى'],
        description: 'الطريق الأساسي من إمليل إلى القمة - مفتوح مع وجود ثلوج في الأعلى',
        updatedBy: 'مرشد فتح الله',
        reports: 23,
        difficulty_color: '#f97316'
    },
    {
        id: 'trail_mgoun_north',
        name: 'الطريق الشمالي - جبل مغون',
        difficulty: 'صعب',
        elevation: '4071 متر',
        distance: '28 كم',
        duration: '2 يوم',
        status: 'warning',
        lastReport: '2026-06-01T14:15:00Z',
        conditions: ['انهيار ثلجي محتمل', 'رياح قوية', 'انجراف الثلوج'],
        description: 'طريق صعبة مع احتمالية انهيارات ثلجية في المنحدرات الحادة',
        updatedBy: 'متسلق محترف',
        reports: 12,
        difficulty_color: '#ef4444'
    },
    {
        id: 'trail_ouftas_ridge',
        name: 'سلسلة التلال - جبل أوفتاس',
        difficulty: 'صعب جداً',
        elevation: '3988 متر',
        distance: '24 كم',
        duration: '2 يوم',
        status: 'closed',
        lastReport: '2026-06-01T11:45:00Z',
        conditions: ['عاصفة ثلجية', 'انهيارات متعددة', 'رؤية محدودة'],
        description: 'مغلق - عاصفة ثلجية شديدة وظروف خطيرة جداً',
        updatedBy: 'فريق الإنقاذ',
        reports: 8,
        difficulty_color: '#991b1b'
    },
    {
        id: 'trail_atlas_trekking',
        name: 'مسار التنزه - سهول أطلس',
        difficulty: 'سهل',
        elevation: '2500 متر',
        distance: '15 كم',
        duration: '1 يوم',
        status: 'open',
        lastReport: '2026-06-01T13:20:00Z',
        conditions: ['أحوال ممتازة', 'درجات حرارة معتدلة', 'رؤية ممتازة'],
        description: 'مسار سهل ومريح مناسب للعائلات والمبتدئين',
        updatedBy: 'مرشد علي',
        reports: 45,
        difficulty_color: '#10b981'
    },
    {
        id: 'trail_rock_climbing',
        name: 'منطقة تسلق الصخور - التودرا',
        difficulty: 'متقدم',
        elevation: '1500 متر',
        distance: '8 كم',
        duration: '4 ساعات',
        status: 'restricted',
        lastReport: '2026-06-01T15:00:00Z',
        conditions: ['يحتاج معدات متقدمة', 'جدران صخرية شاهقة', 'مياه موسمية'],
        description: 'منطقة متخصصة - تحتاج معدات احترافية وخبرة عالية جداً',
        updatedBy: 'متسلق صخور',
        reports: 5,
        difficulty_color: '#1e40af'
    },
    {
        id: 'trail_alpine_refuge',
        name: 'طريق الملجأ الجبلي العالي',
        difficulty: 'متقدم',
        elevation: '3500 متر',
        distance: '18 كم',
        duration: '1.5 يوم',
        status: 'warning',
        lastReport: '2026-06-01T14:45:00Z',
        conditions: ['طقس متغير', 'صخور زلقة', 'ارتفاع عالي'],
        description: 'طريق إلى الملجأ الرئيسي - احذر من تقلبات الطقس',
        updatedBy: 'مسؤول الملجأ',
        reports: 18,
        difficulty_color: '#3b82f6'
    }
];

// Current filter
let currentFilter = 'all';

/**
 * Render all trails based on current filter
 */
function renderTrails() {
    const container = document.getElementById('trailsContainer');
    
    const filteredTrails = currentFilter === 'all' 
        ? TRAILS_DATA 
        : TRAILS_DATA.filter(trail => trail.status === currentFilter);

    if (filteredTrails.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">لا توجد مسارات بهذا التصفية</div>';
        return;
    }

    container.innerHTML = filteredTrails.map(trail => createTrailCard(trail)).join('');
}

/**
 * Create trail card HTML
 */
function createTrailCard(trail) {
    const statusConfig = getStatusConfig(trail.status);
    const lastReportTime = formatTime(trail.lastReport);

    return `
        <div class="trail-card reveal">
            <div class="trail-header">
                <div class="trail-title">
                    <h3>${trail.name}</h3>
                    <p>📍 ${trail.distance} | ⏱️ ${trail.duration}</p>
                </div>
                <div class="status-badge status-${trail.status}">
                    <span>${statusConfig.icon}</span>
                    <span>${statusConfig.label}</span>
                </div>
            </div>

            <div class="trail-body">
                <div class="trail-info">
                    <div class="info-item">
                        <div class="info-label">الارتفاع</div>
                        <div class="info-value">${trail.elevation}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">الصعوبة</div>
                        <div class="info-value" style="color: ${trail.difficulty_color};">${trail.difficulty}</div>
                    </div>
                </div>

                <div class="trail-description">
                    ${trail.description}
                </div>

                <div class="trail-conditions">
                    ${trail.conditions.map(cond => `
                        <div class="condition-item">
                            <span class="condition-icon">${getConditionIcon(cond)}</span>
                            <span>${cond}</span>
                        </div>
                    `).join('')}
                </div>

                <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem;">
                    <p style="margin: 0; color: var(--text-secondary);">
                        <strong>آخر تحديث:</strong> ${lastReportTime}<br>
                        <strong>بواسطة:</strong> ${trail.updatedBy}<br>
                        <strong>عدد التقارير:</strong> ${trail.reports} تقرير
                    </p>
                </div>

                <div class="trail-actions">
                    <button class="btn-detail" onclick="viewTrailDetails('${trail.id}')">
                        عرض التفاصيل
                    </button>
                    <button class="btn-report" onclick="reportTrail('${trail.id}')">
                        إرسال تقرير
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get status configuration
 */
function getStatusConfig(status) {
    const configs = {
        'open': { icon: '✅', label: 'مفتوح' },
        'warning': { icon: '⚠️', label: 'تحذيري' },
        'closed': { icon: '❌', label: 'مغلق' },
        'restricted': { icon: '🔐', label: 'محظور' }
    };
    return configs[status] || configs['warning'];
}

/**
 * Get condition icon
 */
function getConditionIcon(condition) {
    const iconMap = {
        'ثلوج': '❄️',
        'عاصفة': '⛈️',
        'رياح': '💨',
        'رطوبة': '💧',
        'أمطار': '🌧️',
        'ضباب': '🌫️',
        'انهيار': '⚠️',
        'حار': '🔥',
        'بارد': '🧊',
        'ممتازة': '⭐'
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (condition.includes(key)) return icon;
    }
    return '📍';
}

/**
 * Format time
 */
function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);

    if (diffMinutes < 1) return 'الآن';
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    return date.toLocaleDateString('ar-SA');
}

/**
 * Filter trails
 */
function filterTrails(filterValue) {
    currentFilter = filterValue;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Render filtered trails
    renderTrails();
}

/**
 * View trail details (placeholder)
 */
function viewTrailDetails(trailId) {
    const trail = TRAILS_DATA.find(t => t.id === trailId);
    alert(`تفاصيل ${trail.name}\n\nالطول: ${trail.distance}\nالصعوبة: ${trail.difficulty}\nالحالة: ${getStatusConfig(trail.status).label}\n\nقريباً: صفحة تفاصيل كاملة مع خريطة تفاعلية`);
}

/**
 * Report trail (placeholder)
 */
function reportTrail(trailId) {
    const trail = TRAILS_DATA.find(t => t.id === trailId);
    alert(`إرسال تقرير عن ${trail.name}\n\nقريباً: نموذج تقرير تفصيلي مع رفع صور`);
}

/**
 * Update last update time
 */
function updateLastUpdateTime() {
    const now = new Date();
    document.getElementById('lastUpdateTime').textContent = now.toLocaleTimeString('ar-SA');
}

/**
 * Initialize
 */
window.addEventListener('load', () => {
    renderTrails();
    updateLastUpdateTime();

    // Update time every minute
    setInterval(updateLastUpdateTime, 60000);
});

/**
 * Integration point for real trail status API
 * 
 * Example backend endpoint:
 * GET /api/trails/status
 * 
 * async function fetchRealTrailData() {
 *     try {
 *         const response = await fetch('/api/trails/status');
 *         const data = await response.json();
 *         TRAILS_DATA = data.trails;
 *         renderTrails();
 *     } catch (error) {
 *         console.error('Trail data fetch error:', error);
 *     }
 * }
 */
