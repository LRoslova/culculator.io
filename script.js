// HW-final (CALCULATOR JS)
// Сделать приложение "CALCULATOR" и попробовать максимально близко повторить функционал. За образец работы можно взять дефолтный калькулятор windows, с уменьшенным кол-вом кнопок (образец для кнопок берем из прикрепленного изображения). Метод eval - использовать нельзя.
// Имя ветки выбираем любое, например feature. В ветке создаем 3 файла: js, html, css. (пишем на JS, сборщики, препроцессоры и т.д не используем). В визуализацию  не углубляемся. Далее делаем PR в main(master) ветку и ссылку скидываем мне. Ссылку нужно скинуть до 9.00 20 декабря.


// document.addEventListener('DOMContentLoaded', function(e){
//     e.preventDefault();
    
// })

console.log('in script');
console.log('loaded');


let screen = document.querySelector('.calculator-screen');
let btn_num = document.querySelectorAll('.number');
let reset = document.querySelector('.clear');
let operators = document.querySelectorAll('.operator');
let dot = document.querySelector('.decimal');
let equal = document.querySelector('.equal-sign');
let erase = document.querySelector('.erase');

let dot_flag = false;
let minus_flag = true;
let displayValue = screen.value;
let a = document.querySelector('.numberA');
let b = document.querySelector('.numberB');
let operation = document.querySelector('.oper');;
let result = 0;
let next_op_flag = false;


for(let i = 0; i < btn_num.length; i++){
    // console.log(i);
    btn_num[i].addEventListener('click', function(){
        displayValue += btn_num[i].value;
        screen.value = check_start_zero(displayValue);

    })
}

reset.addEventListener('click', function(){
    screen.value = '';
    displayValue = '';
    dot_flag = false;
    minus_flag = true;
    a.textContent = 0;
    b.textContent = 0;
    operation.textContent = '';
    result = 0;
    next_op_flag = false;
})

dot.addEventListener('click', function(){
    if(!dot_flag){
        displayValue += dot.value;
        screen.value = displayValue;
        dot_flag = true;
    }
})

for(let i = 0; i < operators.length; i++){
    // console.log(i);
    operators[i].addEventListener('click', function(){
        displayValue += operators[i].value;
        screen.value = check_operation(displayValue, operators[i].value);
    })
}


equal.addEventListener('click', function(){
    readB(displayValue);
    switch (operation.textContent) {
        case '+':
          result = (+a.textContent) + (+b.textContent);
          screen.value = `= ${result}`;
          break;
        case '-':
            result = (+a.textContent) - (+b.textContent);
            screen.value = `= ${result}`;
          break;
        case '*':
            result = (+a.textContent) * (+b.textContent);
            screen.value = `= ${result}`;
          break;
        case '/':
            if(b.textContent == '0') {
                screen.value = 'Ошибка';
                displayValue = '';
                dot_flag = false;
                minus_flag = true;
                result = 0;
                next_op_flag = false;
                return;
            }
            result = (+a.textContent) / (+b.textContent);
            screen.value = `= ${result}`;
          break;
        case '%':
            result = (+a.textContent) * (+b.textContent) / 100;
            screen.value = `= ${result}`;
          break;

    }
    next_op_flag = true;
})


function check_start_zero(str){
    let charArr = str.split('', 3);
    
    if(charArr[0] == '0' && charArr[1] == '0'){
        displayValue = '0';
        return displayValue;
    }else if(charArr[0] == '-' && charArr[1] == '0'&& charArr[2] == '0'){
        displayValue = '-0';
        return displayValue;
    }else if(charArr[0] == '.'&& charArr[1]){
        displayValue = `0.${charArr[1]}`;
        return displayValue;
    }else{
        return str;
    }
}

function check_operation(str, op){
    let charArr = str.split('');
    if(charArr[0] == '-' && minus_flag){
        displayValue = str;
        minus_flag = false;
        return displayValue;
    }if(next_op_flag){
        a.textContent = result;
        b.textContent = 0;
        operation.textContent = `${op}`;
        dot_flag = false;
        minus_flag = true;
        displayValue = '';
        return displayValue;
    }else{
        readA(charArr);
        operation.textContent = `${op}`;
        dot_flag = false;
        minus_flag = true;
        displayValue = '';
        return displayValue;
    }
}

function readA(arr){
    arr.splice(arr.length-1);
    a.textContent = arr.join('');
    if(Number.isNaN(+a.textContent)){
        a.textContent = 0;
    }
    console.log(+a.textContent);
}

function readB(str){
    b.textContent = displayValue;
    console.log(+b.textContent);
}

erase.addEventListener('click', function(){
    let charArr = screen.value.split('');
    charArr.splice(charArr.length-1);
    displayValue = charArr.join('');
    screen.value = displayValue;
})















































































// const calculator = {
//     displayValue: '0',
//     firstOperand: null,
//     waitingForSecondOperand: false,
//     operator: null,
// };

// function inputDigit(digit) {
//     const { displayValue, waitingForSecondOperand } = calculator;

//     if (waitingForSecondOperand === true) {
//         calculator.displayValue = digit;
//         calculator.waitingForSecondOperand = false;
//     } else {
//         calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
//     }
// }

// function inputDecimal(dot) {
//     if (calculator.waitingForSecondOperand === true) return;

//     if (!calculator.displayValue.includes(dot)) {
//         calculator.displayValue += dot;
//     }
// }

// function handleOperator(nextOperator) {
//     const { firstOperand, displayValue, operator } = calculator;
//     const inputValue = parseFloat(displayValue);

//     if (operator && calculator.waitingForSecondOperand) {
//         calculator.operator = nextOperator;
//         return;
//     }

//     if (firstOperand == null && !isNaN(inputValue)) {
//         calculator.firstOperand = inputValue;
//     } else if (operator) {
//         const result = performCalculation[operator](firstOperand, inputValue);

//         calculator.displayValue = String(result);
//         calculator.firstOperand = result;
//     }

//     calculator.waitingForSecondOperand = true;
//     calculator.operator = nextOperator;
// }

// const performCalculation = {
//     '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
//     '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
//     '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
//     '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
//     '=': (firstOperand, secondOperand) => secondOperand
// };

// function resetCalculator() {
//     calculator.displayValue = '0';
//     calculator.firstOperand = null;
//     calculator.waitingForSecondOperand = false;
//     calculator.operator = null;
// }

// function updateDisplay() {
//     const display = document.querySelector('.calculator-screen');
//     display.value = calculator.displayValue;
// }

// updateDisplay();

// const keys = document.querySelector('.calculator-keys');
// keys.addEventListener('click', (event) => {
//     const { target } = event;
//     if (!target.matches('button')) {
//         return;
//     }

//     if (target.classList.contains('operator')) {
//         handleOperator(target.value);
//         updateDisplay();
//         return;
//     }

//     if (target.classList.contains('decimal')) {
//         inputDecimal(target.value);
//         updateDisplay();
//         return;
//     }

//     if (target.classList.contains('all-clear')) {
//         resetCalculator();
//         updateDisplay();
//         return;
//     }

//     inputDigit(target.value);
//     updateDisplay();
// });