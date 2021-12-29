import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    const objects = myCanvas?.getObjects();
    const imageObj = (objects as any)[0];
    console.log(">>>> satrt", imageObj);

    imageObj.set({
      cropX: 0,
      cropY: 0,
      width: imageObj.width,
      height: imageObj.width / 2,
      // left: 0,
      // top: 0,
    });

    (myCanvas as any).renderAll();
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      controlsAboveOverlay: true,
    });
    setMyCanvas(canvas);
    const imgEl = document.createElement("img");
    imgEl.crossOrigin = "Anonymous";
    imgEl.src = "https://i.imgur.com/1k9XjUn.jpg";

    imgEl.onload = () => {
      const image = new fabric.Image(imgEl, {
        scaleX: 0.5,
        scaleY: 0.5,
        top: 10,
        left: 300,
      });
      canvas.add(image);
      canvas.renderAll();
    };

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
