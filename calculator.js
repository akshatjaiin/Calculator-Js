document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button');
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            console.log(`Button pressed: ${value}`); // Debugging line

            if (value === 'AC') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.value = '0';
                console.log('All clear');
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
                console.log('Deleted last digit');
            } else if (value === '=') {
                if (previousInput && currentInput && operator) {
                    try {
                        currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                        display.value = currentInput;
                        operator = '';
                        previousInput = '';
                        console.log('Calculation result:', currentInput);
                    } catch (error) {
                        console.error('Error in calculation:', error);
                        display.value = 'Error';
                        currentInput = '';
                        operator = '';
                        previousInput = '';
                    }
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        try {
                            currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
                        } catch (error) {
                            console.error('Error in intermediate calculation:', error);
                            display.value = 'Error';
                            currentInput = '';
                            operator = '';
                            previousInput = '';
                            return;
                        }
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                    display.value = previousInput;
                    console.log(`Operator selected: ${operator}`);
                }
            } else {
                currentInput += value;
                display.value = currentInput;
                console.log(`Current input: ${currentInput}`);
            }
        });
    });
});
