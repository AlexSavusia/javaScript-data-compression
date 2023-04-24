function serialize(arr) {
    const bitCount = 8; // количество бит на одно число
    let result = "";
    let prev = 0;
    for (let i = 0; i < arr.length; i++) {
        const delta = arr[i] - prev;
        prev = arr[i];
        let deltaStr = delta.toString(2); // преобразуем разность в двоичную строку
        // дополняем строку нулями до нужной длины
        deltaStr = deltaStr.padStart(Math.ceil(deltaStr.length / bitCount) * bitCount, "0");
        // записываем разность в блоках по bitCount бит
        for (let j = 0; j < deltaStr.length; j += bitCount) {
            const block = deltaStr.substr(j, bitCount);
            result += String.fromCharCode(parseInt(block, 2));
        }
    }
    return result;
}

function deserialize(str) {
    const bitCount = 8;
    let result = [];
    let prev = 0;
    let delta = 0;
    let deltaBits = "";
    for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i);
        // собираем биты разности из блоков по bitCount бит
        deltaBits += byte.toString(2).padStart(bitCount, "0");
        if (deltaBits.length >= bitCount) {
            const deltaBlock = deltaBits.substr(0, bitCount);
            delta = prev + parseInt(deltaBlock, 2);
            prev = delta;
            result.push(delta);
            deltaBits = deltaBits.substr(bitCount);
        }
    }
    return result;
}


//Тесты
const tests = [
    [1, 2, 3, 4, 5], // простой случай
    Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1), // 50 случайных чисел
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1), // 100 случайных чисел
    Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1), // 500 случайных чисел
    Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1), // 1000 случайных чисел
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 10) + 1), // все числа 1 знака
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 90) + 10), // все числа из 2х знаков
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 900) + 100), // все числа из 3х знаков
    Array.from({ length: 300 }, () => 1), // каждое число - 1, всего 300 чисел
    Array.from({ length: 300 }, () => 111), // каждое число - 111, всего 300 чисел
    Array.from({ length: 300 }, () => 222), // каждое число - 222, всего 300 чисел
    Array.from({ length: 300 }, () => 123), // каждое число - 123, всего 300 чисел
    Array.from({ length: 900 }, () => 123), // каждое число - 123, всего 900 чисел
];

for (let i = 0; i < tests.length; i++) {
    const arr = tests[i];
    const serialized = serialize(arr);
    const deserialized = deserialize(serialized);
    const compressionRatio = serialized.length / (arr.length * 2); // считаем коэффициент сжатия
    console.log(`Test ${i + 1}:`);
    console.log(`Input array: ${arr.join(", ")}`);
    console.log(`Serialized string: ${serialized}`);
    console.log(`Deserialized array: ${deserialized.join(", ")}`);
    console.log(`Compression ratio: ${compressionRatio.toFixed(2)}\n`);
}