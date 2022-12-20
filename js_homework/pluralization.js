function pluralizeRecords(n) {
    let l_num = n % 10;
    if (n >= 11 && n <= 19) {
        alert("В результате выполнения запроса было найдено " + n + " записей")
    }
    else if (l_num == 1) {
        alert("В результате выполнения запроса была найдена " + n + " запись")
    }
    else if (l_num == 2 || l_num == 3 || l_num == 4) {
        alert("В результате выполнения запроса было найдено " + n + " записи")
    }
    else {
        alert("В результате выполнения запроса было найдено " + n + " записей")
    }
}
let n = prompt("n", "")
pluralizeRecords(n)