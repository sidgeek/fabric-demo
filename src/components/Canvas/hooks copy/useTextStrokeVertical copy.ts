// @ts-nocheck
import { useEffect } from "react";
import { isChinese } from "../utils/fontHelper";

function useTextStrokeVertical() {
  useEffect(() => {
    CanvasRenderingContext2D.prototype.fillTextOrStrokeVertical = function (
      text: string,
      x: number,
      y: number,
      type: "text" | "stroke"
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

      console.log(`>>>> start pos: (${x}, ${y})`);
      console.log(">>>> arrWidth", arrWidth);

      // 修正 开头向后移动半个字符
      x = x + arrWidth[0] / 2;

      var lastIsChinese = false;
      var lastFixWidth = 0;

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        if (isChinese(letter)) {
          /**
           * 修正中文字符的位置
           * 英文后中文,加fixW (加fixW = width_of_last_font * 0.9)
           * 中文后英文,减x
           */
          if (!lastIsChinese && index !== 0) {
            lastFixWidth = arrWidth[index - 1] * 0.9;
            x = x + lastFixWidth;
          }

          context.save();
          context.translate(x, y);
          context.rotate((-90 * Math.PI) / 180);
          context.translate(-x, -y);

          lastIsChinese = true;
        } else {
          if (lastIsChinese && index !== 0) {
            x = x - lastFixWidth;
          }

          lastIsChinese = false;
        }

        if (type === "text") {
          context.fillText(letter, x, y);
        } else if (type === "stroke") {
          context.strokeText(letter, x, y);
        }

        // 旋转坐标系还原成初始态
        if (isChinese(letter)) {
          context.restore();
        }

        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        x = x + letterWidth;
      });

      // 水平垂直对齐方式还原
      context.textAlign = align;
      context.textBaseline = baseline;
    };
  }, []);
}

export default useTextStrokeVertical;
