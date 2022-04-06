function setup() {
  document.getElementById("fahrenheit").onclick =
    function () {
      setUnits("C");
    };
  document.getElementById("celsius").onclick =
    function () {
      setUnits("F");
    };
}

function setUnits(unit) {
  var label = document.getElementById("label");
  label.innerHTML = "&deg; " + unit;
}

function convert() {
  var celsiusButton = document.getElementById(
    "celsius");
  var temperature = document.getElementById(
    "temperature");

  if (celsiusButton.checked) {
    convertToCelsius(temperature.value);
  } else {
    convertToFahrenheit(temperature.value);
  }
}

function convertToCelsius(temperatureInFahrenheit) {
  var celsiusTemperature = (
    temperatureInFahrenheit - 32) * 5 / 9;
  document.getElementById("answer").innerHTML =
    temperatureInFahrenheit +
    "&deg; Fahrenheit converts to " +
    celsiusTemperature.toFixed(1) +
    "&deg; Celsius";
}

function convertToFahrenheit(temperatureInCelsius) {
  var fahrenheitTemperature =
    temperatureInCelsius * 9 / 5 + 32;
  document.getElementById("answer").innerHTML =
    temperatureInCelsius +
    "&deg; Celsius converts to " +
    fahrenheitTemperature.toFixed(1) +
    "&deg; Fahrenheit";
}