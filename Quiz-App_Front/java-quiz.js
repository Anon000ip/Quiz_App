let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let totalQuestions = 0;

// Function to fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:8080/api/questions'); // Update with your actual API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched questions:", data); // Debugging log

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Invalid or empty questions list from API.");
        }

        questions = data;
        totalQuestions = questions.length;

        // Check if the element exists before updating it
        const totalQuestionsElement = document.getElementById('total-questions');
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = totalQuestions;
        } else {
            console.error("Element #total-questions not found in the DOM.");
        }

        displayQuestion(); // Display first question
    } catch (error) {
        console.error("Error fetching questions:", error);

        // Display error message only if the element exists
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = "Failed to load questions. Please try again.";
        }
    }
}

// Function to display the current question
function displayQuestion() {
    if (questions.length === 0) {
        console.warn("No questions available.");
        return;
    }

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestion = questions[currentQuestionIndex];

    if (!questionText || !optionsContainer) {
        console.error("Required DOM elements missing: #question-text or #options-container.");
        return;
    }

    // Ensure the API property name is correct
    questionText.textContent = currentQuestion.questionText || currentQuestion.question || "Question unavailable";
    
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    // Update current question number
    const currentQuestionElement = document.getElementById('current-question');
    if (currentQuestionElement) {
        currentQuestionElement.textContent = currentQuestionIndex + 1;
    }
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    if (!questions[currentQuestionIndex]) {
        console.error("No current question available.");
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++;
    }

    nextQuestion();
}

// Function to load the next question or finish the quiz
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz completed: Store results and redirect
        localStorage.setItem('quizScore', correctAnswers);
        localStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'result.html'; // Redirect to result page
    }
}

// Ensure the script runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();
});
