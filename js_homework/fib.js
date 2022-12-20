function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
let n = prompt("Введите n", "");
if (n <= 1000) {
    alert(fib(n));
}
else {
    alert("Число n должно быть меньше, либо равно 1000!")
} 