function resizeGraph() {
  if ($(window).width() < 700) {
    $("#GraphCanvas").css({
      "width": $(window).width() - 50
    });
    $("#GraphCanvasT").css({
      "width": $(window).width() - 50
    });
    $("#AdviceCanvas").css({
      "width": $(window).width() - 50
    });
    $("#AdviceCanvasT").css({
      "width": $(window).width() - 50
    });
  }
}

// Attach event handler for window resizing event
$(window).resize(function () {
  resizeGraph();
});

/*Runs the function to display the user information, history,
 * graph or suggestions, every time their div is shown
 */
$(document).on("pageshow", function () {
  if ($('.ui-page-active').attr('id') ==
    "pageUserInfo") {
    showUserForm();
  } else if ($('.ui-page-active').attr('id') ==
    "pageRecords") {
    loadUserInformation();
    listRecords();
  } else if ($('.ui-page-active').attr('id') ==
    "pageAdvice") {
    advicePage();
    resizeGraph();
  } else if ($('.ui-page-active').attr('id') ==
    "pageGraph") {
    drawGraph();
    resizeGraph();
  }
});

function loadUserInformation()
{
  try
  {
    var user=JSON.parse(localStorage.getItem("user"));
  }
  catch(e)
  {
    if (window.navigator.vendor==="Google Inc")
    {
      if (e == DOMException.QUOTA_EXCEEDED_ERR)
      {
        alert("Error: Local Storage limit exceeds");
      }
    }
    else if (e == QUOTA_EXCEEDED_ERR)
    {
      alert("Error: Saving to local storage");
    }

    console.log(e);
  }

  if (user != null)
  {
    $("#tblRecords").append("<tr><th>User's Exam Date</th><th>User's Pressure:</th><th>User's Temperature:</th></tr>"
    +"<tr><td>"+user.ExamDate+"</td><td>"+user.Pressure+"</td><td>"+user.Temperature+"</td></tr>");
    $("#tblRecords").append("<br><a href='#pageUserInfo' data-mini='true' id='btnProfile' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
    $('#btnProfile').button();
  }
}
