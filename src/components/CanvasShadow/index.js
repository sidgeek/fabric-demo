import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      selectionFullyContained: true,
    });

    const shadow = new fabric.Shadow({
      color: "black",
      blur: 10,
    });

    const textbox = new fabric.Textbox("测试1000", {
      left: 0,
      top: 0,
      // selectable: false,
      selectionFullyContained: true,
      shadow,
    });

    const textbox2 = new fabric.Rect({
      width: 200,
      height: 50,
      // fill: "blue",
      top: 20,
      left: 50,
      shadow,
    });

    console.log(">>> textbox", textbox);

    // canvas.setActiveObject(textbox);
    canvas.add(textbox);
    canvas.add(textbox2);

    setMyCanvas(canvas);
    canvas.renderAll();
  }, []);

  return (
    <div>
      <canvas
        id="my-fabric-canvas"
        width="1000"
        height="540"
        style={{ border: "1px solid red" }}
      />
    </div>
  );
}
