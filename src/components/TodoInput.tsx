import {type FormEvent, useState} from "react";
import type {TodoInputProps} from "../types";

export default function TodoInput({onAdd}: TodoInputProps) {

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onAdd(inputValue);
        setInputValue("");

    };
    return (
        <form className='todo-imput' onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="输入代办事项..."
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <button type='submit'>添加</button>
        </form>
    );
}
