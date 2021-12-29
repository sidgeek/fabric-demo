import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import ViewPort from "../ViewPort";
import { getFitRatio, makeWorkerArea } from "./WorkArea/helper";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    if (!myCanvas) return;
    const workAreaObj = myCanvas
      .getObjects()
      .find((object) => (object as any).id === "work-area") as any;

    const area = {
      top: workAreaObj.top,
      left: workAreaObj.left,
      height: workAreaObj.height,
      width: workAreaObj.width,
    };

    console.log(">> area", area);

    var transform = (myCanvas.viewportTransform || []).slice();
    console.log(">> transform", transform);
    myCanvas.viewportTransform = [1, 0, 0, 1, 0, 0];

    const dataURL = myCanvas.toDataURL({
      format: "png",
      // multiplier: 3,
      ...area,
    });

    myCanvas.viewportTransform = transform;

    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);
    const imgEl = document.createElement("img");
    imgEl.crossOrigin = "Anonymous";
    imgEl.src = "https://i.imgur.com/1k9XjUn.jpg";

    imgEl.onload = async () => {
      const image = new fabric.Image(imgEl);

      const targetSize = {
        width: image.width || 0,
        height: image.height || 0,
      };

      const canvasSize = {
        width: canvas.width || 0,
        height: canvas.height || 0,
      };

      const { ratio } = getFitRatio(targetSize, canvasSize);
      const center = canvas.getCenter();

      canvas.zoomToPoint(new fabric.Point(center.left, center.top), ratio);

      // 画工作区域
      const workAreaObj = makeWorkerArea(targetSize);

      await canvas.add(workAreaObj);
      workAreaObj.center();

      image.set({ left: workAreaObj.left, top: workAreaObj.top });

      canvas.add(image);
      canvas.renderAll();
    };

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();

      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);

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
      <ViewPort canvas={myCanvas} />
    </div>
  );
}
