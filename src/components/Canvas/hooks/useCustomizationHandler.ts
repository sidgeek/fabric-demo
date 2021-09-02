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

      const offLeft = left - fillOffsets.offsetX;
      const offTop = top - fillOffsets.offsetY;

      // console.log(">>>> renderChar", _char, left, top);
      // @ts-ignore
      if (this.isVertical) {
        shouldFill &&
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, offLeft, offTop, "text");
        shouldStroke &&
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, offLeft, offTop, "stroke");
      } else {
        shouldFill && ctx.fillText(_char, left, offTop);
        shouldStroke && ctx.strokeText(_char, left, offTop);
      }
      ctx.restore();
    };
  }, []);
}

export default useCustomizationHandler;
