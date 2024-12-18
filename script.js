// HW-final (CALCULATOR JS)
// Сделать приложение "CALCULATOR" и попробовать максимально близко повторить функционал. За образец работы можно взять дефолтный калькулятор windows, с уменьшенным кол-вом кнопок (образец для кнопок берем из прикрепленного изображения). Метод eval - использовать нельзя.
// Имя ветки выбираем любое, например feature. В ветке создаем 3 файла: js, html, css. (пишем на JS, сборщики, препроцессоры и т.д не используем). В визуализацию  не углубляемся. Далее делаем PR в main(master) ветку и ссылку скидываем мне. Ссылку нужно скинуть до 9.00 20 декабря.

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
          screen.value = `=${cut_result(result)}`;
          break;
        case '-':
            result = (+a.textContent) - (+b.textContent);
            screen.value = `=${cut_result(result)}`;
          break;
        case '*':
            result = (+a.textContent) * (+b.textContent);
            screen.value = `=${cut_result(result)}`;
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
            screen.value = `=${cut_result(result)}`;
          break;
        case '%':
            result = (+a.textContent) * (+b.textContent) / 100;
            screen.value = `=${cut_result(result)}`;
          break;

    }
    next_op_flag = true;
})
function cut_result(num){
    let char = num.toString().split('');
    char = char.slice(0, 13);
    // console.log(char);
    result = +(char.join(''));
    return result
}

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
    
    }else if(charArr[0] == '0' && charArr[1]){
        if(charArr[1] !== '0' && charArr[1] !== '.'){
            displayValue = `${charArr[1]}`;
            return displayValue;
        }
        displayValue = `${str}`;
        return displayValue;
    
    }else if(charArr[0] == '-' && charArr[1] == '0' && charArr[2] !== '0' && charArr[2] !== '.' && charArr[2] !== undefined){
        displayValue = `-${charArr[2]}`;
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
}

function readB(str){
    b.textContent = displayValue;
}

erase.addEventListener('click', function(){
    let charArr = screen.value.split('');
    charArr.splice(charArr.length-1);
    displayValue = charArr.join('');
    screen.value = displayValue;
})