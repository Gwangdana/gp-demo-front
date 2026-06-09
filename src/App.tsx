import {useReducer,useEffect} from 'react'
import {todoReducer,initState} from './reducer/todoReducer'
import TodoInput from "./components/TodoInput.tsx";
import TodoFilter from "./components/TodoFIlter.tsx";
import TodoItem from "./components/TodoItem.tsx";

export default function App() {
    const [state, dispatch] = useReducer(todoReducer, initState)
    const {todos, filter} = state

    // 本地存储
    useEffect(() => {
        const s = localStorage.getItem('todos')
        if (s) dispatch({type: 'INIT', payload: JSON.parse(s)})
    }, [])
    useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)), [todos])

    // 过滤列表
    const filterList = todos.filter(item => {
        if (filter === 'active') return !item.completed
        if (filter === 'completed') return item.completed
        return true
    })

    return (
        <div className="todo-container">
            <TodoInput onAdd={(text)=>dispatch({type:'ADD',payload:{id:Date.now(),text,completed:false}})}/>
            <TodoFilter filter={filter} onFilterChange={(f)=>dispatch({type:'FILTER',payload:f})}/>
            {filterList.map(item=>(
                <TodoItem
                    key={item.id}
                    todo={item}
                    onDelete={(id)=>dispatch({type:'DEL',payload:id})}
                    onToggle={(id)=>dispatch({type:'TOGGLE',payload:id})}
                    onEdit={(id,text)=>dispatch({type:'EDIT',payload:{id,text}})}
                />
            ))}
        </div>
    )
}