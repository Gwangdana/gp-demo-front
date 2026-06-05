import { useState} from "react";
import type { TodoItemProps} from "../types";

export default function TodoItem( {todo, onEdit, onToggle, onDelete}: TodoItemProps ) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(todo.text);
    const handleSave = (): void => {
        if(!editValue.trim()) return;
        onEdit(todo.id, editValue);
        setIsEditing(false);
    }

    return (
        <div className= {`todo-item ${todo.completed} ? 'completed':''`}>
            {isEditing ? (
                <input type="text"
                       value={editValue}
                       onChange={e => setEditValue(e.target.value)}
                       onBlur={handleSave}
                       onKeyDown={(e) => e.key === 'Enter' || e.key === ' '}
                />
            ) : (
                <>
                    <span onClick={() => onToggle(todo.id)}></span>
                    <div className="todo-actions">
                        <button onClick={() =>setIsEditing(true)}>编辑</button>
                        <button onClick={() =>onDelete(todo.id)}>删除</button>
                    </div>
                </>
            )}
        </div>
    );
}