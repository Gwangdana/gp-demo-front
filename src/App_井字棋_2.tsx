import { useState} from "react";
import Board from "./components/Board.tsx";
import type { SquareValue, HistoryRecord} from "./types";
import "./App.css";

function calculateWinner(squares: SquareValue[]): { winner: SquareValue; line: number[] } {
    const lines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line };
        }
    }
    return { winner: null, line: [] };
}

export default function Game() {
    // 状态类型：明确定义history、currentStep的类型
    const [history, setHistory] = useState<HistoryRecord[]>([{squares: Array(9).fill(null)} ]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const currentSquares = history[currentStep].squares;
    const xIsNext = currentStep % 2 === 0;

    // 点击格子的处理函数
    function handleSquareClick(index: number) {
        if (currentSquares[index] || calculateWinner(currentSquares).winner) return;
        const newHistory = history.slice(0, currentStep + 1);
        const newSquares = [...currentSquares];
        newSquares[index] = xIsNext ? 'X' : 'O';
        setHistory([...newHistory, { squares: newSquares }]);
        setCurrentStep(newHistory.length);
    }

    // 重置游戏
    function resetGame() {
        setHistory([{ squares: Array(9).fill(null) }]);
        setCurrentStep(0);
    }

    // 历史步骤跳转
    function jumpTo(step: number) {
        setCurrentStep(step);
    }

    // 胜负/平局/下一步状态提示
    const { winner, line: winLines } = calculateWinner(currentSquares);
    let status: string;
    if (winner) {
        status = `胜利方：${winner}`;
    } else if (currentStep === 9) {
        status = '平局！';
    } else {
        status = `下一步：${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <>
            <h1>井字棋（TSX增强版）</h1>
            <div className="status">{status}</div>
            <div className="game">
                <Board
                    squares={currentSquares}
                    onSquareClick={handleSquareClick}
                    winLines={winLines}
                    currentStep={currentStep}
                />
            </div>
            <div className="history">
                <h3>历史步骤</h3>
                {history.map((_, step) => (
                    <button
                        key={step}
                        className={`history-btn ${step === currentStep ? 'active' : ''}`}
                        onClick={() => jumpTo(step)}
                    >
                        {step === 0 ? '回到开局' : `第${step}步`}
                    </button>
                ))}
            </div>
            <button className="reset-btn" onClick={resetGame}>重置游戏</button>
        </>
    );
}