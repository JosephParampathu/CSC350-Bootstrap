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
      'Too fast! The velocity value cannot ' + 
      'exceed the speed of light (299 792 458)!'
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

    heightArray.push(height);
    var distance = calcDistance(
      horizontalVelocity, time)

    if (distance < 0) {
      distance = 0;
    }

    distanceArray.push(distance);
  }

  updateTable(timeArray, distanceArray,
    heightArray);
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

function updateTable(timeArray, distanceArray,
  heightArray) {
  var dataTable = document.getElementById(
    'data');

  dataTable.innerHTML = '';

  //Header row
  var row = dataTable.insertRow(0);
  var timeCell = row.insertCell(0);
  var distanceCell = row.insertCell(1);
  var heightCell = row.insertCell(2);

  timeCell.innerHTML = 'Time';
  distanceCell.innerHTML = 'Distance';
  heightCell.innerHTML = 'Height';

  //Insert data
  for (var i = 0; i < timeArray.length; i++) {
    var row = dataTable.insertRow(-1);
    var timeCell = row.insertCell(0);
    var distanceCell = row.insertCell(1);
    var heightCell = row.insertCell(2);

    timeCell.innerHTML = timeArray[i].toFixed(2);
    distanceCell.innerHTML = distanceArray[i].toFixed(
      2);
    heightCell.innerHTML = heightArray[i].toFixed(
      2);
  }
}
