import React, { useState } from 'react';
import './App.css';
import { Card } from './Card';
import { DEFAULT_EMOJI, EmojiSet } from './EmojiSet';
import { ImageSet } from './ImageSet';


function App() {
  const [ order, setOrder ] = useState(5);
  const [ setType, setSetType ] = useState("emoji");
  const [ emojiStart, setEmojiStart ] = useState(String.fromCodePoint(DEFAULT_EMOJI));
  const [ imageList, setImageList ] = useState(/** @type {string[]} */([]));
  const [ enableRotation, setEnableRotation ] = useState(true);

  const count = order * order + order + 1;

  const dummy = Array.from({length:order});

  const emojiStartHex = Number.parseInt(emojiStart, 16);
  const emojiStartCodePoint = isNaN(emojiStartHex) ? emojiStart.codePointAt(0) || DEFAULT_EMOJI : emojiStartHex;

  const emojiSet = Array.from({length:count}).map((_,i) => String.fromCodePoint(emojiStartCodePoint + i));

  const set = setType === "images" ? imageList : emojiSet;

  return (
    <div className={`App ${enableRotation?"rotation":""}`}>
      <div className="Header">
        <h1>Monomatch Generator</h1>
        <label>
          <span style={{fontWeight:"bold"}}>Order</span>{' '}
          <input type="number" value={order} onChange={e => setOrder(e.target.valueAsNumber)} style={{width:50}} />
        </label>{' '}
        <span style={{fontWeight:"bold"}}>Total cards and images:</span> {count}
        <h2>Set</h2>
        <label>Emoji<input type="radio" name="set-type" value="emoji" onChange={e => e.target.checked && setSetType("emoji")} checked={setType==="emoji"} /></label>
        <label>Images<input type="radio" name="set-type" value="images" onChange={e => e.target.checked && setSetType("images")} checked={setType==="images"} /></label>
        {
          setType === "emoji" &&
          <EmojiSet emojiStart={emojiStart} setEmojiStart={setEmojiStart} count={count} />
        }
        {
          setType === "images" &&
          <ImageSet imageList={imageList} setImageList={setImageList} count={count} />
        }
        <label>Rotation <input type="checkbox" checked={enableRotation} onChange={e => setEnableRotation(e.target.checked)} /></label>
        <h2>Cards</h2>
      </div>
      <table>
        <tbody>
          {
            dummy.map((_,i) => (
              <tr key={i}>
                {
                  dummy.map((_,j) => (
                    <td key={j}>
                      <Card x={j} y={i} order={order} set={set} />
                    </td>
                  ))
                }
              </tr>
            ))
          }
          <tr>
            {
              dummy.map((_, i) => <td key={i}><Card diagonal={i} order={order} set={set} /></td>)
            }
          </tr>
          <tr>
            <td>
              <Card horizontal order={order} set={set} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
