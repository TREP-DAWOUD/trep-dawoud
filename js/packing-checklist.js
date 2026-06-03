/**
 * TREP DAWOUD - Interactive Packing Checklist System
 * Dynamically generates packing lists based on trip type
 */

// Packing list data for different trip types
const PACKING_LISTS = {
    'day-hike': {
        name: 'رحلة يومية',
        icon: '🥾',
        duration: 'يوم واحد',
        categories: {
            'اللباس و الأحذية': [
                { item: 'أحذية مشي جبلية', important: true },
                { item: 'جوارب سميكة (3 أزواج)', important: true },
                { item: 'بنطال جبلي', important: true },
                { item: 'قميص تنفس', important: true },
                { item: 'سترة خفيفة', important: false },
                { item: 'قبعة', important: false }
            ],
            'السوائل و الطعام': [
                { item: 'ماء (2-3 لتر)', important: true },
                { item: 'وجبات خفيفة', important: true },
                { item: 'فاكهة طازجة', important: false },
                { item: 'حلويات / طاقة', important: false }
            ],
            'الحقيبة و الأدوات': [
                { item: 'حقيبة ظهر (20-30 لتر)', important: true },
                { item: 'خريطة و بوصلة', important: true },
                { item: 'هاتف و شاحن', important: true },
                { item: 'مصباح يدوي', important: false }
            ],
            'الإسعافات الأولية': [
                { item: 'عدة إسعافات أولية', important: true },
                { item: 'معقم اليد', important: false },
                { item: 'أدوية شخصية', important: true }
            ]
        }
    },
    'mountain-2day': {
        name: 'رحلة جبلية (يومين)',
        icon: '⛺',
        duration: 'يومان وليلة واحدة',
        categories: {
            'السكن': [
                { item: 'خيمة', important: true },
                { item: 'حقيبة نوم (درجة حرارة مناسبة)', important: true },
                { item: 'حصيرة/رغوة', important: true },
                { item: 'وسادة / وسادة ثابتة', important: false }
            ],
            'اللباس': [
                { item: 'طبقات متعددة', important: true },
                { item: 'ملابس جافة', important: true },
                { item: 'ملابس داخلية إضافية', important: true },
                { item: 'حذاء إضافي', important: false },
                { item: 'قفازات', important: true }
            ],
            'الطهي و الطعام': [
                { item: 'موقد وقود', important: true },
                { item: 'قدر / إناء', important: true },
                { item: 'طعام لوجبتين', important: true },
                { item: 'ملح و التوابل', important: false }
            ],
            'المياه و التنقية': [
                { item: 'زجاجات ماء (3-4)', important: true },
                { item: 'جهاز تنقية الماء', important: true },
                { item: 'أقراص تنقية', important: false }
            ],
            'الأدوات و الإضاءة': [
                { item: 'مصباح كهربائي رأسي', important: true },
                { item: 'بطاريات إضافية', important: true },
                { item: 'سكين / أداة متعددة', important: false },
                { item: 'حبل', important: true }
            ],
            'الإسعافات الأولية': [
                { item: 'عدة إسعافات كبيرة', important: true },
                { item: 'أدوية شخصية', important: true },
                { item: 'مضادات الالتهاب', important: false }
            ]
        }
    },
    'alpine-3day': {
        name: 'تسلق جبال عالية',
        icon: '🏔️',
        duration: 'ثلاثة أيام أو أكثر',
        categories: {
            'معدات التسلق': [
                { item: 'قبعة حماية', important: true },
                { item: 'حزام تسلق', important: true },
                { item: 'حبل التسلق', important: true },
                { item: 'خطافات و مسامير', important: true },
                { item: 'جهاز تثبيت', important: true },
                { item: 'أسطوانات التثبيت', important: true }
            ],
            'معدات الجليد': [
                { item: 'معاول الجليد', important: true },
                { item: 'أحذية جليدية', important: true },
                { item: 'أشواك جليدية', important: true },
                { item: 'حقيبة براءة اختراع', important: false }
            ],
            'ملابس متقدمة': [
                { item: 'بدلة رطوبة عالية', important: true },
                { item: 'سترة واقية من الرياح', important: true },
                { item: 'قفازات محترفة', important: true },
                { item: 'ملابس داخلية حرارية', important: true }
            ],
            'معدات البقاء': [
                { item: 'خيمة جبلية عالية', important: true },
                { item: 'حقيبة نوم عالية الجودة', important: true },
                { item: 'جهاز تدفئة محمول', important: true }
            ],
            'الإسعافات المتقدمة': [
                { item: 'عدة إسعافات متقدمة', important: true },
                { item: 'أكسجين', important: false },
                { item: 'أدوية الارتفاع', important: true }
            ]
        }
    },
    'expedition': {
        name: 'بعثة طويلة الأمد',
        icon: '🌍',
        duration: 'أسبوع أو أكثر',
        categories: {
            'معدات رئيسية': [
                { item: 'حقيبة ظهر كبيرة (60+ لتر)', important: true },
                { item: 'خيمة احترافية', important: true },
                { item: 'حقيبة نوم درجة شديدة', important: true }
            ],
            'ملابس شاملة': [
                { item: 'طبقات متعددة (أيام 7)', important: true },
                { item: 'ملابس تنفس', important: true },
                { item: 'معاطف مقاومة للماء', important: true },
                { item: 'أحذية احتياطية', important: true }
            ],
            'طعام و وقود': [
                { item: 'طعام لسبعة أيام', important: true },
                { item: 'موقد احترافي', important: true },
                { item: 'وقود إضافي', important: true }
            ],
            'التصحاف و الملح': [
                { item: 'خريطة تفصيلية', important: true },
                { item: 'جهاز GPS', important: true },
                { item: 'بوصلة احترافية', important: true }
            ],
            'اتصالات و أمان': [
                { item: 'هاتف جوال + شاحن', important: true },
                { item: 'جهاز اتصال طوارئ', important: true },
                { item: 'إشارات دخان / مرايا', important: false }
            ],
            'إسعافات و صحة': [
                { item: 'عدة إسعافات شاملة', important: true },
                { item: 'أدوية شخصية', important: true },
                { item: 'فيتامينات إضافية', important: false }
            ]
        }
    }
};

let currentTrip = 'day-hike';
let checkedItems = {};

/**
 * Initialize checklist
 */
function initChecklist() {
    loadFromStorage();
    renderChecklist();
    updateStats();
}

/**
 * Select trip type
 */
function selectTrip(tripType) {
    currentTrip = tripType;
    
    // Update UI
    document.querySelectorAll('.trip-option').forEach(el => {
        el.classList.remove('selected');
    });
    event.target.closest('.trip-option').classList.add('selected');
    
    // Reset checked items for new trip
    checkedItems = {};
    renderChecklist();
    updateStats();
}

/**
 * Render checklist
 */
function renderChecklist() {
    const tripData = PACKING_LISTS[currentTrip];
    const container = document.getElementById('checklistContent');
    
    let html = `<h2 style="margin-bottom: 1.5rem;">${tripData.icon} ${tripData.name} - ${tripData.duration}</h2>`;
    
    Object.entries(tripData.categories).forEach(([categoryName, items], index) => {
        const categoryId = categoryName.replace(/\s+/g, '-');
        html += `
            <div class="checklist-category reveal">
                <div class="category-title">
                    <span class="category-icon">${getCategoryIcon(categoryName)}</span>
                    ${categoryName}
                </div>
                <div class="checklist-items">
        `;
        
        items.forEach(itemData => {
            const itemId = `${currentTrip}-${categoryId}-${itemData.item}`;
            const isChecked = checkedItems[itemId] || false;
            const important = itemData.important ? '⭐' : '';
            
            html += `
                <div class="checklist-item ${isChecked ? 'checked' : ''}" onclick="toggleItem('${itemId}')">
                    <div class="item-checkbox ${isChecked ? 'checked' : ''}">
                        ${isChecked ? '✓' : ''}
                    </div>
                    <div class="item-text">
                        ${important} ${itemData.item}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Get category icon
 */
function getCategoryIcon(category) {
    const icons = {
        'اللباس': '👔',
        'اللباس و الأحذية': '👕',
        'السوائل و الطعام': '🍎',
        'الحقيبة و الأدوات': '🎒',
        'الإسعافات الأولية': '🏥',
        'الإسعافات الأولية': '🏥',
        'الإسعافات المتقدمة': '⚕️',
        'السكن': '⛺',
        'الطهي و الطعام': '🍳',
        'المياه و التنقية': '💧',
        'الأدوات و الإضاءة': '🔦',
        'معدات التسلق': '🧗',
        'معدات الجليد': '❄️',
        'ملابس متقدمة': '🧥',
        'معدات البقاء': '🏕️',
        'معدات رئيسية': '🎒',
        'ملابس شاملة': '👗',
        'طعام و وقود': '🔥',
        'التصحاف و الملح': '🗺️',
        'اتصالات و أمان': '📱'
    };
    return icons[category] || '📦';
}

/**
 * Toggle item
 */
function toggleItem(itemId) {
    checkedItems[itemId] = !checkedItems[itemId];
    saveToStorage();
    renderChecklist();
    updateStats();
}

/**
 * Check all items
 */
function checkAll() {
    const tripData = PACKING_LISTS[currentTrip];
    Object.entries(tripData.categories).forEach(([categoryName, items]) => {
        const categoryId = categoryName.replace(/\s+/g, '-');
        items.forEach(itemData => {
            const itemId = `${currentTrip}-${categoryId}-${itemData.item}`;
            checkedItems[itemId] = true;
        });
    });
    saveToStorage();
    renderChecklist();
    updateStats();
}

/**
 * Uncheck all items
 */
function uncheckAll() {
    const tripData = PACKING_LISTS[currentTrip];
    Object.entries(tripData.categories).forEach(([categoryName, items]) => {
        const categoryId = categoryName.replace(/\s+/g, '-');
        items.forEach(itemData => {
            const itemId = `${currentTrip}-${categoryId}-${itemData.item}`;
            checkedItems[itemId] = false;
        });
    });
    saveToStorage();
    renderChecklist();
    updateStats();
}

/**
 * Update statistics
 */
function updateStats() {
    const tripData = PACKING_LISTS[currentTrip];
    
    let totalItems = 0;
    Object.values(tripData.categories).forEach(items => {
        totalItems += items.length;
    });
    
    let packedItems = 0;
    Object.keys(checkedItems).forEach(itemId => {
        if (checkedItems[itemId] && itemId.startsWith(currentTrip)) {
            packedItems++;
        }
    });
    
    const remaining = totalItems - packedItems;
    const percent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
    
    document.getElementById('statTotal').textContent = totalItems;
    document.getElementById('statPacked').textContent = packedItems;
    document.getElementById('statRemaining').textContent = remaining;
    document.getElementById('statPercent').textContent = percent + '%';
    document.getElementById('progressBar').style.width = percent + '%';
}

/**
 * Export checklist
 */
function exportChecklist() {
    const tripData = PACKING_LISTS[currentTrip];
    let text = `قائمة التجهيز - ${tripData.name}\n`;
    text += `${'='.repeat(50)}\n\n`;
    
    Object.entries(tripData.categories).forEach(([categoryName, items]) => {
        text += `${categoryName}:\n`;
        const categoryId = categoryName.replace(/\s+/g, '-');
        items.forEach(itemData => {
            const itemId = `${currentTrip}-${categoryId}-${itemData.item}`;
            const isChecked = checkedItems[itemId];
            const checkbox = isChecked ? '✓' : '☐';
            const important = itemData.important ? '⭐' : '';
            text += `  ${checkbox} ${itemData.item} ${important}\n`;
        });
        text += '\n';
    });
    
    // Download as text file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `checklist-${currentTrip}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Save to local storage
 */
function saveToStorage() {
    localStorage.setItem('packingChecklist', JSON.stringify(checkedItems));
}

/**
 * Load from local storage
 */
function loadFromStorage() {
    const stored = localStorage.getItem('packingChecklist');
    if (stored) {
        checkedItems = JSON.parse(stored);
    }
}

/**
 * Initialize on page load
 */
window.addEventListener('load', initChecklist);
