import { useEffect } from "react";
import {
  isChinese,
  getPosXFixAlgorithm,
  getFontAttrType,
  FontAttrType,
  getEnglishCharAdjustRatio,
  hasEnglishFont,
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

      console.log(">>> arrWidth", arrWidth, align);

      if (align === "left") {
        x = x + Math.max.apply(null, arrWidth) / 2;
      } else if (align == "right") {
        x = x - Math.max.apply(null, arrWidth) / 2;
      }

      // 保证因为字母的y值相同
      const hasEng = hasEnglishFont(text);
      const arrW = hasEng ? context.measureText("中").width : arrWidth[0];

      if (
        baseline === "bottom" ||
        baseline === "alphabetic" ||
        baseline === "ideographic"
      ) {
        y = y - arrW / 2;
      } else if (baseline == "top" || baseline == "hanging") {
        y = y + arrW / 2;
      }

      context.textAlign = "center";
      context.textBaseline = "middle";

      const baseW = context.measureText("中").width;
      // const baseH = context.measureText("中").width;
      console.log(`>>>> baseW:, ${baseW}`);

      const adjustH = baseW * 0.11;
      var lastFontT: FontAttrType | null = null;

      //修正y坐标
      y = y + baseW * 0.15;

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        const curFontT = getFontAttrType(letter);

        const fixAlgorithm = getPosXFixAlgorithm(lastFontT, curFontT, baseW);
        const fixWidth =
          index === 0 ? 0 : fixAlgorithm(arrWidth[index - 1], arrWidth[index]);
        x = x - fixWidth;

        console.log(
          `>>>> font:, ${letter}, ${curFontT}, (${x}, ${y}), ${fixWidth}`
        );

        if (isChinese(letter)) {
          context.save();
          context.translate(x, y);
          context.rotate((-90 * Math.PI) / 180);
          context.translate(-x, -y);
        }

        // 用于调整英文字符的位置
        const AdjustEngChar = baseW * getEnglishCharAdjustRatio(letter);

        if (type === "text") {
          if (!isChinese(letter) && curFontT === FontAttrType.ENG_CHAR) {
            context.fillText(letter, x, y - AdjustEngChar);
          } else {
            context.fillText(letter, x, y);
          }
        } else if (type === "stroke") {
          if (isChinese(letter) && curFontT === FontAttrType.ENG_CHAR) {
            context.fillText(letter, x, y - AdjustEngChar);
          } else {
            context.strokeText(letter, x, y);
          }
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
