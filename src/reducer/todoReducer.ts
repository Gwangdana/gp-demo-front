import type {FilterType, Todo} from "../types";

type Action =
    |{type:'ADD';payload:Todo}
    |{type:'DEL';payload:number}
    |{type:'TOGGLE';payload:number}
    |{type:'EDIT';payload:{id:number,text:string}}
    |{type:'FILTER';payload:FilterType}
    |{type:'INIT';payload:Todo[]}

interface State {
    todos: Todo[],
    filter: FilterType
}

export const initState : State = {
    todos: [],
    filter: 'all'
}

export function todoReducer(state: State, action: Action) {
    switch (action.type) {
        case 'ADD':
            return {...state, todos: [...state.todos, action.payload]};
        case 'DEL':
            return {...state,todos:state.todos.filter(i=>i.id!==action.payload)}
        case 'TOGGLE':
            return {...state,todos:state.todos.map(i=>i.id===action.payload?{...i,completed:!i.completed}:i)}
        case 'EDIT':
            return {...state,todos:state.todos.map(i=>i.id===action.payload.id?{...i,text:action.payload.text}:i)}
        case 'FILTER':
            return {...state,filter:action.payload}
        case 'INIT':
            return {...state,todos:action.payload}
        default:
            return state
    }
}