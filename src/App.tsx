import { useState} from "react";

export default function MyApp() {
    return (
        <div>
            <h1 title={"按钮计数器"} />
            <MyButton />
            <MyButton />
        </div>
    );
}

function MyButton () {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count+1);
    }
    return (
        <button onClick={handleClick}>
            点了{count}次
        </button>
    );
}