/**
 * QuestionGenerator - Core class for generating different types of questions
 */
class QuestionGenerator {
    constructor() {
        this.generators = {
            addition: this.generateAddition.bind(this),
            subtraction: this.generateSubtraction.bind(this),
            multiplication: this.generateMultiplication.bind(this)
        };
    }

    /**
     * Generate a random number within a range
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate an addition question
     */
    generateAddition() {
        const num1 = this.randomInt(1, 100);
        const num2 = this.randomInt(1, 100);
        return {
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
            type: 'addition'
        };
    }

    /**
     * Generate a subtraction question
     */
    generateSubtraction() {
        const num1 = this.randomInt(10, 100);
        const num2 = this.randomInt(1, num1); // Ensure positive result
        return {
            question: `${num1} - ${num2} = ?`,
            answer: num1 - num2,
            type: 'subtraction'
        };
    }

    /**
     * Generate a multiplication question
     */
    generateMultiplication() {
        const num1 = this.randomInt(1, 12);
        const num2 = this.randomInt(1, 12);
        return {
            question: `${num1} × ${num2} = ?`,
            answer: num1 * num2,
            type: 'multiplication'
        };
    }

    /**
     * Generate a question of a specific type
     */
    generate(type) {
        const generator = this.generators[type];
        if (!generator) {
            throw new Error(`Unknown question type: ${type}`);
        }
        return generator();
    }
}

/**
 * Lesson - Manages a collection of questions
 */
class Lesson {
    constructor(questionType, questionCount) {
        this.questionType = questionType;
        this.questionCount = questionCount;
        this.questions = [];
        this.generator = new QuestionGenerator();
        this.initialize();
    }

    /**
     * Initialize the lesson with questions
     */
    initialize() {
        this.questions = [];
        for (let i = 0; i < this.questionCount; i++) {
            this.questions.push(this.generator.generate(this.questionType));
        }
    }

    /**
     * Refresh a specific question by index
     */
    refreshQuestion(index) {
        if (index < 0 || index >= this.questions.length) {
            throw new Error(`Invalid question index: ${index}. Valid range: 0-${this.questions.length - 1}`);
        }
        this.questions[index] = this.generator.generate(this.questionType);
        return this.questions[index];
    }

    /**
     * Get a specific question by index
     */
    getQuestion(index) {
        return this.questions[index];
    }

    /**
     * Get all questions
     */
    getAllQuestions() {
        return this.questions;
    }
}
