export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type FilterType = 'all' | 'completed' | 'active';

export interface TodoInputProps {
    onAdd: (text: string) => void;
}

export interface TodoItemProps {
    todo: Todo,
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
    onToggle: (id: number) => void;
}

export interface TodoFilterProps {
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}