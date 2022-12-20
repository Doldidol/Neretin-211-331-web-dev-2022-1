function gcd(x, y) {
    if (y > x) return gcd(y, x);
    if (!y) return x;
    return gcd(y, x % y);
}
x = prompt("Первое число?", ' ')
y = prompt("Второе число?", ' ')
alert("Наибольший общий делитель = " + gcd(x, y))