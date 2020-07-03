LOWER_CASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

UPPER_CASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

NUMBER = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

SYMBOL_0 = [];

SYMBOL_1 = ['_', '-'];

SYMBOL_2 = ['_', '-', '!', '@', '#', '$', '%'];

DIGITS = [];

function joint_digits(symbol) {
    let NUMBER_SYMBOL = [].concat(NUMBER).concat(symbol);

    for (let i = 0; i < LOWER_CASE.length; i++) {
        DIGITS[i * 4] = LOWER_CASE[i];
        DIGITS[i * 4 + 2] = UPPER_CASE[i];
    }
    for (let i = 0; i < LOWER_CASE.length * 2; i++) {
        DIGITS[i * 2 + 1] = NUMBER_SYMBOL[i % NUMBER_SYMBOL.length];
    }
}

function encrypt(password, key) {
    if (password && key) {
        let code1 = md5(password, key);
        let code2 = md5(key, password);
        let code3 = md5(code1, code2);
        let result = [];
        for (let i = 0; i < 16; i++) {
            let slice = code3.slice(i * 2, i * 2 + 2);
            let number = parseInt(slice, 16);
            number = number % DIGITS.length;
            result[i] = DIGITS[number];
        }

        let temp = result;
        for (let i = 0; i < result.length; i++) {
            temp[i] = result[i];
        }
        let i;
        for (i = 0; i < temp.length; i++) {
            let c = temp[i];
            if (c >= '0' && c <= '9') {
                temp[result.length + i] = c;
            } else {
                break;
            }
        }
        for (let j = 0; j < result.length; j++) {
            result[j] = temp[i + j];
        }
        return result.join("");
    } else {
        return "";
    }

}


