import type { TodoFilterProps} from "../types";

export default function TodoFilter( {filter, onFilterChange }: TodoFilterProps) {
    return (
        <div className="todo-filter">
            <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() =>onFilterChange('all')}
            >
                全部
            </button>
            <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() =>onFilterChange('active')}
            >
                未完成
            </button>
            <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() =>onFilterChange('completed')}
            >
                已完成
            </button>
        </div>
    );
}
