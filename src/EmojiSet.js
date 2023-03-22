import React, { useCallback, useEffect } from "react";

export const DEFAULT_EMOJI = 0x1F400;

export function EmojiSet ({ emojiStart, setEmojiStart, count }) {
    /**
     * @param {number} delta
     */
    const shiftEmojiStart = useCallback((delta) => {
        setEmojiStart(emojiStart => {
            const emojiStartHex = Number.parseInt(emojiStart, 16);

            if (isNaN(emojiStartHex)) {
                return String.fromCodePoint((emojiStart.codePointAt(0) || DEFAULT_EMOJI) + delta);
            }

            return (emojiStartHex + delta).toString(16);
        });
    }, [setEmojiStart]);

    useEffect(() => {
        /**
         * @param {KeyboardEvent} e
         */
        const cb = (e) => {
            if (e.target instanceof HTMLInputElement) {
                return;
            }

            if (e.key === "ArrowLeft") {
                shiftEmojiStart(-1);
            }
            else if (e.key === "ArrowRight") {
                shiftEmojiStart(1);
            }
        };

        document.addEventListener("keydown", cb);

        return () => document.removeEventListener("keydown", cb);
    }, [shiftEmojiStart]);

    const emojiStartHex = Number.parseInt(emojiStart, 16);
    const emojiStartCodePoint = isNaN(emojiStartHex) ? emojiStart.codePointAt(0) || DEFAULT_EMOJI : emojiStartHex;
    const emojiSet = Array.from({length:count}).map((_,i) => String.fromCodePoint(emojiStartCodePoint + i));

    return (
        <div>
            <label>
                <span style={{fontWeight:"bold"}}>First Emoji: </span>{' '}
            <input value={emojiStart} onChange={e => setEmojiStart(e.target.value)} size={5} />
            </label>{' '}
            <button className="emojiButton" onClick={() => shiftEmojiStart(-1)}>⬅️</button>
            <button className="emojiButton" onClick={() => shiftEmojiStart(+1)}>➡️</button>{' '}
            <span style={{fontWeight:"bold"}}>Preset: </span>{' '}
            <button className="emojiButton" onClick={() => setEmojiStart("🐀")}>🐀</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🐠")}>🐠</button>
            <button className="emojiButton" onClick={() => setEmojiStart("💋")}>💋</button>
            <button className="emojiButton" onClick={() => setEmojiStart("😢")}>😢</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🚀")}>🚀</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🚧")}>🚧</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🥐")}>🥐</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🦀")}>🦀</button>
            <button className="emojiButton" onClick={() => setEmojiStart("🧠")}>🧠</button>
            <div style={{border:"1px solid #333",padding:"0.5em", margin:"0.5em 0"}}>
            { emojiSet.map(c => <span key={c} style={{display:"inline-block",fontSize:"1.5rem"}}>{c}</span>) }
            </div>
        </div>
    );
}