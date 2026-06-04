import Square from "./Square.tsx";
import type {BoardProps} from "../types";

export default function Board({squares, onSquareClick, winLines, currentStep}: BoardProps) {
    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square key={index}
                        value={square}
                        onClick={() => onSquareClick(index)}
                        isWin={winLines.includes(index) && currentStep !== 0}
                />
            ))}
        </div>
    );
}
