export const random_string = (length: number): string => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const formatter_process_no = (processNo: string[]): string => {
    if(!Array.isArray(processNo) || processNo.length === 0) {
        return '';
    }
    return processNo.join(',')
};