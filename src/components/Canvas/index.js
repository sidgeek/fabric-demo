import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import useCustomizationHandler from "./hooks/useCustomizationHandler";
import handleForMouseWheel from "./hooks/useMouseWheel";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState(null);

  useCustomizationHandler();

  const handleClick = useCallback(() => {
    if (myCanvas) {
      const selectObj = myCanvas._objects[0];
      selectObj.set({"angle": selectObj.angle + 90})
      // myCanvas.
      myCanvas.renderAll();
    }
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);
    const textbox = new fabric.Textbox("中abcdefghi", {
      selectable: false
    });

    canvas.setActiveObject(textbox)

    // canvas.add(text);
    canvas.add(textbox);
    canvas.renderAll();

    handleForMouseWheel(canvas);

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas
        id="my-fabric-canvas"
        width="1000"
        height="540"
        style={{ border: "1px solid red" }}
      />
      <button onClick={handleClick}> click</button>
    </div>
  );
}
