const handleForMouseWheel = (canvas: any) => {
  console.log(">>>> canvas", canvas);
  const onMousewheel = (event: any) => {
    var delta = event.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    event.e.preventDefault();
    event.e.stopPropagation();
  };

  canvas && canvas.on("mouse:wheel", onMousewheel);
};

export default handleForMouseWheel;
