/**
 * Application logic for the Question Generator
 */
class App {
    constructor() {
        this.lesson = null;
        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        const generateBtn = document.getElementById('generateLesson');
        generateBtn.addEventListener('click', () => this.generateLesson());
        
        // Handle mode switching
        const modeSelect = document.getElementById('questionMode');
        modeSelect.addEventListener('change', () => this.handleModeChange());
        
        // Show initial empty state
        this.showEmptyState();
    }
    
    /**
     * Handle mode change between preset and custom
     */
    handleModeChange() {
        const mode = document.getElementById('questionMode').value;
        const presetControls = document.getElementById('presetControls');
        const customControls = document.getElementById('customControls');
        
        if (mode === 'custom') {
            presetControls.style.display = 'none';
            customControls.style.display = 'flex';
        } else {
            presetControls.style.display = 'flex';
            customControls.style.display = 'none';
        }
    }

    /**
     * Show empty state message
     */
    showEmptyState() {
        const container = document.getElementById('questionsContainer');
        container.innerHTML = `
            <div class="empty-state">
                <h2>Welcome to Universal Question Generator! 🚀</h2>
                <p>Choose "Preset Types" for basic math, or "Custom Question" to enter ANY math expression.</p>
                <p>The generator will analyze your question and create similar ones with different numbers!</p>
                <div class="examples">
                    <h3>Examples of custom questions:</h3>
                    <ul>
                        <li>Basic: <code>15 + 23 = ?</code></li>
                        <li>Algebra: <code>2x + 5 = 13</code></li>
                        <li>Advanced: <code>sin(30) + cos(60) = ?</code></li>
                        <li>Complex: <code>(5 + 3) × 2 - 4 = ?</code></li>
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Generate a new lesson
     */
    generateLesson() {
        const mode = document.getElementById('questionMode').value;
        const questionCount = parseInt(document.getElementById('questionCount').value);

        if (questionCount < 1 || questionCount > 50) {
            this.showValidationError('Please enter a number between 1 and 50');
            return;
        }

        let template;
        
        if (mode === 'custom') {
            const customQuestion = document.getElementById('customQuestion').value.trim();
            if (!customQuestion) {
                this.showValidationError('Please enter a math question');
                return;
            }
            if (!customQuestion.includes('=') && !customQuestion.includes('?')) {
                this.showValidationError('Question must contain = or ?');
                return;
            }
            template = customQuestion;
        } else {
            template = document.getElementById('questionType').value;
        }

        this.lesson = new Lesson(template, questionCount);
        this.renderLesson();
    }

    /**
     * Show validation error message
     */
    showValidationError(message) {
        const container = document.getElementById('questionsContainer');
        container.innerHTML = `
            <div class="empty-state">
                <h2>⚠️ Invalid Input</h2>
                <p>${message}</p>
            </div>
        `;
    }

    /**
     * Render the entire lesson
     */
    renderLesson() {
        const container = document.getElementById('questionsContainer');
        container.innerHTML = '';

        this.lesson.getAllQuestions().forEach((question, index) => {
            const questionCard = this.createQuestionCard(question, index);
            container.appendChild(questionCard);
        });
    }

    /**
     * Create a question card element
     */
    createQuestionCard(question, index) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `question-${index}`;

         card.innerHTML = `
            <div class="question-number">${index + 1}</div>
            <button class="refresh-btn" title="Generate new question" data-index="${index}">
                🔄
            </button>
            <div class="question-content">
                <div class="question-text">${question.question}</div>
                <input type="text" class="answer-input" placeholder="Your answer" data-index="${index}">
                <button class="check-btn" data-index="${index}">Check Answer</button>
                <div class="feedback" id="feedback-${index}"></div>
            </div>
        `;

        // Add event listener for refresh button
        const refreshBtn = card.querySelector('.refresh-btn');
        refreshBtn.addEventListener('click', () => this.refreshQuestion(index));

        // Add event listener for check button
        const checkBtn = card.querySelector('.check-btn');
        checkBtn.addEventListener('click', () => this.checkAnswer(index));

        // Add event listener for Enter key on input
        const input = card.querySelector('.answer-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer(index);
            }
        });

        return card;
    }

    /**
     * Refresh a specific question
     */
    refreshQuestion(index) {
        const newQuestion = this.lesson.refreshQuestion(index);
        
        // Get the card element
        const card = document.getElementById(`question-${index}`);
        
        // Update the question text
        const questionText = card.querySelector('.question-text');
        questionText.textContent = newQuestion.question;
        
        // Clear the input and feedback
        const input = card.querySelector('.answer-input');
        input.value = '';
        
        const feedback = document.getElementById(`feedback-${index}`);
        feedback.textContent = '';
        feedback.className = 'feedback';
        
        // Add a brief animation to indicate refresh
        questionText.style.animation = 'none';
        // Force a reflow to reset the animation
        questionText.offsetHeight;
        questionText.style.animation = 'fadeIn 0.3s';
    }

    /**
     * Check if the user's answer is correct
     */
    checkAnswer(index) {
        const input = document.querySelector(`.answer-input[data-index="${index}"]`);
        const userAnswerStr = input.value.trim();
        const feedback = document.getElementById(`feedback-${index}`);
        
        if (!userAnswerStr) {
            feedback.textContent = 'Please enter an answer';
            feedback.className = 'feedback incorrect';
            return;
        }

        const question = this.lesson.getQuestion(index);
        const userAnswer = parseFloat(userAnswerStr);
        
        if (isNaN(userAnswer)) {
            feedback.textContent = 'Please enter a valid number';
            feedback.className = 'feedback incorrect';
            return;
        }
        
        // Check if answers match (with tolerance for floating point)
        const tolerance = 0.01;
        const isCorrect = Math.abs(userAnswer - question.answer) < tolerance;
        
        if (isCorrect) {
            feedback.textContent = '✓ Correct! Well done!';
            feedback.className = 'feedback correct';
        } else {
            // Format answer nicely
            const answerDisplay = Number.isInteger(question.answer) 
                ? question.answer 
                : question.answer.toFixed(2);
            feedback.textContent = `✗ Incorrect. The answer is ${answerDisplay}`;
            feedback.className = 'feedback incorrect';
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
