const panel = document.getElementById('panel01');
const input = document.getElementById('input');
input.readOnly = true;
let display = '';
let operator = null;
let a, b, sign


function addDigit(digit) {
    if (digit === '.' && display.includes('.')) return;
    if (String(display).length >= 16) return;
    display = (display === '0')? digit: display += digit
}

function oper(operator) {
    a = Number(display);
    display = '';
    sign = operator
}

function calculate(operator) {
    b = Number(display)
    switch (operator) {
        case '+': display = a + b; break;
        case '-': display = a - b; break;
        case '/': display = a / b; break;
        case '*': display = a * b; break;
        case '^': display = a ** b; break;
    }
    sign = null;   
    }

panel.addEventListener('click', function(event) {
    const button = event.target;
    if (button.tagName === 'BUTTON') {
        const action = button.dataset.action;
        switch (action) {
            case 'C':
                display = ''
                break;
            case '+-':
                display = -Number(display);
                break;
            case 'del':
                display = display.slice(0,-1);
                input.value = display;
                break;
            case '9':
            case '8':
            case '7':
            case '6':
            case '5':
            case '4':
            case '3':
            case '2':
            case '1':
            case '0':
            case '.':
                addDigit(action);
                break;
            case '-': oper('-'); break;
            case '+': oper('+'); break;
            case '/': oper('/'); break;
            case '*': oper('*'); break;
            case '^': oper('^'); break;
            case '=':
                calculate(sign);
                break;
        }
        if (display === '') display = '0';
        input.value = display;
    }
})

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if ((key >= 0 && key <= 9) || key === '.') {
        addDigit(key);
        input.value = display;
        return;
    }

    if (['+','-','/','*','^'].includes(key)) {
        oper(key);
        return;
    }

    switch (key) {
        case('Enter'): calculate(sign); break;
        case('Backspace'):
            display = display.slice(0,-1);
            input.value = display;
            break;
        case('c'):
        case('C'):
            display = ''
            break; 
    }
    input.value = display;
})