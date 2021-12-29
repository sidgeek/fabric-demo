// ==========================================
// SETUP
// ==========================================

const canvas = new fabric.Canvas("myCanvas");
canvas.backgroundColor = "#222222";
var lastClientX = 0;
var lastClientY = 0;
var state = "default";
const outer = null;
const box1 = null;
const box2 = null;
this.centerLine_horizontal = "";
this.centerLine_vertical = "";
this.alignmentLines_horizontal = "";
this.alignmentLines_vertical = "";

fabric.Object.prototype.set({
  cornerSize: 15,
  cornerStyle: "circle",
  cornerColor: "#ffffff",
  transparentCorners: false,
});

setupObjects();
updateInfo(canvas);

function setupObjects() {
  this.outer = new fabric.Rect({
    width: canvas.getWidth(),
    height: canvas.getHeight(),
    top: 20,
    left: 20,
    stroke: "#ffffff",
    evented: false,
    selectable: false,
  });

  this.box1 = new fabric.Rect({
    width: 240,
    height: 100,
    top: 20,
    left: 20,
    fill: "#fff28a",
    myType: "box",
  });

  this.box2 = new fabric.Rect({
    width: 240,
    height: 100,
    top: 140,
    left: 20,
    fill: "#ff8a8a",
    myType: "box",
  });

  this.box3 = new fabric.Rect({
    width: 100,
    height: 160,
    top: 20,
    left: 280,
    fill: "#cf8aff",
    myType: "box",
  });

  canvas.add(this.outer);
  this.outer.center();

  canvas.add(this.box1);
  canvas.add(this.box2);
  canvas.add(this.box3);
  let allBoxes = new fabric.ActiveSelection(
    canvas.getObjects().filter((obj) => obj.myType == "box"),
    { canvas: canvas }
  );
  allBoxes.center();
  allBoxes.destroy();
}

function updateInfo() {
  let info_zoom = document.getElementById("info_zoom");
  let info_vptTop = document.getElementById("info_vptTop");
  let info_vptLeft = document.getElementById("info_vptLeft");
  let info_centerLine_horizontal = document.getElementById(
    "info_centerLine_horizontal"
  );
  let info_centerLine_vertical = document.getElementById(
    "info_centerLine_vertical"
  );
  let info_alignmentLines_horizontal = document.getElementById(
    "info_alignmentLines_horizontal"
  );
  let info_alignmentLines_vertical = document.getElementById(
    "info_alignmentLines_vertical"
  );

  info_zoom.innerHTML = canvas.getZoom().toFixed(2);
  info_vptTop.innerHTML = Math.round(canvas.viewportTransform[5]);
  info_vptLeft.innerHTML = Math.round(canvas.viewportTransform[4]);
  info_centerLine_horizontal.innerHTML = this.centerLine_horizontal;
  info_centerLine_vertical.innerHTML = this.centerLine_vertical;
  info_alignmentLines_horizontal.innerHTML = this.alignmentLines_horizontal;
  info_alignmentLines_vertical.innerHTML = this.alignmentLines_vertical;
}

// ------------------------------------
// Reset
// ------------------------------------
let resetButton = document.getElementById("reset");

resetButton.addEventListener(
  "click",
  function () {
    reset();
  },
  false
);

function reset() {
  canvas.remove(...canvas.getObjects());
  setupObjects();
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  updateInfo();
}
// ------------------------------------

// ==========================================
// MOUSE INTERACTIONS
// ==========================================

// MOUSEWHEEL ZOOM
canvas.on("mouse:wheel", (opt) => {
  let delta = 0;

  // -------------------------------
  // WHEEL RESOLUTION
  let wheelDelta = opt.e.wheelDelta;
  let deltaY = opt.e.deltaY;

  // CHROME WIN/MAC | SAFARI 7 MAC | OPERA WIN/MAC | EDGE
  if (wheelDelta) {
    delta = -wheelDelta / 120;
  }
  // FIREFOX WIN / MAC | IE
  if (deltaY) {
    deltaY > 0 ? (delta = 1) : (delta = -1);
  }

  let zoom = canvas.getZoom();
  zoom = zoom - delta / 10;

  // limit zoom in
  if (zoom > 4) zoom = 4;

  // limit zoom out
  if (zoom < 0.2) {
    zoom = 0.2;
  }

  canvas.zoomToPoint(
    new fabric.Point(canvas.width / 2, canvas.height / 2),
    zoom
  );

  opt.e.preventDefault();
  opt.e.stopPropagation();

  canvas.renderAll();
  canvas.calcOffset();

  updateInfo(canvas);
});

initCenteringGuidelines(canvas);

// ==========================================
// CANVAS CENTER SNAPPING & ALIGNMENT GUIDELINES
// ==========================================

// ORIGINAL:
// https://github.com/fabricjs/fabric.js/blob/master/lib/centering_guidelines.js

/**
 * Augments canvas by assigning to `onObjectMove` and `onAfterRender`.
 * This kind of sucks because other code using those methods will stop functioning.
 * Need to fix it by replacing callbacks with pub/sub kind of subscription model.
 * (or maybe use existing fabric.util.fire/observe (if it won't be too slow))
 */
function initCenteringGuidelines(canvas) {
  let canvasWidth = canvas.getWidth(),
    canvasHeight = canvas.getHeight(),
    canvasWidthCenter = canvasWidth / 2,
    canvasHeightCenter = canvasHeight / 2,
    canvasWidthCenterMap = {},
    canvasHeightCenterMap = {},
    centerLineMargin = 4,
    centerLineColor = "purple",
    centerLineWidth = 2,
    ctx = canvas.getSelectionContext(),
    viewportTransform;

  for (
    let i = canvasWidthCenter - centerLineMargin,
      len = canvasWidthCenter + centerLineMargin;
    i <= len;
    i++
  ) {
    canvasWidthCenterMap[Math.round(i)] = true;
  }
  for (
    let i = canvasHeightCenter - centerLineMargin,
      len = canvasHeightCenter + centerLineMargin;
    i <= len;
    i++
  ) {
    canvasHeightCenterMap[Math.round(i)] = true;
  }

  function showVerticalCenterLine() {
    showCenterLine(
      canvasWidthCenter + 0.5,
      0,
      canvasWidthCenter + 0.5,
      canvasHeight
    );
  }

  function showHorizontalCenterLine() {
    showCenterLine(
      0,
      canvasHeightCenter + 0.5,
      canvasWidth,
      canvasHeightCenter + 0.5
    );
  }

  function showCenterLine(x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = centerLineColor;
    ctx.lineWidth = centerLineWidth;
    ctx.beginPath();
    ctx.moveTo(x1 * viewportTransform[0], y1 * viewportTransform[3]);
    ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);
    ctx.stroke();
    ctx.restore();
  }

  let isInVerticalCenter, isInHorizontalCenter;

  canvas.on("mouse:down", () => {
    isInVerticalCenter = isInHorizontalCenter = null;
    this.centerLine_horizontal = "";
    this.centerLine_vertical = "";
    updateInfo();
    viewportTransform = canvas.viewportTransform;
  });

  canvas.on("object:moving", function (e) {
    let object = e.target,
      objectCenter = object.getCenterPoint(),
      transform = canvas._currentTransform;

    if (!transform) return;

    (isInVerticalCenter = Math.round(objectCenter.x) in canvasWidthCenterMap),
      (isInHorizontalCenter =
        Math.round(objectCenter.y) in canvasHeightCenterMap);

    if (isInHorizontalCenter || isInVerticalCenter) {
      object.setPositionByOrigin(
        new fabric.Point(
          isInVerticalCenter ? canvasWidthCenter : objectCenter.x,
          isInHorizontalCenter ? canvasHeightCenter : objectCenter.y
        ),
        "center",
        "center"
      );
    }
  });

  canvas.on("before:render", function () {
    canvas.clearContext(canvas.contextTop);
  });

  canvas.on("after:render", () => {
    if (isInVerticalCenter) {
      showVerticalCenterLine();
      this.centerLine_horizontal = "";
      this.centerLine_vertical =
        canvasWidthCenter +
        0.5 +
        ", " +
        0 +
        ", " +
        (canvasWidthCenter + 0.5) +
        ", " +
        canvasHeight;
    }

    if (isInHorizontalCenter) {
      showHorizontalCenterLine();
      this.centerLine_horizontal =
        canvasWidthCenter +
        0.5 +
        ", " +
        0 +
        ", " +
        (canvasWidthCenter + 0.5) +
        ", " +
        canvasHeight;
      this.centerLine_vertical = "";
    }

    updateInfo();
  });

  canvas.on("mouse:up", function () {
    // clear these values, to stop drawing guidelines once mouse is up
    canvas.renderAll();
  });
}
