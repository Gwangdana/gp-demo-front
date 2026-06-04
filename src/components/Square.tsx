import type {SquareProps} from "../types";

export default function Square({value, onClick, isWin} : SquareProps) {
    return (
        <button className= {'square '+ (isWin ? 'win-square':'')} onClick={onClick} >
            {value}
        </button>
    );
}

