let display = document.getElementById('result');
let currentValue = '0';

function updateDisplay() {
    display.value = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    updateDisplay();
}

function deleteChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function appendNumber(num) {
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else if (num === '.' && currentValue.includes('.')) {
        // Prevent multiple decimal points
        return;
    } else {
        currentValue += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    const lastChar = currentValue.slice(-1);
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        currentValue = currentValue.slice(0, -1) + operator;
    } else {
        currentValue += operator;
    }
    updateDisplay();
}

function calculate() {
    try {
        // Replace × with * for calculation
        let expression = currentValue.replace(/×/g, '*');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        currentValue = result.toString();
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentValue = '0';
            updateDisplay();
        }, 1500);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteChar();
    }
});
