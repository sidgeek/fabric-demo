import React, { useEffect } from "react";
import { fabric } from "fabric";
import useCustomizationHandler from "./hooks/useCustomizationHandler";

export default function Canvas() {
  useCustomizationHandler();

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas");
    // const textbox = new fabric.Textbox("中，文。会自动换行吗,加了配置就会了", {
    const textbox = new fabric.Textbox("中，文。", {
      fontSize: 20,
      top: 300,
      left: 800,
      width: 100,
      borderColor: "red",
      splitByGrapheme: true,
      angle: 90,
    });

    // canvas.add(text);
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
      width="1000"
      height="540"
      style={{ border: "1px solid red" }}
    />
  );
}
