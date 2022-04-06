function drawGraph() {
  if (localStorage.getItem("tblRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    setupCanvas();

    var Temparr = new Array();
    var Pressarr = new Array();
    var Datearr = new Array();
    getHistory(Temparr, Pressarr, Datearr);

    drawLines(Temparr, Pressarr,
      Datearr)
    labelAxes();
  }
}

function setupCanvas() {

  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

  var d = document.getElementById("GraphCanvas");
  var dtx = d.getContext("2d");

  dtx.fillStyle = "#FFFFFF";
  dtx.fillRect(0, 0, 500, 500);

}

function getHistory(Temparr, Pressarr, Datearr) {
  var tblRecords = JSON.parse(localStorage.getItem(
    "tblRecords"));

  tblRecords.sort(compareDates);

  for (var i = 0; i < tblRecords.length; i++) {
    var date = new Date(tblRecords[i].ExamDate);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var m = date.getMonth() + 1;
    var d = date.getDate() + 1;

    //The x-axis label
    Datearr[i] = (m + "/" + d);

    //The point to plot
    Temparr[i] = parseFloat(tblRecords[i].Temperature);
    Pressarr[i] = parseFloat(tblRecords[i].Pressure);
  }
}

function drawLines(Temparr, Pressarr,
  Datearr) {
  var TempLine = new RGraph.Line("GraphCanvas",
      Temparr)
    .Set("labels", Datearr)
    .Set("colors", ["blue", "green"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [, , ["Temperature",
      "blue", "yellow", 1, 80
    ], , ])
    .Set("chart.title", "Temperature")
    .Draw();

    var PressLine = new RGraph.Line("GraphCanvasT",
        Pressarr)
      .Set("labels", Datearr)
      .Set("colors", ["blue", "green"])
      .Set("shadow", true)
      .Set("shadow.offsetx", 1)
      .Set("shadow.offsety", 1)
      .Set("linewidth", 1)
      .Set("numxticks", 6)
      .Set("scale.decimals", 2)
      .Set("xaxispos", "bottom")
      .Set("gutter.left", 40)
      .Set("tickmarks", "filledcircle")
      .Set("ticksize", 5)
      .Set("chart.labels.ingraph", [, , ["Pressure",
        "blue", "yellow", 1, 80
      ], , ])
      .Set("chart.title", "Pressure")
      .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Date(MM/DD)", 400, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("Temperature", -250, 10);

  var d = document.getElementById("GraphCanvasT");
  var dtx = d.getContext("2d");
  dtx.font = "11px Georgia";
  dtx.fillStyle = "green";
  dtx.fillText("Date(MM/DD)", 400, 470);
  dtx.rotate(-Math.PI / 2);
  dtx.textAlign = "center";
  dtx.fillText("Pressure", -250, 10);
}
