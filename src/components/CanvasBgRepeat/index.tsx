import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import bugImage from "../../assets/ladybug.png";

function makeFrameBorder(width: number, height: number) {
  const lineStroke = "black";
  const x = 0,
    y = 0;
  const xEnd = x + width;
  const yEnd = y + height;

  const lineConfig = {
    stroke: lineStroke,
    type: "line",
    strokeWidth: 5,
    strokeDashArray: [5, 5],
  };

  const groupConfig = {
    // evented: false,
    // selectable: false,
    name: "FrameBorder",
    index: 999,
    // perPixelTargetFind: true,
    // selectable: false,
    // evented: false,
  };
  const lineXTop = new fabric.Line([x, y, xEnd, y], lineConfig);
  const lineXBottom = new fabric.Line([x, yEnd, xEnd, yEnd], lineConfig);
  const lineYLeft = new fabric.Line([x, y, x, yEnd], lineConfig);
  const lineYRight = new fabric.Line([xEnd, y, xEnd, yEnd], lineConfig);

  var group = new fabric.Group(
    [lineXTop, lineXBottom, lineYLeft, lineYRight],
    groupConfig
  );

  return group;
}

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);

    canvas.setBackgroundColor(
      // @ts-ignore
      { source: bugImage, repeat: "repeat" },
      function () {
        canvas.renderAll();
      }
    );

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
