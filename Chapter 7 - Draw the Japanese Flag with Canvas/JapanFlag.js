function draw()
{
  var canvas = document.getElementById("canvasElement");
  var canvasContext = canvas.getContext("2d");

  drawPole(canvasContext);
  drawBorder(canvasContext, 50, 0, 300, 200);
  drawCircle(canvasContext, 200, 100, 45);
}

function drawPole(canvasContext)
{
    drawRectangle(canvasContext, 0, 0, 50, 500, "grey");
}

function drawRectangle(canvasContext, x, y, width, height, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

function drawBorder(canvasContext, x, y, height, width)
{
  canvasContext.save();

  canvasContext.beginPath();
  canvasContext.rect(x, y, height, width);
  canvasContext.lineWidth = 5;
  canvasContext.strokeStyle = "black";
  canvasContext.stroke();
  canvasContext.closePath();

  canvasContext.restore();
}

function drawCircle(canvasContext, x, y, r)
{
  canvasContext.fillStyle = "red";
  
  var start = 0;
  var stop = 2*Math.PI;

  canvasContext.beginPath();
  canvasContext.arc(x, y, r, start, stop);
  canvasContext.stroke();
  canvasContext.fill();
  canvasContext.closePath();
}

