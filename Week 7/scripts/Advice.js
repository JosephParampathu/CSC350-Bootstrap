function advicePage() {
  if (localStorage.getItem("tblRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));

    var tblRecords = JSON.parse(localStorage.getItem(
      "tblRecords"));
    tblRecords.sort(compareDates);
    var i = tblRecords.length - 1;
    var Pressure = tblRecords[i].Pressure;
    var Temperature = tblRecords[i].Temperature;

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, Temperature, Pressure);
  }
}

function drawAdviceCanvas(ctx, Temperature, Pressure) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current Pressure is " + Pressure +
    ".", 25, 320);

  if (Temperature <= 5) {
    ctx.fillText(
      "Your target Pressure range is: 100-500 atm",
      25, 350);
    levelAwrite(ctx, Pressure);
    levelAMeter(ctx, Pressure);
  } else if (Temperature <= 50 && Temperature > 5 ) {
    ctx.fillText(
      "Your target Pressure range is: 50-100 atm",
      25, 350);
    levelBwrite(ctx, Pressure);
    levelBMeter(ctx, Pressure);
  } else if (Temperature > 50) {
    ctx.fillText(
      "Your target Pressure range is: 10-50 atm",
      25, 350);
    levelCwrite(ctx, Pressure);
    levelCMeter(ctx, Pressure);
  }
}

//For deciding what to write for given values of Pressure level A
function levelAwrite(ctx, Pressure) {
  if ((Pressure >= 100) && (Pressure <= 500)) {
    writeAdvice(ctx, "green");
  } else if ((Pressure > 500) && (Pressure <= 600)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelBwrite(ctx, Pressure) {
  if ((Pressure >= 50) && (Pressure <= 100)) {
    writeAdvice(ctx, "green");
  } else if ((Pressure > 100) && (Pressure <= 200)) {
    writeAdvice(ctx, "yellow");
  } else if ((Pressure >= 25) && (Pressure < 50)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelCwrite(ctx, Pressure) {
  if ((Pressure >= 10) && (Pressure <= 50)) {
    writeAdvice(ctx, "green");
  } else if ((Pressure > 50) && (Pressure <= 75)) {
    writeAdvice(ctx, "yellow");
  } else if ((Pressure >= 5) && (Pressure < 10)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "Please adjust the boiler pressure";
    adviceLine2 = " or its temperature.";
  } else if (level == "yellow") {
    adviceLine1 =
      "Check the temperature and pressure ";
    adviceLine2 = "again in 5 minutes.";
  } else if (level = "green") {
    adviceLine1 =
      "Check the temperature and pressure ";
      adviceLine2 = "again in 15 minutes.";
  }
  ctx.fillText("The gauge is " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}

function levelAMeter(ctx, Pressure) {
  if (Pressure <= 600) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, 1000, Pressure)
      .Set("chart.colors.ranges", [
        [600.1, 1000, "red"],
        [500.1, 600, "yellow"],
        [100, 500, "#0f0"]
      ]);
  } else {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, Pressure, Pressure)
      .Set("chart.colors.ranges", [
        [600.1, 1000, "red"],
        [500.1, 600, "yellow"],
        [100, 500, "#0f0"],
        [1000.1, Pressure, "red"]
      ]);
  }
  drawMeter(cg);
}

function levelBMeter(ctx, Pressure) {
  if (Pressure <= 200) {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, 1000, Pressure)
      .Set("chart.colors.ranges", [
        [200.1, 1000, "red"],
        [100.1, 200, "yellow"],
        [50.1, 100, "#0f0"],
        [25, 50, "yellow"]
      ]);
  } else {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, Pressure, Pressure)
      .Set("chart.colors.ranges", [
        [200.1, 1000, "red"],
        [100.1, 200, "yellow"],
        [50.1, 100, "#0f0"],
        [25, 50, "yellow"],
        [1000.1, Pressure, "red"]
      ]);
  }
  drawMeter(bcg);
}

function levelCMeter(ctx, Pressure) {
  if (Pressure <= 75) {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, 1000, Pressure)
      .Set("chart.colors.ranges", [
        [75.1, 1000, "red"],
        [50.1, 75, "yellow"],
        [10.1, 50, "#0f0"],
        [5.1, 10, "yellow"]
      ]);
  } else {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvasT", 0, Pressure, Pressure)
      .Set("chart.colors.ranges", [
        [75.1, 1000, "red"],
        [50.1, 75, "yellow"],
        [10.1, 50, "#0f0"],
        [5.1, 10, "yellow"],
        [1000.1, Pressure, "red"]
      ]);
  }
  drawMeter(ccg);
}

// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", " atm")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Pressure LEVEL")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}
