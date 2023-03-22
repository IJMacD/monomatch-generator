import React, { useState } from "react";

/**
 * @param {object} props
 * @param {string[]} props.imageList
 * @param {(list: string[]|((list: string[]) => string[])) => void} props.setImageList
 * @param {number} props.count
 */
export function ImageSet ({ imageList, setImageList, count }) {
    const [ isDragging, setIsDragging ] = useState(false);

    /**
     * @param {number} i
     */
    function removeImage (i) {
      setImageList(images => [...images.slice(0, i), ...images.slice(i + 1)])
    }

    /**
     * @param {React.DragEvent} e
     */
    function handleDrop (e) {
      e.preventDefault();
      setIsDragging(false);
      setImageList(list => [ ...list, ...[...e.dataTransfer.files].map(file => URL.createObjectURL(file)) ]);
    }

    return (
        <div
            style={{
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: isDragging ? "green" : "#333",
                backgroundColor: isDragging ? "#80FF80" : "transparent",
                margin: "0.5em 0",
            }}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
        >
            { imageList.length === 0 && <span style={{fontStyle:"italic",fontSize:"0.8em",color:"#999", margin: "0.5em"}}>Drag images to start</span> }
            {
                imageList.map((url, i) => <img key={i} alt="" src={url} style={{maxWidth:80,maxHeight:80}} onClick={() => removeImage(i)} />)
            }
            { imageList.length > 0 && imageList.length < count && <div style={{fontStyle:"italic",fontSize:"0.8em",color:"#999", margin: "0.5em"}}>Images remaining: {count - imageList.length}</div> }
        </div>
    );
}