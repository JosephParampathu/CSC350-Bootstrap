function initialize() {
  $(location).attr("href", "#pageData");
  var angleInput = document.getElementById(
    "angle");
  angleInput.addEventListener("blur",
    validateAngle);

  var velocityInput = document.getElementById(
    "velocity");
  velocityInput.addEventListener("blur",
    validateVelocity);
}

function validateAngle() {
  var angleInput = document.getElementById(
    "angle");
  if (angleInput.value < 1 || angleInput.value >
    90) {
    alert(
      'Angle value must be between 1 and 90');
    angleInput.value = "";
  }
}

function validateVelocity() {
  var velocityInput = document.getElementById(
    "velocity");
  if (velocityInput.value < 1) {
    alert(
      'Velocity value must be greater than 0'
    )
    velocityInput.value = "";
  } else if (velocityInput.value > 299792458) {
    alert(
      'Too fast! The velocity value cannot exceed the speed of light (299 792 458)!'
    );
    velocityInput.value = "";
  }
}

function update() {
  var angle = document.getElementById("angle").value;
  var velocity = document.getElementById(
    "velocity").value;
  calculate(angle, velocity);
}

function calculate(angle, velocity) {
  var horizontalVelocity = velocity * Math.cos(
    (angle * Math.PI) / 180);
  var verticalVelocity = velocity * Math.sin((
    angle * Math.PI) / 180);
  var tMaxHeight = verticalVelocity / 9.81;
  var tLanding = 2 * tMaxHeight;
  var heightArray = [];
  var distanceArray = [];
  var timeArray = [];

  if (tLanding < 2) {
    var interval = 0.1;
  } else if (tLanding < 20) {
    var interval = 1;
  } else {
    var interval = 10;
  }

  for (var time = 0; time <= tLanding +
    interval; time += interval) {
    timeArray.push(time);

    var height = calcHeight(verticalVelocity,
      time);

    if (height < 0) {
      height = 0;
    }
    heightArray.push(Math.round(height));
    var distance = calcDistance(
      horizontalVelocity, time)

    if (distance < 0) {
      distance = 0;
    }

    distanceArray.push(Math.round(distance));
  }

  drawGraph(distanceArray, heightArray);
  labelAxes();
  resizeGraph();
}

function calcDistance(horizontalVelocity, time) {
  var distance = horizontalVelocity * time;
  return distance;
}

function calcHeight(verticalVelocity, time) {
  var height = (verticalVelocity * time) - (0.5 *
    9.81 * time * time);
  return height;
}

function drawGraph(distanceArray, heightArray) {
  $(location).attr("href", "#pageGraph");
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);
  var TSHline = new RGraph.Line("GraphCanvas",
      heightArray)
    .Set("labels", distanceArray)
    .Set("colors", ["blue"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("ticksize", 5)
    .Set("chart.title", "Projectile")
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("distance", 400, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("height", -250, 10);
}

function resizeGraph() {
  if ($(window).width() < 700) {
    $("#GraphCanvas").css({
      "width": $(window).width() - 50
    });
  }
}