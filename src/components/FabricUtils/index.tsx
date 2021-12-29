import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    if (myCanvas) {
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

    var elements = [];
    var element = new fabric.Rect({
      type: "rect",
      fill: "#0B61A4",
      width: 50,
      height: 50,
      left: 100,
      top: 100,
    });

    // element.set("id", 1);
    element = element.toObject();
    elements.push(element);

    fabric.util.enlivenObjects(
      elements,
      function (objects: any) {
        console.log(">>> objects", objects);
        objects.forEach(function (o: any) {
          canvas.add(o);
        });

        canvas.renderAll();
      },
      // @ts-ignore
      null
    );

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
    </div>
  );
}
