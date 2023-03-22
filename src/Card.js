import React from "react";

/**
 * @param {object} props
 * @param {number} [props.x]
 * @param {number} [props.y]
 * @param {boolean} [props.horizontal]
 * @param {number} [props.diagonal]
 * @param {number} props.order
 * @param {string[]} props.set
 */
export function Card ({ x, y, horizontal, diagonal, order, set }) {

    const SPECIAL = order * order + order;

    if (horizontal)
    {
        const dummy = Array.from({length: order});

        return (
            <div className="Card">
                {
                    dummy.map((_, i) => <Picture key={i} set={set} index={i} />)
                }
                <Picture set={set} index={SPECIAL} />
            </div>
        );
    }

    if (typeof diagonal === "number")
    {
        const dummy = Array.from({length: order});

        return (
            <div className="Card">
                {
                    dummy.map((_, x) => <Picture key={x} set={set} index={order * (diagonal + 1) + x} />)
                }
                <Picture set={set} index={SPECIAL} />
            </div>
        );
    }

    if (typeof x !== "number" || typeof y !== "number") {
        throw Error("Expected: horizontal, or diagonal, or (x,y)");
    }

    const diagonals = Array.from({length:order}).map((_, N) => {
        return (x - N * y + order * N) % order;
    });

    return (
        <div className="Card">
            <Picture set={set} index={y} />
            {
                diagonals.map((index, N) => <Picture key={N} set={set} index={order * (N + 1) + index} />)
            }
        </div>
    );
}

function Picture ({ set, index }) {
    const item = set[index];

    if (/^[a-z]{3,}:/.test(item)) {
        return <img src={item} alt="" style={{maxWidth:50,maxHeight:50}} />
    }

    return <span>{set[index]}</span>;
}