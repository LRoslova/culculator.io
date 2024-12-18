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

//флаг для проверки плавующей точки
let dot_flag = false;    
//флаг для проверки отрицательного числа (пр. -1), а не операции вычитания    
let minus_flag = true;
//типо дисплей калькулятора
let displayValue = screen.value;
//в эти переменные запишутся операнды а и б, а также операция между ними (сложение/вычитание и тп)
let a = document.querySelector('.numberA');
let b = document.querySelector('.numberB');
let operation = document.querySelector('.oper');
//сюда запишется результат операции
let result = 0;
//флаг, нужный для продолжения вычислений на основе result
let next_op_flag = false;

//навешиваем прослушку на клики номеров в калькуляторе
//чекаем валидность строки 
for(let i = 0; i < btn_num.length; i++){
    btn_num[i].addEventListener('click', function(){
        displayValue += btn_num[i].value;
        screen.value = check_start_zero(displayValue);
    })
}

//навешиваем прослушку на кнопку сброса и чистим все поля
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

//навешиваем прослушку на кнопку точки
//если число еще не имело дробной части, то ставим точку, если такая уже была в операнде - игноируем попытку
dot.addEventListener('click', function(){
    if(!dot_flag){
        displayValue += dot.value;
        screen.value = displayValue;
        dot_flag = true;
    }
})

//навешиваем прослушку на клики операций в калькуляторе
//чекаем валидность строки
for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', function(){
        displayValue += operators[i].value;
        screen.value = check_operation(displayValue, operators[i].value);
    })
}

//навешиваем прослушку на кнопку равенства
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
        // тут считает по принципу а% от б (пр. 10% от 100 будет 10)
            result = (+a.textContent) * (+b.textContent) / 100;
            screen.value = `=${cut_result(result)}`;
          break;

    }
    next_op_flag = true;
})

//обрезаем миллиард цифр, что бы красиво в поле помещалось
function cut_result(num){
    let char = num.toString().split('');
    char = char.slice(0, 13);
    // console.log(char);
    result = +(char.join(''));
    return result
}

//проверка начала строки на всякие минусы, нули и пр.
function check_start_zero(str){
    /*получаем на вход строку, которую планируем вывести на экран 
    и дробим её на массив символов*/
    let charArr = str.split('', 3);
    /*тут обрабатываем попытку начать ввод числа с 00,
    отобразим красиво только один 0*/
    if(charArr[0] == '0' && charArr[1] == '0'){
        displayValue = '0';
        return displayValue;
    /*тут ввод по типу -00, также стираем второй 0*/
    }else if(charArr[0] == '-' && charArr[1] == '0'&& charArr[2] == '0'){
        displayValue = '-0';
        return displayValue;
    /*тут ввод начат с . дорисовываем как надо до 0. 
    (пр.  ввод .2 станет 0.2)*/
    }else if(charArr[0] == '.'&& charArr[1]){
        displayValue = `0.${charArr[1]}`;
        return displayValue;
    /*если ввели 0 и ещё какую то циферку, то выводим только цифру без 0 */
    }else if(charArr[0] == '0' && charArr[1]){
        if(charArr[1] !== '0' && charArr[1] !== '.'){
            displayValue = `${charArr[1]}`;
            return displayValue;
        }
        displayValue = `${str}`;
        return displayValue;
    /*если операнд начинается с -0(цифра), то 0 убираем и выводим -(цифра)
    пр. -03 станет -3 */
    }else if(charArr[0] == '-' && charArr[1] == '0' && charArr[2] !== '0' && charArr[2] !== '.' && charArr[2] !== undefined){
        displayValue = `-${charArr[2]}`;
        return displayValue;
    
    }else{
        return str;
    }
}

function check_operation(str, op){
    let charArr = str.split('');
    /*если хотим ввести отрицательное число, а не указать операцию
    то меняем флаг*/
    if(charArr[0] == '-' && minus_flag){
        displayValue = str;
        minus_flag = false;
        return displayValue;
    /*если хотим продолжить вычисления на основе полученного result,
    то перезаписываем его в операнд "а", подчищаем некоторые флаги и ждем ввод операнда "б"*/
    }if(next_op_flag){
        a.textContent = result;
        b.textContent = 0;
        operation.textContent = `${op}`;
        dot_flag = false;
        minus_flag = true;
        displayValue = '';
        return displayValue;
    /*считываем "а", когда впервые тыкунли на знак операции, далее ждем ввод "б"*/
    }else{
        readA(charArr);
        operation.textContent = `${op}`;
        dot_flag = false;
        minus_flag = true;
        displayValue = '';
        return displayValue;
    }
}

 /*считываем "а", но не трогаем послдений символ - тк это символ операции*/
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

/*стирает один символ в поле ввода*/
erase.addEventListener('click', function(){
    let charArr = screen.value.split('');
    charArr.splice(charArr.length-1);
    displayValue = charArr.join('');
    screen.value = displayValue;
})