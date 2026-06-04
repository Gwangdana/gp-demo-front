export type SquareValue = "X" | "O" | null;

export interface SquareProps {
    value: SquareValue;
    onClick : () => void;
    isWin: boolean;
}

export interface BoardProps {
    squares: SquareValue[];
    onSquareClick: (index: number) => void;
    winLines: number[];
    currentStep: number;
}

export interface HistoryRecord {
    squares: SquareValue[];
}