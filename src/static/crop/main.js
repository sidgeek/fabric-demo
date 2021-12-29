var canvas = new fabric.Canvas("c1");
var src = "http://fabricjs.com/lib/pug.jpg";
canvas.backgroundColor = "#333";
canvas.renderAll();

var pos = [0, 0];

var r = document.getElementById("c1").getBoundingClientRect();
pos[0] = r.left;
pos[1] = r.top;

var mousex = 0;
var mousey = 0;
var crop = false;
var disabled = false;

//console.log(pos);

var el = new fabric.Rect({
  //left: 100,
  //top: 100,
  fill: "transparent",
  originX: "left",
  originY: "top",
  stroke: "#ccc",
  strokeDashArray: [2, 2],
  opacity: 1,
  width: 1,
  height: 1,
});

el.visible = false;
canvas.add(el);
var object;
fabric.util.loadImage(src, function (img) {
  object = new fabric.Image(img);
  object.set({
    left: 100,
    top: 100,
    selectable: false,
  });
  object.hasRotatingPoint = true;
  object.scaleX = object.scaleY = 0.25;
  canvas.add(object);
  canvas.renderAll();
});

canvas.on("mouse:down", function (event) {
  if (disabled) return;
  el.left = event.e.pageX - pos[0];
  el.top = event.e.pageY - pos[1];
  //el.selectable = false;
  el.visible = true;
  mousex = event.e.pageX;
  mousey = event.e.pageY;
  crop = true;
  canvas.bringToFront(el);
});

canvas.on("mouse:move", function (event) {
  //console.log(event);
  if (crop && !disabled) {
    if (event.e.pageX - mousex > 0) {
      el.width = event.e.pageX - mousex;
    }

    if (event.e.pageY - mousey > 0) {
      el.height = event.e.pageY - mousey;
    }
  }
});

canvas.on("mouse:up", function (event) {
  crop = false;
});

let cropButton = document.getElementById("cropB");

cropButton.addEventListener(
  "click",
  function (event) {
    //alert("hii");
    var left = el.left - object.left;
    var top = el.top - object.top;

    left *= 1 / 0.25;
    top *= 1 / 0.25;

    var width = (el.width * 1) / 0.25;
    var height = (el.height * 1) / 0.25;

    object.clipTo = function (ctx) {
      ctx.rect(left, top, width, height);
    };
    object.selectable = true;
    disabled = true;
    el.visible = false;
    canvas.renderAll();
  },
  false
);
