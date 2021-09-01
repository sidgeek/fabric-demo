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
          method === "strokeText" && fullDecl.stroke && fullDecl.strokeWidth;

      if (!shouldStroke && !shouldFill) {
        return;
      }
      decl && ctx.save();

      this._applyCharStyles(method, ctx, lineIndex, charIndex, fullDecl);

      if (decl && decl.textBackgroundColor) {
        this._removeShadow(ctx);
      }
      if (decl && decl.deltaY) {
        top += decl.deltaY;
      }

      console.log(">>>> renderChar", _char, left, top);

      if(this.isVertical) {
        shouldFill && ctx.fillTextOrStrokeVertical(_char, left, top, "text");
        shouldStroke && ctx.fillTextOrStrokeVertical(_char, left, top, "stroke");
      } else {
        shouldFill && ctx.fillText(_char, left, top);
        shouldStroke && ctx.strokeText(_char, left, top);
      }

     
      decl && ctx.restore();
    };
  }, []);
}

export default useCustomizationHandler;
