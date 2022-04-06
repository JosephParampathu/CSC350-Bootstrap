function display() {
  var angle = document.getElementById("angle").value;
  var velocity = document.getElementById(
    "velocity").value;

  document.getElementById("angleDisplay").innerHTML =
    angle;

  document.getElementById("velocityDisplay").innerHTML =
    velocity;
}