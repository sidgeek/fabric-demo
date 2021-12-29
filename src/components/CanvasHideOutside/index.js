import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState(null);
  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      selectionFullyContained: true,
      preserveObjectStacking: true,
      controlsAboveOverlay: true,
    });
    setMyCanvas(canvas);
    const textbox = new fabric.Textbox("测试1000", {
      left: 0,
      top: 0,
    });
    var clipPath = new fabric.Circle({ radius: 100, top: 0, left: 50 });
    canvas.clipPath = clipPath;
    canvas.add(textbox);
    canvas.renderAll();
  }, []);
  const handleClick = () => {
    if (myCanvas) {
      const objs = myCanvas.getObjects();
      const activeObj = objs[0];
      activeObj.clone((cloned) => {
        console.log(">>> cloned", cloned);
        cloned.set({ left: 100, top: 100 });
        myCanvas.add(cloned);
      });
    }
  };
  const handleClick2 = () => {
    if (myCanvas) {
      const textbox = new fabric.Textbox("测试2000", {
        left: 50,
        top: 0,
      });
      myCanvas.add(textbox);
    }
  };
  return (
    <div>
      <canvas
        id="my-fabric-canvas"
        width="1000"
        height="540"
        style={{ border: "1px solid red" }}
      />
      <button onClick={handleClick}> click me </button>
      <button onClick={handleClick2}> click me 2 </button>
    </div>
  );
}