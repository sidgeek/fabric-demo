import React from "react";
import { useCanvasViewPortData } from "./useCanvasViewPortData";

export default function ViewPort(props: { canvas: any }) {
  const { viewPort } = useCanvasViewPortData(props.canvas);
  const { zoom, top, left } = viewPort;

  return (
    <div>
      <div>
        <div> zoom: {zoom}</div>
        <div> viewport top: {top}</div>
        <div> viewport left: {left}</div>
      </div>
      <div>
        <div> Alignment lines (green) {}</div>
        <div> Horizontal: {}</div>
        <div> Vertical: {}</div>
      </div>
      <div>
        <div> Canvas-center lines (purple) {}</div>
        <div> Horizontal: {}</div>
        <div> Vertical: {}</div>
      </div>
    </div>
  );
}
