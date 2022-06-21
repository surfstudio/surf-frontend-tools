const decode = (str: string) => {
    let output;

    try {
        output = JSON.parse(str);
    } catch (error) {
        output = JSON.parse(str.replace(/&quot;/g, '"'));
    }

    return output;
};

const encode = <T>(obj: T) => {
    return JSON.stringify(obj);
};

export { decode, encode };
