# QuestionGenerator

A dynamic question generator application for practicing math problems with an interactive refresh feature.

## Features

- **Dynamic Question Generation**: Generate questions for different math operations (addition, subtraction, multiplication)
- **Refresh Functionality**: Each question has a refresh button (🔄) to generate a new question of the same type
- **Customizable Lessons**: Create lessons with any number of questions (1-50)
- **Answer Validation**: Check your answers and get instant feedback
- **Multiple Question Types**: 
  - Addition: Random numbers from 1-100
  - Subtraction: Random numbers ensuring positive results
  - Multiplication: Times tables (1-12)
- **Responsive Design**: Beautiful, card-based layout that works on all screen sizes

## Usage

1. **Open the Application**: Open `index.html` in a web browser
2. **Select Question Type**: Choose from Addition, Subtraction, or Multiplication
3. **Set Number of Questions**: Enter how many questions you want (default: 20)
4. **Generate Lesson**: Click the "Generate Lesson" button
5. **Answer Questions**: Type your answer in the input field and click "Check Answer"
6. **Refresh Questions**: Click the refresh button (🔄) in any question card to generate a new question

## Example

As specified in the requirements, a lesson can have 20 questions, and you can click a refresh button in the corner of any question to generate a new one. For example:
- Create an Addition lesson with 20 questions
- Each question has its own refresh button
- Clicking refresh generates a new addition question for that card

## Architecture

### Files

- **index.html**: Main HTML structure
- **styles.css**: Styling and animations
- **questionGenerator.js**: Core question generation logic
  - `QuestionGenerator` class: Handles question generation for different types
  - `Lesson` class: Manages collections of questions
- **app.js**: Application logic and UI interactions

### Key Components

#### QuestionGenerator Class
Generates random math questions based on type:
- `generateAddition()`: Creates addition problems
- `generateSubtraction()`: Creates subtraction problems
- `generateMultiplication()`: Creates multiplication problems
- `generate(type)`: Main method to generate questions of any type

#### Lesson Class
Manages a collection of questions:
- `initialize()`: Creates initial set of questions
- `refreshQuestion(index)`: Generates a new question at a specific position
- `getQuestion(index)`: Retrieves a specific question
- `getAllQuestions()`: Returns all questions in the lesson

#### App Class
Handles UI interactions:
- `generateLesson()`: Creates a new lesson based on user selections
- `refreshQuestion(index)`: Updates UI when a question is refreshed
- `checkAnswer(index)`: Validates user answers

## Extensibility

The system is designed to be easily extensible with new question types:

1. Add a new generator method to the `QuestionGenerator` class
2. Register it in the `generators` object
3. Add the option to the HTML dropdown

Example:
```javascript
generateDivision() {
    const num2 = this.randomInt(1, 12);
    const num1 = num2 * this.randomInt(1, 12); // Ensure even division
    return {
        question: `${num1} ÷ ${num2} = ?`,
        answer: num1 / num2,
        type: 'division'
    };
}
```

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- CSS Flexbox

## License

MIT License