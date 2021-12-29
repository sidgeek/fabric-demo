import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";

const rectStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>`;

const rect2Str = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="none" />
</svg>`;

const rectClipStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
<defs>
<clipPath id="clipPath1">
  <rect x="0" y="0" width="20" height="20" />
</clipPath>   
</defs>
<circle cx="25" cy="25" r="25" fill="#34538b" clip-path="url(#clipPath1)"/>
</svg>`;

const Str = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z M 50 30 A 20 20 0 1 1 50 70 A 20 20 0 1 1 50 30 Z" fill="#0000dd" stroke="#00aaff" stroke-width="3" />
</svg>`;

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState<fabric.Canvas | null>(null);

  const handleClick = useCallback(() => {
    console.log(">>>> satrt");

    fabric.loadSVGFromString(rect2Str, function (objects, options) {
      // Group elements to fabric.PathGroup (more than 1 elements) or
      // to fabric.Path

      // absolutePositioned: true,
      var loadedObject = fabric.util.groupSVGElements(objects, options);
      if (!myCanvas) return;

      loadedObject.set({
        left: 100,
        top: 100,
        stroke: "red",
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        // fill: "transparent",
        selectable: false,
        absolutePositioned: true,
        // isClipFrame: true,
      });

      const textbox = new fabric.Textbox("中abcdefghi", {
        left: 200,
        top: 200
      });
      myCanvas.add(textbox);

      myCanvas.add(loadedObject);
      loadedObject.center().setCoords();
      myCanvas.renderAll();
    });
  }, [myCanvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(canvas);

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
