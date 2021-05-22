import {useEffect, useState} from "react";

export const isFalsy = (value) => (value === 0 ? false : !!value);

export const cleanObject = (object) => {
    // Object.assign({},object);
    const result = {...object};
    Object.keys(result).forEach((key) => {
        const value = object[key];
        if (!isFalsy(value)) {
            delete result[key];
        }
    });
    return result;
};

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
};


export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value或delay值变化以后，就设置一个定时器
        console.log(value)
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
      // 每次在上一次 useEffect执行完后的回调函数，负责清理定时器
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue;
}