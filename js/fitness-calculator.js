/**
 * TREP DAWOUD - Fitness & Difficulty Calculator
 * Evaluates user fitness level and recommends suitable trails/courses
 */

// Quiz questions
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: 'ما خبرتك في تسلق الجبال؟',
        options: [
            { text: 'بلا خبرة', description: 'لم أتسلق من قبل', score: 1 },
            { text: 'مبتدئ', description: 'تسلقت مرة أو مرتين', score: 2 },
            { text: 'متوسط', description: 'تسلقت عدة مرات', score: 3 },
            { text: 'متقدم', description: 'أتسلق بانتظام', score: 4 },
            { text: 'خبير', description: 'متسلق محترف', score: 5 }
        ]
    },
    {
        id: 2,
        question: 'ما حالتك البدنية الحالية؟',
        options: [
            { text: 'ضعيفة', description: 'أتعب بسرعة', score: 1 },
            { text: 'متوسطة', description: 'لياقة عادية', score: 2 },
            { text: 'جيدة', description: 'لياقة جيدة', score: 3 },
            { text: 'ممتازة', description: 'أتمرن بانتظام', score: 4 },
            { text: 'رياضية', description: 'رياضي محترف', score: 5 }
        ]
    },
    {
        id: 3,
        question: 'هل لديك خوف من الارتفاعات؟',
        options: [
            { text: 'شديد جداً', description: 'لا أستطيع النظر لأسفل', score: 1 },
            { text: 'متوسط', description: 'أشعر بالخوف لكن أتحكم به', score: 2 },
            { text: 'خفيف', description: 'أشعر برهبة خفيفة', score: 3 },
            { text: 'لا يوجد', description: 'لا أخاف من الارتفاعات', score: 4 },
            { text: 'أحب الارتفاعات', description: 'أستمتع بمشاهدة الارتفاعات', score: 5 }
        ]
    },
    {
        id: 4,
        question: 'كم ساعة يمكنك المشي بدون توقف؟',
        options: [
            { text: 'أقل من ساعة', description: 'أحتاج فترات راحة متكررة', score: 1 },
            { text: '1-2 ساعة', description: 'مع فترات راحة', score: 2 },
            { text: '2-4 ساعات', description: 'مع استراحات خفيفة', score: 3 },
            { text: '4-6 ساعات', description: 'بلا مشكلة', score: 4 },
            { text: '6+ ساعات', description: 'بسهولة', score: 5 }
        ]
    },
    {
        id: 5,
        question: 'هل تعاني من أي مشاكل صحية؟',
        options: [
            { text: 'نعم، خطيرة', description: 'قلب، ضغط دم، ربو...', score: 1 },
            { text: 'نعم، متوسطة', description: 'مشاكل صحية معتدلة', score: 2 },
            { text: 'نعم، خفيفة', description: 'مشاكل بسيطة', score: 3 },
            { text: 'لا توجد', description: 'صحة جيدة', score: 4 },
            { text: 'صحة ممتازة', description: 'لا توجد مشاكل على الإطلاق', score: 5 }
        ]
    },
    {
        id: 6,
        question: 'كيف تتكيف مع درجات الحرارة المنخفضة؟',
        options: [
            { text: 'ضعيف جداً', description: 'أشعر بالبرد سريعاً', score: 1 },
            { text: 'ضعيف', description: 'أتأثر بالبرد', score: 2 },
            { text: 'متوسط', description: 'أتكيف مع الوقت', score: 3 },
            { text: 'جيد', description: 'أتحمل البرد جيداً', score: 4 },
            { text: 'ممتاز', description: 'لا أتأثر بالبرد', score: 5 }
        ]
    },
    {
        id: 7,
        question: 'هل حضرت دورة تدريبية في التسلق الجبلي؟',
        options: [
            { text: 'لم أحضرها', description: 'لا توجد خبرة تدريبية', score: 1 },
            { text: 'دورة واحدة', description: 'التحقت بدورة أساسية', score: 2 },
            { text: 'دورتان', description: 'التحقت بعدة دورات', score: 3 },
            { text: 'عدة دورات', description: 'مدرب معتمد', score: 4 },
            { text: 'دورات متقدمة', description: 'متدرب متقدم جداً', score: 5 }
        ]
    },
    {
        id: 8,
        question: 'كم أعلى ارتفاع وصلت له؟',
        options: [
            { text: 'أقل من 1000 متر', description: 'لم أصعد جبال عالية', score: 1 },
            { text: '1000-2000 متر', description: 'صعدت جبال منخفضة', score: 2 },
            { text: '2000-3000 متر', description: 'صعدت جبال متوسطة', score: 3 },
            { text: '3000-4000 متر', description: 'صعدت جبال عالية', score: 4 },
            { text: '4000+ متر', description: 'صعدت جبال عالية جداً', score: 5 }
        ]
    },
    {
        id: 9,
        question: 'كيف تتعامل مع الظروف الجوية القاسية؟',
        options: [
            { text: 'أتأثر بسرعة', description: 'أستسلم عند أول صعوبة', score: 1 },
            { text: 'أشعر بالضيق', description: 'أحاول لكن أستسلم بسرعة', score: 2 },
            { text: 'متوسط', description: 'أتحمل لكن أحتاج دعماً', score: 3 },
            { text: 'قوي', description: 'أتحمل الصعوبات', score: 4 },
            { text: 'قوي جداً', description: 'أستمتع بالتحديات', score: 5 }
        ]
    },
    {
        id: 10,
        question: 'ما هدفك الرئيسي من التسلق؟',
        options: [
            { text: 'للاستمتاع بالطبيعة فقط', description: 'رحلة ترفيهية بسيطة', score: 1 },
            { text: 'التحدي والمغامرة', description: 'أريد تحدي نفسي', score: 2 },
            { text: 'تطوير مهاراتي', description: 'أريد تحسين خبرتي', score: 3 },
            { text: 'الوصول للقمم العالية', description: 'أريد قمم صعبة', score: 4 },
            { text: 'احتراف التسلق', description: 'أريد أن أصبح متسلق محترف', score: 5 }
        ]
    }
];

// Fitness level definitions
const FITNESS_LEVELS = {
    beginner: {
        name: 'مبتدئ',
        range: [10, 20],
        description: 'أنت في بداية رحلتك مع تسلق الجبال. ركز على الرحلات السهلة والقريبة.',
        icon: '🟢',
        recommendations: [
            { title: 'الرحلات المناسبة', text: 'جبال بارتفاع أقل من 2000 متر، مسارات سهلة وواضحة' },
            { title: 'التدريب المقترح', text: 'ابدأ بدورة تسلق أساسية، تدريب لياقة بدنية منتظم' },
            { title: 'الملاحظات', text: 'لا تجهد نفسك في البداية، ركز على بناء لياقتك تدريجياً' }
        ]
    },
    intermediate: {
        name: 'متوسط',
        range: [21, 32],
        description: 'لديك خبرة متوسطة. يمكنك محاولة رحلات أكثر تحديًا.',
        icon: '🟡',
        recommendations: [
            { title: 'الرحلات المناسبة', text: 'جبال بارتفاع 2000-3500 متر، مسارات متوسطة الصعوبة' },
            { title: 'التدريب المقترح', text: 'دورات متوسطة، تدريب حماية متقدم، تحسين لياقتك' },
            { title: 'الملاحظات', text: 'استعد جيداً للطقس، لا تتسرع في بلوغ الارتفاعات العالية' }
        ]
    },
    advanced: {
        name: 'متقدم',
        range: [33, 42],
        description: 'لديك خبرة جيدة. أنت جاهز لرحلات جبالية جادة.',
        icon: '🔵',
        recommendations: [
            { title: 'الرحلات المناسبة', text: 'جبال بارتفاع 3500-4500 متر، مسارات صعبة تتطلب مهارات تقنية' },
            { title: 'التدريب المقترح', text: 'دورات متقدمة، تدريب على الثلج والجليد، تحسين المهارات التقنية' },
            { title: 'الملاحظات', text: 'اهتم بالعتاد عالي الجودة، خطط جيداً للرحلات الطويلة' }
        ]
    },
    expert: {
        name: 'خبير',
        range: [43, 50],
        description: 'أنت متسلق خبير. أنت جاهز لأصعب التحديات الجبلية.',
        icon: '🔴',
        recommendations: [
            { title: 'الرحلات المناسبة', text: 'جبال فوق 4500 متر، مسارات تقنية صعبة جداً' },
            { title: 'التدريب المقترح', text: 'دورات متخصصة، تدريب على الارتفاعات العالية جداً' },
            { title: 'الملاحظات', text: 'استعد للظروف القاسية، فكر في الرحلات الدولية والقمم العالمية' }
        ]
    }
};

let currentQuestion = 0;
let answers = [];

/**
 * Initialize quiz
 */
function initQuiz() {
    currentQuestion = 0;
    answers = [];
    renderQuestion();
}

/**
 * Render current question
 */
function renderQuestion() {
    const container = document.getElementById('quizContainer');
    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    let optionsHTML = '';
    question.options.forEach((option, index) => {
        const isSelected = answers[currentQuestion] === index;
        optionsHTML += `
            <button class="option-btn ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                <div class="option-label">${option.text}</div>
                <div class="option-description">${option.description}</div>
            </button>
        `;
    });

    container.innerHTML = `
        <div class="quiz-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress-text">السؤال ${currentQuestion + 1} من ${QUIZ_QUESTIONS.length}</div>
        </div>

        <div class="quiz-question">
            <div class="question-number">سؤال</div>
            <div class="question-text">${question.question}</div>
            <div class="options-grid">
                ${optionsHTML}
            </div>
        </div>

        <div class="quiz-buttons">
            <button class="btn-prev" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
                ← السابق
            </button>
            <button class="btn-next" onclick="nextQuestion()" ${answers[currentQuestion] === undefined ? 'disabled' : ''}>
                ${currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'انتهى' : 'التالي'} →
            </button>
        </div>
    `;
}

/**
 * Select option
 */
function selectOption(index) {
    answers[currentQuestion] = index;
    renderQuestion();
}

/**
 * Next question
 */
function nextQuestion() {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

/**
 * Previous question
 */
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

/**
 * Calculate total score
 */
function calculateScore() {
    let totalScore = 0;
    answers.forEach((answerIndex, questionIndex) => {
        const question = QUIZ_QUESTIONS[questionIndex];
        totalScore += question.options[answerIndex].score;
    });
    return totalScore;
}

/**
 * Get fitness level
 */
function getFitnessLevel(score) {
    for (const [key, level] of Object.entries(FITNESS_LEVELS)) {
        if (score >= level.range[0] && score <= level.range[1]) {
            return { key, ...level };
        }
    }
    return FITNESS_LEVELS.expert;
}

/**
 * Show results
 */
function showResults() {
    const container = document.getElementById('quizContainer');
    const score = calculateScore();
    const level = getFitnessLevel(score);

    let recommendationsHTML = '';
    level.recommendations.forEach(rec => {
        recommendationsHTML += `
            <div class="recommendation-item">
                <div class="recommendation-title">✓ ${rec.title}</div>
                <div class="recommendation-text">${rec.text}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="results-container" style="display: block;">
            <div class="results-score">
                <div class="score-circle">
                    <div class="score-value">${score}</div>
                    <div class="score-label">من 50</div>
                </div>
                
                <div class="level-badge level-${level.key}">
                    ${level.icon} ${level.name}
                </div>
                
                <p style="color: var(--text-secondary); margin: 1rem 0;">
                    ${level.description}
                </p>
            </div>

            <div class="recommendations">
                <h3 style="margin-bottom: 1rem; color: var(--primary-color); text-align: center;">
                    🎯 التوصيات الخاصة بك
                </h3>
                ${recommendationsHTML}
            </div>

            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
                <p style="color: var(--text-secondary); font-size: 0.95rem;">
                    <strong>نصيحتنا:</strong> لا تقلق من درجاتك الحالية. كل من بدأ من حيث بدأت. 
                    تذكر أن الاستمرار والممارسة المنتظمة هي المفتاح لتطوير مهاراتك.
                </p>
            </div>

            <button class="btn-restart" onclick="initQuiz()">
                إعادة الاختبار
            </button>
        </div>
    `;
}

/**
 * Initialize on page load
 */
window.addEventListener('load', initQuiz);
