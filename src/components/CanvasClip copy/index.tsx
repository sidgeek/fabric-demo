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
    // const imgEl = document.createElement("img");
    // imgEl.crossOrigin = "Anonymous";
    // imgEl.src = bugImage;

    // const clipPath = new fabric.Circle({
    //   radius: 200,
    //   top: -200, // 被裁切物件中心點為基準的 -200
    //   left: -200, // 被裁切物件中心點為基準的 -200
    // });

    const clipRect = new fabric.Rect({
      width: 200,
      height: 200,
      // x: 0,
    });

    var circle = new fabric.Circle({
      radius: 30,
      fill: "#f55",
      top: 400,
      left: 100,
    });

    canvas.add(circle);
    canvas.setOverlayImage(demoImage, canvas.renderAll.bind(canvas), {
      // width: 400,
      // height: 400,
      opacity: 1,
      clipPath: clipRect,
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
