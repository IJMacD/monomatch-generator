import React from "react";

/**
 * @param {object} props
 * @param {number} props.id
 * @param {number} props.order
 * @param {string[]} props.set
 */
export function Card ({ id, order, set }) {

    const count = order * order + order + 1;

    const SPECIAL = count - 1;

    // If the card is the very last one then it's the one that joins all the
    // horizontals.
    const horizontal = id === count - 1;

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

    const x = id % order;
    const y = Math.floor(id / order);

    // If we're in the last row (which is one beyond the order) then
    // we're actually joining the all the diagonals.
    // The x value now tells us which diagonal we're doing.
    const diagonal = y === order ? x : void 0;

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