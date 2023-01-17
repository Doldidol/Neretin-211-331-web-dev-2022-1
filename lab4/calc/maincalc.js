

function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}


function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}


function isDigit(str) {
    return /^\d{1}$/.test(str);
}

// Проверка, является ли строка str оператором.


function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

//Функция tokenize принимает один аргумент -- строку
//с арифметическим выражением и делит его на токены
//(числа, операторы, скобки). Возвращаемое значение --
//массив токенов.
//например, для 6*(3.5-2.5)+9/3
//вернется массив ['6','*','(','3.5','-','2.5',')','+','9','/','3']
// 2*(3+1)
// 8

function tokenize(str) {
    let tokens = []; //массив токенов
    let lastNumber = ''; //строка для корректного парсинга числа
    //проход по всем символам из строки
    for (char of str) {
        //проверка на число
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            //обнуление переменной для последнего числа
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        }
        //проверка на оператор или скобку
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        }
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    //возврат массива токенов
    return tokens;
}

// Функция compile принимает один аргумент - строку
// с арифметическим выражением, записанным в инфиксной
// нотации, и преобразует это выражение в обратную
// польскую нотацию. Возвращаемое значение -
// результат преобразования в виде строки, в которой
// операторы и операнды отделены друг от друга пробелами.
// Выражение может включать действительные числа, операторы
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции

function compile(str) {
    let out = []; //массив вывода
    let stack = []; //массив stack
    // для каждого токена из массива токенов
    for (token of tokenize(str)) {
        // проверка на число
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            // в случае, если токен является оператором
            while (stack.length > 0 &&
                isOperation(stack[stack.length - 1]) &&
                priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            // в случае если токен является открытой скобкой
            stack.push(token);
        } else if (token == ')') {
            // в случае если токен является закрытой скобкой
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    // запись оставшихся операторов в вывод
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    // возврат строки
    console.log(out);
    return out.join(' ');
}

//Функция evaluate принимает один аргумент -- строку
//с арифметическим выражением, записанным в обратной
//польской нотации. Возвращаемое значение -- результат
//вычисления выражения. Выражение может включать
//действительные числа и операторы +, -, *, /.
//Вам нужно реализовать эту функцию


function evaluate(str) {

    let strings = compile(str).split(' ');
    let res = [];
    for (char of strings) {
        if (isDigit(char) || isNumeric(char)) {
            res.push(parseFloat(char));
        } else {
            let num1 = res.pop();
            let num2 = res.pop();
            if (char == '+') {
                res.push(num1 + num2).toFixed(2);
            } else if (char == '-') {
                res.push(num2 - num1).toFixed(2);
            } else if (char == '*') {
                res.push(num1 * num2).toFixed(2);
            } else if (char == '/') {
                res.push(num2 / num1).toFixed(2);
            }
        }
    }
    return res.pop().toFixed(2);
}

// Функция clickHandler предназначина для обработки
// событий клика по кнопкам калькулятора.
// По нажатию на кнопки с классами digit, operation и bracket
// соответствующие нажатой кнопке символы.
// По нажатию на кнопку с классом clear содержимое экрана
// должно очищаться.
// По нажатию на кнопку с классом result на экране
// должен появляться результат вычисления введенного выражения
// с точностью до двух знаков после точки.
// Реализуйте эту функцию. Воспользуйтесь миханизмом делегирования.


function clickHandler(event) {

    if ((event.target.className == "digits") ||
        (event.target.className == "other")) return;

    let mes = document.querySelector(".mes");

    if (event.target.className == "key clear") {
        mes.innerHTML = null;
    } else if (event.target.className == "key result") {
        mes.innerHTML = evaluate(mes.innerHTML);
    } else {
        mes.innerHTML += event.target.innerHTML;
    }
}


window.onload = function () {

    let buttons = document.querySelector(".buttons");
    buttons.onclick = clickHandler;
};