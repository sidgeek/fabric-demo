import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useCustomizationHandler from "./hooks/useCustomizationHandler";
import handleForMouseWheel from "./hooks/useMouseWheel";

export default function Canvas() {
  const [myCanvas, setMyCanvas] = useState(null);

  useCustomizationHandler();

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    setMyCanvas(myCanvas);
    const textbox = new fabric.Textbox("中，文。会自动换行吗,加了配置就会了", {
      // const textbox = new fabric.Textbox("年(", {
      fontSize: 20,
      top: 300,
      left: 800,
      width: 40,
      borderColor: "red",
      splitByGrapheme: true,
      angle: 90,
      backgroundColor: "yellow",
    });

    textbox.isVertical = true;

    // canvas.add(text);
    canvas.add(textbox);
    canvas.renderAll();

    handleForMouseWheel(canvas);

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      id="my-fabric-canvas"
      width="1000"
      height="540"
      style={{ border: "1px solid red" }}
    />
  );
}
