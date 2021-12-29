import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import bugImage from "../../assets/ladybug.png";

const svgStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <rect width="10" height="10"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>`;

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

    var clipPath = new fabric.Rect({
      width: 200,
      height: 200,
      top: -100,
      left: -100
    });

    // var clipPath = new fabric.Group(
    //   [
    //     new fabric.Rect({ width: 200, height: 200, left: 100 }),
    //     // new fabric.Rect({ width: 200, height: 200, left: 200, top: -95 }),
    //   ],
    //   { left: 0, top: 0 }
    // );

    fabric.loadSVGFromString(svgStr, function (objects, options) {
      // Group elements to fabric.PathGroup (more than 1 elements) or
      // to fabric.Path
      var loadedObject = fabric.util.groupSVGElements(objects, options);
      // Set sourcePath
      // loadedObject.set('sourcePath', elem.getAttribute('data-url'));

      if (!canvas) return;

      canvas.setOverlayImage(
        loadedObject as any,
        canvas.renderAll.bind(canvas),
        {
          width: 400,
          height: 400,
          // opacity: 1,
          // backgroundColor: "red",
          clipPath,
        }
      );

      loadedObject.center().setCoords();

      var circle = new fabric.Circle({
        radius: 30,
        fill: "#f55",
        top: 400,
        left: 100,
      });

      canvas.add(circle);
      canvas.renderAll();
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
