import { fabric } from "fabric";

type SizeType = {
  width: number;
  height: number;
};

export const WORKER_AREA_BORDER_STROKE_WIDTH = 5;

export const WorkAreaIds = ["work-area", "work-area-border"];

export function makeWorkerArea(size: SizeType) {
  return new fabric.Rect({
    //@ts-ignore
    id: WorkAreaIds[0],
    width: size.width,
    height: size.height,
    absolutePositioned: true,
    fill: "#000",
    selectable: false,
    hoverCursor: "default",
  });
}

export function makeWorkerAreaBorder(size: SizeType) {
  const lineStroke = "white";
  const x = 0,
    y = 0;
  const xEnd = x + size.width;
  const yEnd = y + size.height;

  const lineConfig = {
    stroke: lineStroke,
    type: "line",
    strokeWidth: WORKER_AREA_BORDER_STROKE_WIDTH,
    strokeDashArray: [15, 15],
  };

  const groupConfig = {
    //@ts-ignore
    id: WorkAreaIds[1],
    evented: false,
    selectable: false,
    name: "FrameBorder",
    index: 999,
    hoverCursor: "default",
  };
  const lineXTop = new fabric.Line([x, y, xEnd, y], lineConfig);
  const lineXBottom = new fabric.Line([x, yEnd, xEnd, yEnd], lineConfig);
  const lineYLeft = new fabric.Line([x, y, x, yEnd], lineConfig);
  const lineYRight = new fabric.Line([xEnd, y, xEnd, yEnd], lineConfig);

  var group = new fabric.Group(
    [lineXTop, lineXBottom, lineYLeft, lineYRight],
    groupConfig
  );

  return group;
}

// need to be change
export const getFitRatio = (targetSize: SizeType, canvasSize: SizeType) => {
  const ratioX = Math.floor((canvasSize.height / targetSize.height) * 100);
  const ratioY = Math.floor((canvasSize.width / targetSize.width) * 100);

  const ratio = ratioX < ratioY ? ratioX : ratioY;
  return { ratio: ratio / 100 };
};
