//№1
function bubbleSort(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr
}
arr = prompt("Напишите массив", ' ').split(" ")
alert(bubbleSort(arr))

//№2
function count(arr) {
    let pairs = new Map();
    uniqueNums = Array.from(new Set(arr));
    for (let i = 0; i < uniqueNums.length; i++) {
        pairs.set(uniqueNums[i], 0);
    }
    for (let a = 0; a < arr.length; a++) {
        pairs.set(arr[a], pairs.get(arr[a]) + 1);
    }
    for (let [key, value] of pairs) {
        if (value < 2) {
            pairs.delete(key);
        }
    }
    return pairs;
}

console.log(count([2, 1, 5, 2, 5]));

//№3
function bubbleSort(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    if (par == "min") {
        return arr[0];
    }
    else if (par == "max") {
        return arr[arr.length - 1];
    }

}

function maxAmongMin(matrix) {
    let mins = [];
    for (let i = 0; i < matrix.length; i++) {
        mins.push(bubbleSort(matrix[i], "min"));
        console.log(mins);
    }
    return bubbleSort(mins, "max")
}

let mas = [
    [1, 5, 3],
    [4, 8, 3],
    [5, 1, 4],
];

console.log(maxAmongMin(mas));


//№4
class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
};

function sumVectors(v1, v2) {
    let v3 = new Vector(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z,
    );
    return v3;
}

function subVectors(v1, v2) {
    let v3 = new Vector(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z,
    );
    return v3;
}

function multVectors(v1, v2) {
    let v3 = new Vector(
        v1.x * v2.x,
        v1.y * v2.y,
        v1.z * v2.z,
    );
    return v3;
}

function multScalVector(v1, scal) {
    let v3 = new Vector(
        v1.x * scal,
        v1.y * scal,
        v1.z * scal,
    );
    return v3;
}

function vecLength(v1) {
    let sum = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
    len = Math.sqrt(sum);
    return len + " or sqrt(" + sum + ")";
}

function multScalVectors(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

let AB = new Vector(1, 1, 3);
let FS = new Vector(4, 3, 0);

console.log(AB, FS);
console.log(sumVectors(AB, FS));
console.log(subVectors(AB, FS));
console.log(multVectors(AB, FS));
console.log(multScalVector(AB, 3));
console.log(multScalVectors(AB, FS));
console.log(vecLength(AB));

//№5
function plusK(arr, k) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i])
        arr[i] += k
    }
    return arr;
}

arr = prompt("Enter an array", '').split(",")
k = parseInt(prompt("Enter a k value", ''))
alert(plusK(arr, k))