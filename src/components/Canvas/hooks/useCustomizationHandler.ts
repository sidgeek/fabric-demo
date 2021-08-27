// @ts-nocheck
import { useEffect } from "react";
import { fabric } from "fabric";

function useCustomizationHandler() {
  /**
   * Customize fabric controls
   */
  useEffect(() => {
    fabric.Textbox.prototype._wordJoiners = /[\t\r]/;

    CanvasRenderingContext2D.prototype.fillTextVertical = function (
      text,
      x,
      y
    ) {
      var context = this;
      var arrText = text.split("");
      var arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width;
      });

      var align = context.textAlign;
      var baseline = context.textBaseline;

      if (align == "left") {
        x = x + Math.max.apply(null, arrWidth) / 2;
      } else if (align == "right") {
        x = x - Math.max.apply(null, arrWidth) / 2;
      }
      if (
        baseline == "bottom" ||
        baseline == "alphabetic" ||
        baseline == "ideographic"
      ) {
        y = y - arrWidth[0] / 2;
      } else if (baseline == "top" || baseline == "hanging") {
        y = y + arrWidth[0] / 2;
      }

      context.textAlign = "center";
      context.textBaseline = "middle";

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];

        console.log(">>>> y fillText", letter, x, y);
        context.fillText(letter, x, y);
        // 旋转坐标系还原成初始态
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        y = y + letterWidth;
      });
      // 水平垂直对齐方式还原
      context.textAlign = align;
      context.textBaseline = baseline;
    };

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {String} method Method name ("fillText" or "strokeText")
     */
    fabric.Text.prototype._renderTextCommon = function (ctx, method) {
      ctx.save();
      var lineHeights = 0,
        left = this._getLeftOffset(),
        top = this._getTopOffset(),
        offsets = this._applyPatternGradientTransform(
          ctx,
          method === "fillText" ? this.fill : this.stroke
        );
      for (var i = 0, len = this._textLines.length; i < len; i++) {
        var heightOfLine = this.getHeightOfLine(i),
          maxHeight = heightOfLine / this.lineHeight,
          leftOffset = this._getLineLeftOffset(i);

        const contents = this._textLines[i];
        const xStart =
          left +
          leftOffset -
          offsets.offsetX +
          (this._textLines.length + 1) * heightOfLine -
          lineHeights;
        const yStart = top + maxHeight - offsets.offsetY;
        console.log("dg>> common", contents, xStart, yStart, i);

        this._renderTextLine(method, ctx, contents, xStart, yStart, i);
        lineHeights += heightOfLine;
      }
      ctx.restore();
    };

    fabric.Text.prototype._renderChars = function (
      method,
      ctx,
      line,
      left,
      top,
      lineIndex
    ) {
      // set proper line offset
      var lineHeight = this.getHeightOfLine(lineIndex),
        isJustify = this.textAlign.indexOf("justify") !== -1,
        actualStyle,
        nextStyle,
        charsToRender = "",
        charBox,
        boxWidth = 0,
        timeToRender,
        shortCut =
          !isJustify && this.charSpacing === 0 && this.isEmptyStyles(lineIndex);

      ctx.save();
      top -= (lineHeight * this._fontSizeFraction) / this.lineHeight;
      if (shortCut) {
        // render all the line in one pass without checking
        const contents = this.textLines[lineIndex];
        console.log("dg>> renderChars", contents, left, top);

        this._renderChar(
          method,
          ctx,
          lineIndex,
          0,
          contents,
          left,
          top,
          lineHeight
        );
        ctx.restore();
        return;
      }
      for (var i = 0, len = line.length - 1; i <= len; i++) {
        timeToRender = i === len || this.charSpacing;
        charsToRender += line[i];
        charBox = this.__charBounds[lineIndex][i];
        if (boxWidth === 0) {
          left += charBox.kernedWidth - charBox.width;
          boxWidth += charBox.width;
        } else {
          boxWidth += charBox.kernedWidth;
        }
        if (isJustify && !timeToRender) {
          if (this._reSpaceAndTab.test(line[i])) {
            timeToRender = true;
          }
        }
        if (!timeToRender) {
          // if we have charSpacing, we render char by char
          actualStyle =
            actualStyle || this.getCompleteStyleDeclaration(lineIndex, i);
          nextStyle = this.getCompleteStyleDeclaration(lineIndex, i + 1);
          timeToRender = this._hasStyleChanged(actualStyle, nextStyle);
        }
        if (timeToRender) {
          this._renderChar(
            method,
            ctx,
            lineIndex,
            i,
            charsToRender,
            left,
            top,
            lineHeight
          );
          charsToRender = "";
          actualStyle = nextStyle;
          left += boxWidth;
          boxWidth = 0;
        }
      }
      ctx.restore();
    };

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

      console.log("dg>> renderChar", _char, left, top);

      // context.fillTextVertical("anglebaby和,黄晓明", canvas.width / 2, 0);

      shouldFill && ctx.fillTextVertical(_char, left, top);
      // shouldFill && ctx.fillText(_char, left, top);
      shouldStroke && ctx.strokeText(_char, left, top);
      decl && ctx.restore();
    };
  }, []);
}

export default useCustomizationHandler;
