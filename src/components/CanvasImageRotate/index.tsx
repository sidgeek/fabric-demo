import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import bugImage from "../../assets/ladybug.png";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    const objects = myCanvas?.getObjects();
    const imageObj = (objects as any)[0];

    var curAngle = imageObj.angle;
    imageObj.rotate(curAngle + 90);

    (myCanvas as any).renderAll();
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      controlsAboveOverlay: true,
    });
    setMyCanvas(canvas);

    fabric.Image.fromURL(bugImage, function (img) {
      img.set({
        left: 0,
        top: 0,
        angle: 0,
      });

      canvas.add(img);
    });

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
