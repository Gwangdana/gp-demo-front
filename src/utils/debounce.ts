// 防抖函数的TS泛型实现，支持任意函数类型
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 500
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}