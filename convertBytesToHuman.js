/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

function roundNum(number){
    /*
    * методом  проб и ошибок замечено, что плохо умножает float'ы
    *     1.005*100 -> 100.49999999999999
    *     10.005*100 -> 1000.5000000000001
    *  поэтому добавляем маленькое число чтобы все ок было
    */
    return +(Math.round(number * 100 + 1e-7) / 100);
}

const isPositiveNumber = (value) => {
    return typeof value === 'number' && value >= 0
}

export default function convertBytesToHuman(bytes) {
    if (isPositiveNumber(bytes)){
        let sizeIndex = 0;
        sizeIndex = Math.trunc(Math.log2(bytes) / 10);
        bytes = bytes / Math.pow(2, sizeIndex * 10);
        return `${roundNum(bytes)} ${sizes[sizeIndex]}`
    }
    return false
}
