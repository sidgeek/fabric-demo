// @ts-nocheck
import { useEffect } from "react";
import { fabric } from "fabric";
import useTextStrokeVertical from "./useTextStrokeVertical";

function useCustomizationHandler() {
  useTextStrokeVertical();

  /**
   * Customize fabric controls
   */
  useEffect(() => {
    fabric.Textbox.prototype._wordJoiners = /[\t\r]/;
    fabric.Textbox.prototype.isVertical = false; // 添加一个是否为竖排的标志

    fabric.Text.prototype._renderChar = function (
      method,
      ctx,
      lineIndex,
      charIndex,
      _char,
      left,
      top
    ) {
      var decl = this._getStyleDeclaration(lineIndex, charIndex),
        fullDecl = this.getCompleteStyleDeclaration(lineIndex, charIndex),
        shouldFill = method === "fillText" && fullDecl.fill,
        shouldStroke =
          method === "strokeText" && fullDecl.stroke && fullDecl.strokeWidth,
        fillOffsets,
        strokeOffsets;

      if (!shouldStroke && !shouldFill) {
        return;
      }
      ctx.save();

      // @ts-ignore
      shouldFill && (fillOffsets = this._setFillStyles(ctx, fullDecl));
      // @ts-ignore
      shouldStroke && (strokeOffsets = this._setStrokeStyles(ctx, fullDecl));

      // @ts-ignore
      ctx.font = this._getFontDeclaration(fullDecl);

      if (decl && decl.textBackgroundColor) {
        this._removeShadow(ctx);
      }
      if (decl && decl.deltaY) {
        top += decl.deltaY;
      }

      if (shouldFill) {
        const fillLeft = left - fillOffsets.offsetX;
        const fillTop = top - fillOffsets.offsetY;

        // @ts-ignore
        if (this.isVertical) {
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, fillLeft, fillTop, "text");
        } else {
          ctx.fillText(_char, fillLeft, fillTop);
        }
      }

      if (shouldStroke) {
        const strokeLeft = left - strokeOffsets.offsetX;
        const strokeTop = top - strokeOffsets.offsetY;

        // @ts-ignore
        if (this.isVertical) {
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, strokeLeft, strokeTop, "stroke");
        } else {
          ctx.strokeText(_char, strokeLeft, strokeTop);
        }
      }

      ctx.restore();
    };
  }, []);
}

export default useCustomizationHandler;
