import type {Todo} from "./types";
import type { FilterType} from "./types";
import {useState} from "react";
import TodoInput from "./components/TodoInput.tsx";
import TodoFilter from "./components/TodoFIlter.tsx";
import TodoItem from "./components/TodoItem.tsx";
import './App.css';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        // 这个函数只会在组件首次挂载时执行一次
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos) {
            try {
                return JSON.parse(savedTodos) as Todo[];
            } catch (e) {
                console.error("Failed to parse todos from localStorage", e);
                return [];
            }
        }

        return []; // 默认返回空数组
    });
    const [filter, setFilter] = useState<FilterType>('all');

    const addTodo = (text: string) => {
        const newTodos: Todo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([...todos, newTodos]);
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text:newText} : todo
        ));
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    return (
        <div>
            <h1>TODO LIST</h1>
            <TodoInput onAdd={addTodo} />
            <TodoFilter filter={filter} onFilterChange={setFilter} />
            <div className="todo-list">
                {
                    filteredTodos.map(todo =>(
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                            onToggle={toggleTodo}
                        />
                    ))

                }
                {filteredTodos.length === 0 && <div className="empty-tip">暂无待办事项</div>}
            </div>
        </div>
    );
}