document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            if (value === 'AC') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '0';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
            } else if (value === '=') {
                if (previousInput && currentInput && operator) {
                    currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                    operator = '';
                    previousInput = '';
                    display.value = currentInput;
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                        display.value = currentInput;
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});
