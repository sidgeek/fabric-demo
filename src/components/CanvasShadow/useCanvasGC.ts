// @ts-nocheck
import { useEffect } from "react";
import { fabric } from "fabric";

function useCanvasGC() {
  /**
   * Customize fabric controls
   */

  useEffect(() => {
    fabric.Object.prototype._isContainedWithinRect = function (
      pointTL,
      pointBR,
      boundingRect
    ) {
      return (
        boundingRect.left >= pointTL.x &&
        boundingRect.left + boundingRect.width <= pointBR.x &&
        boundingRect.top >= pointTL.y &&
        boundingRect.top + boundingRect.height <= pointBR.y
      );
    };

    fabric.Object.prototype.isContainedWithinRect = function (
      pointTL,
      pointBR,
      absolute,
      calculate
    ) {
      var boundingRect = this.getBoundingRect(absolute, calculate);
      const { top, left, height, width } = boundingRect;
      const boundingRect1 = {
        top: top + height / 2 - 1,
        left: left + width / 2 - 1,
        width: 2,
        height: 2,
      };

      return this._isContainedWithinRect(pointTL, pointBR, boundingRect1);
    };
  }, []);
}

export default useCanvasGC;
