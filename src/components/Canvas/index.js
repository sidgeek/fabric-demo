import React, { useEffect } from "react";
import { fabric } from "fabric";
import useCustomizationHandler from "./hooks/useCustomizationHandler";

export default function Canvas() {
  useCustomizationHandler();

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    const textbox = new fabric.Textbox("中文会自动换行吗,加了配置就会了", {
      fontSize: 20,
      left: 50,
      width: 100,
      splitByGrapheme: true,
    });

    canvas.add(textbox);
    canvas.renderAll();

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      id="my-fabric-canvas"
      width="600"
      height="540"
      style={{ border: "1px solid red" }}
    />
  );
}
