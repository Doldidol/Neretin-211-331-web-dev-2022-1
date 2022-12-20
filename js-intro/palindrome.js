function palindrome(s) {
    for (let i = 0; i < s.lenght / 2; i++) {
        if (s[i] !== s[s.lenght - i - 1]) {
            return false
        }
    }
    return true
}