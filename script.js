let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timer;

const startQuizBtn = document.getElementById('startQuizBtn');
const rulesSection = document.getElementById('rulesSection');
const quizSection = document.getElementById('quizSection');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const animationElement = document.getElementById('animationContainer');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const correctAnswerElement = document.getElementById('correctAnswer');
const finalScore = document.getElementById('finalScore');

const questions = [
    {
        question: "1.What is a process?",
        options: ["A program in execution", "An instance of a program", "A program counter", "All of the above"],
        answer: 0
    },
    {
        question: "2.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "3.In operating systems, what is the function of the kernel?",
        options: ["To load drivers", " To handle memory management", "To manage input/output operations", "Both b and c "],
        answer: 3
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    },
    {
        question: "4.What is virtual memory?",
        options: ["A technique to extend RAM", "A file system", "A process", "None of the above"],
        answer: 0
    }
];

startQuizBtn.addEventListener('click', showRules);
document.getElementById('understandBtn').addEventListener('click', showQuiz);
nextQuestionBtn.addEventListener('click', showNextQuestion);
restartBtn.addEventListener('click', restartQuiz);
playAgainBtn.addEventListener('click', playAgain);

function showRules() {
    document.getElementById('welcomeSection').style.display = 'none';
    rulesSection.style.display = 'block';
}

function showQuiz() {
    rulesSection.style.display = 'none';
    quizSection.style.display = 'block';
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    correctAnswerElement.style.display = 'none';
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.classList.add('option');
        optionBtn.innerText = option;
        optionBtn.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(optionBtn);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.answer) {
        score += 10;
        showAnimation("🎉 Correct Answer! 🎉", "celebrate");
    } else {
        score -= 10;
        correctAnswerElement.innerText = `Correct Answer: ${currentQuestion.options[currentQuestion.answer]}`;
        correctAnswerElement.style.display = 'block';
        showAnimation("😢 Incorrect Answer! 😢", "sad");
    }
    scoreElement.innerText = `Score: ${score}`;
    nextQuestionBtn.style.display = 'block'; // Show the next question button after answering
    resetTimer();
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        nextQuestionBtn.style.display = 'none'; // Hide the button again
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeRemaining = 30;
    timerElement.innerText = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            score -= 10;
            scoreElement.innerText = `Score: ${score}`;
            correctAnswerElement.innerText = `Correct Answer: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`;
            correctAnswerElement.style.display = 'block';
            nextQuestionBtn.style.display = 'block'; // Allow moving to next question after time is up
            showAnimation("😢 Time's Up! 😢", "cry");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

function endQuiz() {
    quizSection.style.display = 'none';
    animationElement.style.display = 'block';
    finalScore.innerText = score;
    finalScore.style.display = 'block';
    restartBtn.style.display = 'block';
}

function showAnimation(message, type) {
    animationElement.style.display = 'block';
    animationElement.innerText = message;

    if (type === "celebrate") {
        animationElement.style.backgroundColor = 'green';
    } else if (type === "sad") {
        animationElement.style.backgroundColor = 'red';
    } else if (type === "cry") {
        animationElement.style.backgroundColor = 'orange';
    }

    setTimeout(() => {
        animationElement.style.display = 'none';
    }, 1500);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    startTimer();
    restartBtn.style.display = 'none';
    playAgainBtn.style.display = 'none';
    nextQuestionBtn.style.display = 'none';
}
