/**
 * MathParser - Parses and evaluates mathematical expressions
 */
class MathParser {
    /**
     * Parse a mathematical expression and extract numbers and operators
     */
    static parse(expression) {
        // Remove whitespace and question marks
        const cleaned = expression.replace(/\s+/g, '').replace(/[?=]/g, '');
        
        // Extract tokens (numbers, operators, functions, parentheses)
        const tokens = [];
        let current = '';
        
        for (let i = 0; i < cleaned.length; i++) {
            const char = cleaned[i];
            
            // Check if it's a digit, decimal point, or negative sign at start of number
            if (/[\d.]/.test(char) || (char === '-' && /[\d]/.test(cleaned[i + 1]))) {
                current += char;
            } else {
                if (current) {
                    tokens.push({ type: 'number', value: parseFloat(current) });
                    current = '';
                }
                
                // Handle multi-character operators and functions
                if (/[+\-×*÷/^()√∫∑∏]/.test(char)) {
                    tokens.push({ type: 'operator', value: char });
                } else if (/[a-zA-Z]/.test(char)) {
                    // Handle functions like sin, cos, log, etc.
                    let func = char;
                    while (i + 1 < cleaned.length && /[a-zA-Z]/.test(cleaned[i + 1])) {
                        func += cleaned[++i];
                    }
                    tokens.push({ type: 'function', value: func });
                }
            }
        }
        
        if (current) {
            tokens.push({ type: 'number', value: parseFloat(current) });
        }
        
        return tokens;
    }
    
    /**
     * Evaluate a mathematical expression safely
     */
    static evaluate(expression) {
        try {
            // Replace mathematical symbols with JavaScript operators
            let jsExpr = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')
                .replace(/[?=]/g, '');
            
            // Handle basic math functions
            jsExpr = jsExpr
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/log\(/g, 'Math.log(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/√/g, 'Math.sqrt');
            
            // Use Function constructor for safe evaluation
            const result = new Function(`return ${jsExpr}`)();
            return Math.round(result * 1000000) / 1000000; // Round to 6 decimal places
        } catch (e) {
            console.error('Evaluation error:', e);
            return null;
        }
    }
}

/**
 * QuestionGenerator - Universal math question generator that works with any expression
 */
class QuestionGenerator {
    constructor(templateQuestion = null) {
        this.template = templateQuestion;
    }
    
    /**
     * Set the template question for pattern-based generation
     */
    setTemplate(questionText) {
        this.template = questionText;
    }
    
    /**
     * Generate a random number within a range, respecting the magnitude of the original
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Analyze a number and determine appropriate range for similar numbers
     */
    getNumberRange(num) {
        const abs = Math.abs(num);
        
        if (abs === 0) return { min: 0, max: 10 };
        if (abs < 10) return { min: 1, max: 12 };
        if (abs < 100) return { min: 10, max: 100 };
        if (abs < 1000) return { min: 100, max: 1000 };
        
        // For larger numbers, use the same order of magnitude
        const magnitude = Math.pow(10, Math.floor(Math.log10(abs)));
        return { min: magnitude, max: magnitude * 10 };
    }
    
    /**
     * Generate a similar question based on a template
     */
    generateFromTemplate(questionText) {
        // Parse the expression to find numbers
        const tokens = MathParser.parse(questionText);
        
        // Replace all numbers with new random numbers in similar ranges
        let newExpression = questionText;
        const numbers = tokens.filter(t => t.type === 'number');
        
        // Sort by position in string (longest first to avoid partial replacements)
        const replacements = [];
        numbers.forEach(token => {
            const range = this.getNumberRange(token.value);
            let newNum = this.randomInt(range.min, range.max);
            
            // Preserve sign
            if (token.value < 0) newNum = -Math.abs(newNum);
            
            replacements.push({
                old: token.value.toString(),
                new: newNum
            });
        });
        
        // Replace numbers in the expression (from longest to shortest to avoid partial matches)
        replacements.sort((a, b) => b.old.length - a.old.length);
        replacements.forEach(r => {
            // Use regex to replace whole numbers only
            const regex = new RegExp('\\b' + r.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
            newExpression = newExpression.replace(regex, r.new);
        });
        
        // Calculate the answer
        const answer = MathParser.evaluate(newExpression);
        
        return {
            question: newExpression,
            answer: answer,
            type: 'parsed'
        };
    }
    
    /**
     * Generate a question (uses template if set, otherwise generates basic arithmetic)
     */
    generate(templateOrType) {
        if (templateOrType && typeof templateOrType === 'string' && templateOrType.includes('=')) {
            // It's a template expression
            return this.generateFromTemplate(templateOrType);
        }
        
        // Fallback: generate basic questions for predefined types
        if (templateOrType === 'addition') {
            const num1 = this.randomInt(1, 100);
            const num2 = this.randomInt(1, 100);
            return {
                question: `${num1} + ${num2} = ?`,
                answer: num1 + num2,
                type: 'addition'
            };
        } else if (templateOrType === 'subtraction') {
            const num1 = this.randomInt(10, 100);
            const num2 = this.randomInt(1, num1);
            return {
                question: `${num1} - ${num2} = ?`,
                answer: num1 - num2,
                type: 'subtraction'
            };
        } else if (templateOrType === 'multiplication') {
            const num1 = this.randomInt(1, 12);
            const num2 = this.randomInt(1, 12);
            return {
                question: `${num1} × ${num2} = ?`,
                answer: num1 * num2,
                type: 'multiplication'
            };
        }
        
        // If no template, generate a random addition question
        return this.generate('addition');
    }
}

/**
 * Lesson - Manages a collection of questions
 */
class Lesson {
    constructor(questionTypeOrTemplate, questionCount) {
        this.template = questionTypeOrTemplate;
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
            this.questions.push(this.generator.generate(this.template));
        }
    }

    /**
     * Refresh a specific question by index
     */
    refreshQuestion(index) {
        if (index < 0 || index >= this.questions.length) {
            throw new Error(`Invalid question index: ${index}. Valid range: 0-${this.questions.length - 1}`);
        }
        // Generate new question using the current question as template
        const currentQuestion = this.questions[index];
        this.questions[index] = this.generator.generate(currentQuestion.question);
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
