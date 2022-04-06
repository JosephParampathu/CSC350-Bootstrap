function draw() {
  var canvas = document.getElementById(
    "canvasElement");
  var canvasContext = canvas.getContext("2d");

  drawBorder(canvasContext, 400, 400);
  drawRectangle(canvasContext, 20, 20, 150, 150);
  drawCircle(canvasContext, 300, 100, 75);
  drawTriangle(canvasContext, 20, 200, 150);
  drawSemicircle(canvasContext, 300, 200, 75);
  drawText(canvasContext, "Demo", 125, 375);
}

function drawBorder(canvasContext, height, width) {
  canvasContext.save();

  canvasContext.beginPath();
  canvasContext.rect(0, 0, height, width);
  canvasContext.lineWidth = 10;
  canvasContext.strokeStyle = "black";
  canvasContext.stroke();
  canvasContext.closePath();

  canvasContext.restore();
}

function drawRectangle(canvasContext, x, y, width,
  height) {
  canvasContext.fillStyle = "blue";
  canvasContext.fillRect(x, y, width, height);
}

function drawCircle(canvasContext, x, y, r) {
  canvasContext.fillStyle = "red";

  var start = 0;
  var stop = 2 * Math.PI;

  canvasContext.beginPath();
  canvasContext.arc(x, y, r, start, stop);
  canvasContext.stroke();
  canvasContext.fill();
  canvasContext.closePath();
}

function drawTriangle(canvasContext, startX,
  startY, length) {
  canvasContext.fillStyle = "yellow";

  canvasContext.beginPath();
  canvasContext.moveTo(startX, startY);
  canvasContext.lineTo(startX + length, startY);
  canvasContext.lineTo(startX + (length / 2),
    startY + (length / 2));
  canvasContext.lineTo(startX, startY);
  canvasContext.stroke();
  canvasContext.fill();
  canvasContext.closePath();
}

function drawSemicircle(canvasContext, x, y, r) {
  canvasContext.fillStyle = "green";

  var start = 0;
  var stop = Math.PI;

  canvasContext.beginPath();
  canvasContext.arc(x, y, r, start, stop);
  canvasContext.stroke();
  canvasContext.fill();
  canvasContext.closePath();
}

function drawText(canvasContext, text, x, y) {
  canvasContext.fillStyle = "black";
  canvasContext.font = "45px sans-serif";
  canvasContext.fillText(text, x, y);
}