function pow(x, n) {
    let result = x;

    for (let i = 1; i < n; i++) {
        result *= x;
    }

    return result;
}

let x = prompt("Введите число", '');
let n = prompt("Введите степень", '');

if (n < 1) {
    alert(`Степень ${n} не натуральное число`);
} else {
    alert(pow(x, n));
}