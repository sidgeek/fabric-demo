import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import { useCanvasZoomDrag } from "./useCanvasZoomDrag";
import ViewPort from "../ViewPort";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");
  }, [myCanvas]);

  useCanvasZoomDrag(myCanvas);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      // hoverCursor: "grab",
    });
    setMyCanvas(canvas);

    var circle = new fabric.Circle({
      radius: 30,
      fill: "#f55",
      top: 400,
      left: 100,
    });

    var circle2 = new fabric.Circle({
      radius: 30,
      fill: "#f55",
      top: 100,
      left: 100,
    });

    canvas.add(circle);
    canvas.add(circle2);

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas
        id="my-fabric-canvas"
        width="800"
        height="540"
        style={{ border: "1px solid red" }}
      />
      <button onClick={handleClick}> click</button>
      <ViewPort canvas={myCanvas} />
    </div>
  );
}
