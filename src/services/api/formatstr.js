export function formatStr(str) {
    str = str.replace(/(\.(.*))/g, '');
    let arr = str.split('');
    let str_temp = '';

    if (str.length > 3) {
        for (let i = arr.length - 1, j = 1; i >= 0; i--, j++) {
            str_temp = arr[i] + str_temp;

            if (j % 3 === 0) {
                str_temp = ' ' + str_temp;
            }
        }

        return str_temp;

    } else {
        return str;
    }
}