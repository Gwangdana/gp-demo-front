import {useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer)
    }, []);
    return <div>{time.toLocaleTimeString()}</div>
}