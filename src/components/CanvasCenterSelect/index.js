import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useCanvasGC from "./useCanvasGC";

// 基于中心点选中对象
export default function Canvas() {
  useCanvasGC();

  useEffect(() => {
    const canvas = new fabric.Canvas("my-fabric-canvas", {
      selectionFullyContained: true,
    });
    const textbox = new fabric.Textbox("测试1000", {
      left: 0,
      top: 0,
      selectionFullyContained: true,
      shadow,
    });

    canvas.add(textbox);
    canvas.renderAll();
  }, []);

  return (
    <div>
      <canvas
        id="my-fabric-canvas"
        width="1000"
        height="540"
        style={{ border: "1px solid red" }}
      />
    </div>
  );
}
