// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Quiz functionality
    const quizData = [
        {
            question: "哪个古代文明最早发明了书写系统？",
            options: [
                "古埃及",
                "苏美尔",
                "古印度",
                "古中国"
            ],
            correct: 1
        },
        {
            question: "秦始皇统一中国的年份是？",
            options: [
                "公元前221年",
                "公元前206年",
                "公元前202年",
                "公元前210年"
            ],
            correct: 0
        },
        {
            question: "哪场事件标志着中世纪的开始？",
            options: [
                "查理曼加冕",
                "东罗马帝国灭亡",
                "西罗马帝国灭亡",
                "诺曼底战役"
            ],
            correct: 2
        },
        {
            question: "工业革命最初发源于哪个国家？",
            options: [
                "法国",
                "德国",
                "美国",
                "英国"
            ],
            correct: 3
        },
        {
            question: "人类首次登月是在哪一年？",
            options: [
                "1961年",
                "1969年",
                "1975年",
                "1981年"
            ],
            correct: 1
        }
    ];

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit-quiz");

    function buildQuiz() {
        const output = [];

        quizData.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (let i = 0; i < currentQuestion.options.length; i++) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${i}">
                        ${currentQuestion.options[i]}
                    </label>`
                );
            }

            output.push(
                `<div class="question">
                    <h3>问题 ${questionNumber + 1}: ${currentQuestion.question}</h3>
                    <div class="answers">${answers.join("")}</div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join("");
        
        // 确保提交按钮可见
        if (submitButton) {
            submitButton.style.display = 'block';
        }
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");
        let numCorrect = 0;

        quizData.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer == currentQuestion.correct) {
                numCorrect++;
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });

        resultsContainer.innerHTML = `你答对了 ${numCorrect} 道题，共 ${quizData.length} 道题`;
        resultsContainer.style.display = "block";
    }

    // Build quiz
    buildQuiz();

    // Event listener for quiz submission
    if (submitButton) {
        submitButton.addEventListener("click", showResults);
    } else {
        console.error("提交按钮未找到！");
    }

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineItems() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }
    
    // Add initial CSS for timeline animation
    const styleSheet = document.styleSheets[0];
    const animationRules = `
        .timeline-item {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease;
        }
        .timeline-item.show {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item:nth-child(even).show {
            transform: translateY(0);
        }
    `;
    
    styleSheet.insertRule(animationRules, styleSheet.cssRules.length);
    
    // Initial check and add scroll event
    checkTimelineItems();
    window.addEventListener('scroll', checkTimelineItems);
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
}); 