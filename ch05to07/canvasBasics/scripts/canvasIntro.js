function draw() {
  var canvas = document.getElementById(
    "canvasElement");
  var canvasContext = canvas.getContext("2d");

  drawLine(canvasContext, 50, 50, 200, 80);
  drawCircle(canvasContext, 125, 125, 50);
}

function drawLine(canvasContext, lineStartX,
  lineStartY,
  lineEndX, lineEndY) {
  canvasContext.beginPath();
  canvasContext.moveTo(lineStartX, lineStartY);
  canvasContext.lineTo(lineEndX, lineEndY);
  canvasContext.stroke();
}

function drawCircle(canvasContext, centerX,
  centerY, radius) {
  var startAngleInRadians = 0;
  var endAngleInRadians = 2 * Math.PI;

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius,
    startAngleInRadians,
    endAngleInRadians);
  canvasContext.stroke();
}