import { useEffect } from "react";

export const useCanvasZoomDrag = (canvas: any) => {
  useEffect(() => {
    if (!canvas) return;

    const self = canvas as any;

    canvas.on("mouse:wheel", function (opt: any) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on("mouse:down", function (opt: any) {
      var evt = opt.e;
      if (evt.altKey === true) {
        self.isDragging = true;
        self.selection = false;

        self.lastPosX = evt.clientX;
        self.lastPosY = evt.clientY;
        // self.defaultCursor = "grab";
      }
    });
    canvas.on("mouse:move", function (opt: any) {
      if (self.isDragging) {
        var e = opt.e;
        var vpt = canvas.viewportTransform as any;
        vpt[4] += e.clientX - self.lastPosX;
        vpt[5] += e.clientY - self.lastPosY;

        canvas.requestRenderAll();

        self.lastPosX = e.clientX;
        self.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function (opt: any) {
      self.setViewportTransform(self.viewportTransform);

      self.isDragging = false;
      self.selection = true;
      // self.defaultCursor = "default";
    });

    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 32:
          // self.defaultCursor = "grab";
          canvas.hoverCursor = "grab";
      }
    };

    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case 32:
          // self.defaultCursor = "default";
          canvas.hoverCursor = "default";
      }
    };

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, [canvas]);
};
