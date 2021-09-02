import React, { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  var align = ["left", "center", "right", "justify"];
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [object, setObject] = useState<any>(null);

  var txt = "FabricJS \n is \nAwsome";

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    // setCanvas(canvas);

    // var text = new fabric.Text(txt, {
    //   textAlign: "left", //"left", "center", "right" or "justify".
    //   width: 450,
    //   fontSize: 40,
    // });
    // setObject(text);

    // canvas.add(text);
  });

  const changeAlign = useCallback(() => {
    var val = align[Math.floor(Math.random() * align.length)];
    object.set("textAlign", val);
    canvas!.setActiveObject(object);
    canvas!.renderAll();
  }, []);

  return (
    <div>
      <canvas
        id="myCanvas"
        width="600"
        height="300"
        style={{ border: "1px solid red" }}
      ></canvas>
      <button onClick={changeAlign}>Change align</button>
    </div>
  );
}
