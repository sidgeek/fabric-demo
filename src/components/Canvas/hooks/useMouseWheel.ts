export default function useMouseWheel() {
  return null;
}

// import { setCanvasAttrs } from "@store/actions";
// import { debounce } from "lodash-es";
// import { useContext, useEffect, useRef } from "react";

// export const useMouseWheel = (canvas, loading: boolean) => {
//   useEffect(() => {
//     const onMousewheel = (event: any) => {
//       event.stopPropagation();

//       if (loading) return;
//       const { wheelDelta } = event;
//       const instance = (context as any).instance();
//       let newCanvasScale = rounding(instance.canvasScaling);
//       if (!instance || !newCanvasScale) return;

//       const step = 0.015;
//       if (wheelDelta > 0) {
//         newCanvasScale = newCanvasScale + step;
//       } else {
//         newCanvasScale = newCanvasScale - step;
//       }
//       if (rounding(instance.canvasScaling) === newCanvasScale) {
//         return;
//       }
//       const fixScale = newCanvasScale < 0.05 ? 0.05 : newCanvasScale;

//       instance.canvasScaling = fixScale;
//       console.log(">>> instance", instance);
//       instance.setZoom(fixScale);

//     };
//     (canvasRef.current as any)?.addEventListener(
//       "mousewheel",
//       debounce(onMousewheel, 200)
//     );

//     const canvasContainer = canvasRef?.current;
//     return () => {
//       (canvasContainer as any)?.removeEventListener("mousewheel", onMousewheel);
//     };
//   }, [loading]);

//   return { canvasRef };
// };
