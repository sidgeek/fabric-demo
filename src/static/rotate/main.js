var srcImg = "http://fabricjs.com/lib/pug.jpg";

// canvas
var canvas = new fabric.Canvas("c");
var angle = 0;

function rotateObject(fabObj, angleRadian, pivotX, pivotY) {
  ty = pivotY - fabObj.height / 2.0;
  tx = pivotX - fabObj.width / 2.0;
  if (angleRadian >= Math.PI * 2) {
    angleRadian -= Math.PI * 2;
  }
  angle2 = Math.atan2(ty, tx);
  angle3 = (2 * angle2 + angleRadian - Math.PI) / 2.0;
  pdist_sq = tx * tx + ty * ty;
  disp = Math.sqrt(2 * pdist_sq * (1 - Math.cos(angleRadian)));
  fabObj.set({
    transformMatrix: [
      Math.cos(angleRadian),
      Math.sin(angleRadian),
      -Math.sin(angleRadian),
      Math.cos(angleRadian),
      disp * Math.cos(angle3),
      disp * Math.sin(angle3),
    ],
  });
}

// img.crossOrigin = "Anonymous";
var img = fabric.Image.fromURL(srcImg, function (oImg) {
  canvas.add(oImg);
  oImg.set("left", 100);
  oImg.set("top", 100);
  oImg.scale(0.5);
  canvas.renderAll();

  setInterval(function rotate() {
    py = oImg.height / 2.0;
    px = oImg.width;
    angle = angle + Math.PI / 60.0;
    console.log(">>> rao", angle, px, py);
    rotateObject(oImg, angle, px, py);
    canvas.renderAll();
  }, 3000);
});
