import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import { ReactComponent } from "./search.svg";

const circleStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <g>
    <circle r="25" cy="25" cx="25" />
  </g>
</svg>`;

const rectStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="100"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>`;

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");

    const canvas = myCanvas;

    fabric.loadSVGFromString(rectStr, function (objects, options) {
      // Group elements to fabric.PathGroup (more than 1 elements) or
      // to fabric.Path
      var loadedObject = fabric.util.groupSVGElements(objects, options);
      // Set sourcePath
      // loadedObject.set('sourcePath', elem.getAttribute('data-url'));

      console.log(">>>> 1", loadedObject);
      console.log(">>>> 2", canvas);

      if (!canvas) return;

      canvas.add(loadedObject);
      console.log(loadedObject);
      loadedObject.center().setCoords();
      canvas.renderAll();
    });
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);
    setTimeout(() => {
      handleClick();
    }, 10000);

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

      <ReactComponent style={{ height: "40px", width: "40px" }} />
    </div>
  );
}
