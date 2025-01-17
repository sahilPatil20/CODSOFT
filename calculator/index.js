// Select necessary elements
const screen = document.querySelector('.screen'); // Display screen
const buttons = document.querySelectorAll('.btn'); // All buttons
const equals = document.querySelector('.equals'); // Equals button

// Variables to hold calculation data
let currentInput = ''; // Current number or operation being typed
let previousInput = ''; // Previously entered value
let operator = ''; // Current operator

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle numbers and decimal points
        if (!isNaN(value) || value === '00') {
            if (currentInput === '0') {
                currentInput = value; // Replace default "0" with input
            } else {
                currentInput += value; // Append number
            }
        } else if (value === '.') {
            // Prevent multiple decimals
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
        } else {
            // Handle operators
            if (currentInput !== '') {
                if (previousInput === '') {
                    previousInput = currentInput; // Save current input as previous
                } else if (operator !== '') {
                    previousInput = calculate(previousInput, currentInput, operator); // Perform intermediate calculation
                }
            }
            operator = value; // Save operator
            currentInput = ''; // Reset current input for the next number
        }

        updateScreen();
    });
});

// Handle equals button click
equals.addEventListener('click', () => {
    if (currentInput !== '' && previousInput !== '' && operator !== '') {
        currentInput = calculate(previousInput, currentInput, operator); // Perform calculation
        previousInput = ''; // Reset previous input
        operator = ''; // Reset operator
        updateScreen();
    }
});

// Perform calculation
function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case 'X':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error'; // Handle division by zero
        case '%':
            return (a % b).toString();
        default:
            return '';
    }
}

// Update the calculator screen
function updateScreen() {
    screen.value = currentInput || previousInput || '0';
}
