// @ts-nocheck
import { useEffect } from "react";

function useTextVertical() {
  useEffect(() => {
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
  }, []);
}

export default useTextVertical;
