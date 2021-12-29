import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import bugImage from "../../assets/ladybug.png";
import skyImage from "../../assets/sky.jpg";
import demoImage from "../../assets/demo.jpeg";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      controlsAboveOverlay: true,
    });
    setMyCanvas(canvas);

    // var clipPath = new fabric.Group(
    //   [
    //     new fabric.Rect({ width: 200, height: 200, left: -100, top: -95 }),
    //     new fabric.Rect({ width: 200, height: 200, left: 200, top: -95 }),
    //   ],
    //   { left: 0, top: 0 }
    // );

    var clipPath = new fabric.Group(
      [
        new fabric.Rect({ width: 200, height: 200, left: -400, top: 0 }),
        new fabric.Rect({ width: 200, height: 200, left: 0, top: 0 }),
      ],
      { left: -400, top: -200 }
    );

    canvas.setOverlayImage(demoImage, canvas.renderAll.bind(canvas), {
      clipPath: clipPath,
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
