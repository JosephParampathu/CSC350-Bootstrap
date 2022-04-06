function initialize() {
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

  document.getElementById('height').innerHTML =
    calcHeight(verticalVelocity, tMaxHeight);

  document.getElementById('distance').innerHTML =
    calcDistance(horizontalVelocity, tLanding);

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