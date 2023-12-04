// Function to apply style when a button is pressed
function buttonPressed() {
    this.style.boxShadow = '0px 3px 0px #666';
}

// Function to remove the style when a button is released
function buttonReleased() {
    this.style.boxShadow = '';
}

// Mousedown and mouseup events on buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', buttonPressed);
    button.addEventListener('mouseup', buttonReleased);
});

// Variables for calculation
let currentInput = '';
let operator = '';
let previousInput = '';
let resultDisplayed = false;

// Function to display numbers on the display
function addToInput(value) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    document.getElementById('display').value = '';
}

// Function to perform operations
function calculate() {
    let calculation;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            calculation = num1 + num2;
            break;
        case '-':
            calculation = num1 - num2;
            break;
        case '×':
            calculation = num1 * num2;
            break;
        case '÷':
            calculation = num1 / num2;
            break;
        case '%':
            calculation = (num1 / 100) * num2;
            break;
        default:
            return;
    }

    currentInput = calculation.toString();
    operator = '';
    previousInput = '';
    resultDisplayed = true;
    document.getElementById('display').value = currentInput;
}

// Click events on buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        switch (buttonValue) {
            case '=':
                calculate();
                break;
            case 'AC':
                clearDisplay();
                break;
            case '+/−':
                currentInput = (-parseFloat(currentInput)).toString();
                document.getElementById('display').value = currentInput;
                break;
            default:
                if (button.classList.contains('operator')) {
                    if (previousInput !== '') {
                        calculate();
                    }
                    operator = buttonValue;
                    previousInput = currentInput;
                    currentInput = '';
                } else {
                    addToInput(buttonValue);
                }
                break;
        }
    });
});
