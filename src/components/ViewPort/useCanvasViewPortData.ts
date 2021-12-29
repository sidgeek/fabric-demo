import { useCallback, useEffect, useState } from "react";

export const useCanvasViewPortData = (canvas: any) => {
  const [viewPort, setViewPort] = useState({ zoom: -1, top: -1, left: -1 });
  const updateViewPortData = useCallback(() => {
    const zoom = canvas.getZoom().toFixed(2);
    const vptTop = Math.round(canvas.viewportTransform[5]);
    const vptLeft = Math.round(canvas.viewportTransform[4]);

    setViewPort({
      zoom,
      top: vptTop,
      left: vptLeft,
    });

    // const centerHorizontalLine = this.centerLine_horizontal;
    // const centerVerticalLine = this.centerLine_vertical;

    // const alignmentHorizontalLine = this.alignmentLines_horizontal;
    // const alignmentVerticalLine = this.alignmentLines_vertical;
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;

    canvas.on("after:render", () => {
      updateViewPortData();
    });

    canvas.on("mouse:wheel", () => {
      updateViewPortData();
    });
  }, [canvas]);

  return { viewPort };
};
