# QuestionGenerator

A **universal math question generator** that can parse and generate questions from ANY mathematical expression. Enter any math problem, and the system will analyze it and create similar questions with different numbers while maintaining the pattern.

## 🚀 Key Features

- **Universal Parser**: Works with ANY math expression - from basic arithmetic to advanced calculus
- **Pattern Recognition**: Analyzes your question and generates similar ones with different numbers
- **Smart Refresh**: Each question has a refresh button (🔄) to generate a new variant
- **Intelligent Ranges**: Generates numbers in similar magnitudes to maintain difficulty
- **Dual Modes**: 
  - **Preset Types**: Quick access to basic math (addition, subtraction, multiplication)
  - **Custom Questions**: Enter ANY mathematical expression

## 📖 Usage

### Quick Start
1. Open `index.html` in a web browser
2. Choose your mode:
   - **Preset Types**: Select from predefined question types
   - **Custom Question**: Enter any math expression

### Custom Question Examples

The generator can handle ANY math expression:

```
Basic Arithmetic:
  15 + 23 = ?
  → Generates: 47 + 89 = ?, 12 + 65 = ?, etc.

Order of Operations:
  (12 + 8) × 3 - 5 = ?
  → Generates: (68 + 7) × 8 - 5 = ?, (19 + 1) × 3 - 5 = ?, etc.

Exponents:
  2^3 + 5^2 = ?
  → Generates: 7^3 + 12^2 = ?, 4^3 + 8^2 = ?, etc.

Advanced Math:
  sin(30) + cos(60) = ?
  √(144) - 25 = ?
  2x + 5 = 13
```

### Refresh Functionality
- Each question card has a 🔄 button in the top-right corner
- Click to generate a NEW question with the same pattern
- Works for both preset and custom questions
- Maintains the mathematical structure while changing numbers

## 🏗️ Architecture

### Core Components

#### **MathParser Class**
Parses and evaluates mathematical expressions:
- Tokenizes expressions into numbers, operators, and functions
- Handles complex operations: `+`, `-`, `×`, `÷`, `^`, parentheses
- Supports functions: `sin()`, `cos()`, `tan()`, `log()`, `sqrt()`, `√`
- Safe evaluation using JavaScript Function constructor

#### **QuestionGenerator Class**
Universal pattern-based question generator:
- `generateFromTemplate(questionText)`: Analyzes and replicates patterns
- `getNumberRange(num)`: Determines appropriate ranges based on magnitude
- Preserves mathematical structure while varying numbers
- Calculates correct answers automatically

#### **Lesson Class**
Manages collections of questions:
- `initialize()`: Creates initial question set
- `refreshQuestion(index)`: Generates new question at specific position
- Uses current question as template for regeneration

#### **App Class**
Handles UI and user interactions:
- Mode switching (preset vs. custom)
- Lesson generation
- Question refresh functionality
- Answer validation with floating-point tolerance

## 🎯 How It Works

```javascript
// Example: User enters "(12 + 8) × 3 - 5 = ?"

1. Parse Expression:
   → Tokens: [12, +, 8, ), ×, 3, -, 5]
   
2. Identify Numbers:
   → [12, 8, 3, 5]
   
3. Determine Ranges:
   → 12: range [10-100]
   → 8: range [1-12]
   → 3: range [1-12]
   → 5: range [1-12]
   
4. Generate New Numbers:
   → [68, 7, 8, 5]
   
5. Reconstruct Expression:
   → "(68 + 7) × 8 - 5 = ?"
   
6. Calculate Answer:
   → 595
```

## 🔧 Extensibility

The system is designed to be easily extended:

### Adding New Functions
```javascript
// In MathParser.evaluate()
jsExpr = jsExpr.replace(/factorial\(/g, 'Math.factorial(');
```

### Adding New Operators
```javascript
// In MathParser.parse()
if (/[+\-×*÷/^%!]/.test(char)) {
    tokens.push({ type: 'operator', value: char });
}
```

## 📁 File Structure

```
questionGenerator.js  - Core logic (MathParser, QuestionGenerator, Lesson)
app.js               - UI and event handling
index.html           - Application structure
styles.css           - Styling and animations
README.md            - Documentation
```

## 🎨 Features

- ✅ Universal expression parsing
- ✅ Pattern-based generation
- ✅ Smart number range selection
- ✅ Refresh per question
- ✅ Answer validation (with floating-point tolerance)
- ✅ Responsive design
- ✅ No external dependencies
- ✅ Works offline

## 🔍 Technical Details

**Number Range Selection:**
- Single digits (< 10): range [1-12]
- Tens (< 100): range [10-100]
- Hundreds (< 1000): range [100-1000]
- Larger: maintains order of magnitude

**Answer Validation:**
- Tolerance: 0.01 for floating-point comparison
- Handles integer and decimal answers
- Displays formatted results

**Expression Support:**
- Arithmetic: `+`, `-`, `×`, `*`, `÷`, `/`
- Exponents: `^`, `**`
- Parentheses: `()`, nested support
- Functions: `sin`, `cos`, `tan`, `log`, `sqrt`, `√`
- Order of operations: Full PEMDAS support

## 🌐 Browser Support

Works in all modern browsers supporting:
- ES6 JavaScript (classes, arrow functions, template literals)
- CSS Grid and Flexbox
- HTML5

## 📝 Example Use Cases

1. **Math Teachers**: Create unlimited practice problems for students
2. **Students**: Practice with dynamically generated questions
3. **Tutors**: Generate customized problem sets
4. **Self-Study**: Learn at your own pace with instant feedback
5. **Assessment**: Create unique test questions on-the-fly

## 🎓 Educational Value

- **Adaptive Learning**: Questions match the complexity of the template
- **Variety**: Each refresh creates a unique problem
- **Immediate Feedback**: Check answers instantly
- **Pattern Recognition**: Students learn to identify mathematical structures
- **Scalable Difficulty**: Use simple or complex templates as needed

## 🚀 Future Enhancements

Potential additions:
- Save/load custom question templates
- Question difficulty levels
- Performance tracking
- Multiple answer formats (fractions, mixed numbers)
- Step-by-step solutions
- Export to PDF
- Collaborative question sharing

## 📄 License

MIT License