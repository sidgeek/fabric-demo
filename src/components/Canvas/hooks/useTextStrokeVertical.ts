import { useEffect } from "react";
import {
  isChinese,
  getPosXFixAlgorithm,
  getFontAttrType,
  FontAttrType,
} from "../utils/fontHelper";

function useTextStrokeVertical() {
  useEffect(() => {
    // @ts-ignore
    CanvasRenderingContext2D.prototype.fillTextOrStrokeVertical = function (
      text: string,
      x: number,
      y: number,
      type: "text" | "stroke"
    ) {
      if (type !== "text" && type !== "stroke") {
        console.warn(`The type ${type} is not support!`);
        return;
      }

      var context = this;
      var arrText = text.split("");
      var arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width;
      });

      var align = context.textAlign;
      var baseline = context.textBaseline;

      if (align === "left") {
        x = x + Math.max.apply(null, arrWidth) / 2;
      } else if (align == "right") {
        x = x - Math.max.apply(null, arrWidth) / 2;
      }
      if (
        baseline === "bottom" ||
        baseline === "alphabetic" ||
        baseline === "ideographic"
      ) {
        y = y - arrWidth[0] / 2;
      } else if (baseline == "top" || baseline == "hanging") {
        y = y + arrWidth[0] / 2;
      }

      context.textAlign = "center";
      context.textBaseline = "middle";

      const baseW = context.measureText("中").width;
      var lastFontT: FontAttrType | null = null;

      // //修正y坐标
      const fixY = baseW * 0.15;
      // y = y + baseW * 0.15;

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        const curFontT = getFontAttrType(letter);

        const fixAlgorithm = getPosXFixAlgorithm(lastFontT, curFontT, baseW);
        const fixWidth =
          index === 0 ? 0 : fixAlgorithm(arrWidth[index - 1], arrWidth[index]);
        x = x - fixWidth;

        console.log(">>> fixWidth", fixWidth);

        if (isChinese(letter)) {
          context.save();
          context.translate(x, y);
          context.rotate((-90 * Math.PI) / 180);
          context.translate(-x, -y);
        }

        if (type === "text") {
          console.log(">>> fill", letter, x, y);
          context.fillText(letter, x, y);
        } else if (type === "stroke") {
          context.strokeText(letter, x, y);
        }

        // 旋转坐标系还原成初始态
        if (isChinese(letter)) {
          context.restore();
        }

        lastFontT = curFontT;

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
