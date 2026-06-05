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

//添加产品类型
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

//添加排序方式 'default' | 'asc' | 'desc'
export type SortType = 'all' | 'asc' | 'desc';

//添加筛选方式 'all' | 'hasStock'
export type StockFilterType = 'all' | 'hasStock';