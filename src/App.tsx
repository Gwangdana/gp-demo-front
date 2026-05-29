import {useState} from "react";

export default function Board() {
    const [values, setValues] = useState(Array(9).fill(null));
    return (
        <>
            <div className="board-row">
                <Square value={values[0]} />
                <Square value={values[1]} />
                <Square value={values[2]} />
            </div>
            <div className="board-row">
                <Square value={values[3]} />
                <Square value={values[4]} />
                <Square value={values[5]} />
            </div>
            <div className="board-row">
                <Square value={values[6]} />
                <Square value={values[7]} />
                <Square value={values[8]} />
            </div>
        </>
    );
}

function Square({value}) {
    return (
        <button className="square" >
            { value }
        </button>
    );
}

