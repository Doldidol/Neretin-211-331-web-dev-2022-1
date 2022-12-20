function cesar(action, shift, text) {
    alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']
    mess = ''
    shift = Number(shift)
    if (action == 'encode') {
        for (let i = 0; i < text.length; i++) {
            if (alphabet.includes(text[i])) {
                letter_id = alphabet.indexOf(text[i])
                if ((letter_id + shift) >= alphabet.length) {
                    mess = mess + (alphabet[(letter_id + shift) - alphabet.length])
                }
                else {
                    mess = mess + (alphabet[letter_id + shift])
                }
            }
            else {
                mess = mess + text[i]
            }
        }
    }
    else if (action == 'decode') {
        for (let i = 0; i < text.length; i++) {
            if (alphabet.includes(text[i])) {
                letter_id = alphabet.indexOf(text[i])
                if ((letter_id - shift) < 0) {
                    mess = mess + (alphabet[(letter_id - shift) + alphabet.length])
                }
                else {
                    mess = mess + (alphabet[letter_id - shift])
                }
            }
            else {
                mess = mess + text[i]
            }

        }
    }
    return mess
}
action = prompt("Вы хотите encode или decode?", ' ')
shift = prompt("Какой сдвиг?", ' ')
text = prompt("Введите текст", ' ')
alert(cesar(action, shift, text))