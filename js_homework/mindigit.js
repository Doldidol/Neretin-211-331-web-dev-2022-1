function minDigit(number) {
    if (number < 0) throw new RangeError("Введите положительное число");
    if (number < 10) return number;
    return Math.min(number % 10, minDigit(parseInt(number / 10)));
}
num = prompt("Введите число:", ' ');
alert("Наименьшая цифра целого неотрицательного числа " + num + " = " + minDigit(num))