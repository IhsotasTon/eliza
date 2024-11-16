// 定义单位数组，用于大数字的缩写
const units: string[] = ['k', 'm', 'b', 't'];

/**
 * 将数字转换为指定精度的字符串
 * @param number 要格式化的数字
 * @param precision 小数点后的精度，默认为1
 * @returns 格式化后的字符串
 */
export function toPrecision(number: number, precision = 1): string {
    return (
        number
            .toString()
            // 保留指定的小数位数
            .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), '$1')
            // 移除末尾的0，但保留至少一位小数
            .replace(/(\.[1-9]*)0+$/, '$1')
            // 如果小数点后没有数字，则移除小数点
            .replace(/\.$/, '')
    );
}

/**
 * 缩写数字
 * @param number 数字
 * @returns 格式化后的数字字符串
 */
export function abbreviateNumber(number: number): string {
    const isNegative = number < 0;
    const absNumber = Math.abs(number);

    // 如果绝对值小于1，保留3位小数
    if (absNumber < 1) return (isNegative ? '-' : '') + toPrecision(absNumber, 3);
    // 如果绝对值小于100，保留2位小数
    if (absNumber < 10 ** 2) return (isNegative ? '-' : '') + toPrecision(absNumber, 2);
    // 如果绝对值小于10000，使用千分位格式化并保留1位小数
    if (absNumber < 10 ** 4) {
        const formatted = new Intl.NumberFormat().format(
            Number.parseFloat(toPrecision(absNumber, 1)),
        );
        return isNegative ? `-${formatted}` : formatted;
    }

    const decimalsDivisor = 10 ** 1;
    let result: string = String(absNumber);

    // 遍历单位数组，找到合适的缩写单位
    for (let i = units.length - 1; i >= 0; i--) {
        const size = 10 ** ((i + 1) * 3);
        if (size <= absNumber) {
            // 计算缩写后的数值
            const abbreviatedNumber = (absNumber * decimalsDivisor) / size / decimalsDivisor;
            // 格式化数值并添加单位
            result = toPrecision(abbreviatedNumber, 1) + units[i];
            break;
        }
    }

    return isNegative ? `-${result}` : result;
}
