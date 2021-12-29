import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import bugImage from "../../assets/ladybug.png";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);

    canvas.setOverlayImage(bugImage, canvas.renderAll.bind(canvas), {
      width: 800,
      height: 800,
      opacity: 1,
      // clipPath,
    });

    var circle = new fabric.Circle({
      radius: 30,
      fill: "#f55",
      top: 400,
      left: 100,
    });

    canvas.add(circle);

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
    </div>
  );
}
