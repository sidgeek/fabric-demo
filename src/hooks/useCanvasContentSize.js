import { useState, useCallback } from "react";
import useReference from "./use-ref";
import { getIsBaseX, updateContentBasedCanvasDimension } from "./helper";

const useCanvasContentSize = (myCanvas) => {
  const [lastRatio, setLastRatio] = useState(1);
  const [lastInc, setLastInc] = useState({ x: 0, y: 0 });
  const lastIncRef = useReference(lastInc);

  const [contentSize, setContentSize] = useState({ w: 0, h: 0 });
  const contentSizeRef = useReference(contentSize);

  const calContentSize = useCallback(
    (oldSize) => {
      return {
        w: oldSize.w * lastRatio,
        h: oldSize.h * lastRatio,
      };
    },
    [lastRatio]
  );

  const updateContentSize = useCallback(
    (oldSize) => {
      setContentSize(calContentSize(oldSize));
    },
    [calContentSize, setContentSize]
  );

  const updateCanvasContentSize = useCallback(
    (newS, oldS) => {
      const contentS = contentSizeRef.current;

      console.log(
        `>>>>> size 原始:${oldS.w}/${oldS.h} 新:${newS.w}/${newS.h} 内容:${contentS.w}/${contentS.h}`
      );

      const isBaseWidth = getIsBaseX(contentS, newS);
      let ratio;
      let xInc = 0,
        yInc = 0;
      if (isBaseWidth) {
        ratio = newS.w / contentS.w;
        yInc = newS.h / 2 - (contentS.h * ratio) / 2;
      } else {
        ratio = newS.h / contentS.h;
        xInc = newS.w / 2 - (contentS.w * ratio) / 2;
      }
      console.log(">>>>> change", isBaseWidth, ratio, xInc, yInc);
      setLastInc({ x: xInc, y: yInc });
      updateContentBasedCanvasDimension(
        myCanvas,
        ratio,
        xInc,
        yInc,
        lastIncRef.current,
      );
      setLastRatio(ratio);
      setContentSize({ w: contentS.w * ratio, h: contentS.h * ratio });
    },
    [myCanvas, contentSizeRef, setLastRatio, setLastInc, lastIncRef]
  );

  return { updateCanvasContentSize, updateContentSize };
};

export default useCanvasContentSize;
