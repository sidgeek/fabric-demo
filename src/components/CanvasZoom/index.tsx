import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");
    if (myCanvas) {
      const objs = myCanvas.getObjects();
      const obj = objs[0];
      console.log(">>>> obj", obj);

      //
    }
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");

    setMyCanvas(canvas);
    const textbox = new fabric.Textbox("中abcdefghi", {
      top: 300,
      left: 400,
      borderColor: "red",
      backgroundColor: "yellow",
    });

    canvas.add(textbox);
    canvas.renderAll();

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();

      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);

      // 无线的增加画布的尺寸会导致界面异常卡顿
      const oldW = canvas.getWidth();
      const oldH = canvas.getHeight();
      canvas.setDimensions({ width: oldW * zoom, height: oldH * zoom });

      opt.e.preventDefault();
      opt.e.stopPropagation();
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
