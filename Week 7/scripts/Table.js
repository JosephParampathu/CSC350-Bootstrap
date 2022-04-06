// Removes all record data from localStorage
$("#btnClearHistory").click(function () {
  localStorage.removeItem("tblRecords");
  listRecords();
  alert("All records have been deleted.");
});

/* The value of the Submit Record button is used
 * to determine which operation should be
 * performed
 */
$(document).ready(function()
{
  $("#btnSubmitRecord").click(function()
  {
     $("#btnSubmitRecord").attr("href", "#pageRecords").button();
     addRecord();

  });
});

function clearRecordForm() {
  $('#datExamDate').val("");
  $('#txtPressure').val("");
  $('#txtTemperature').val("");
  return true;
}

function compareDates(a, b) {
  var x = new Date(a.ExamDate);
  var y = new Date(b.ExamDate);

  if (x > y) {
    return 1;
  } else {
    return -1;
  }
}

function listRecords() {
  try {
    var tblRecords = JSON.parse(localStorage.getItem(
      "tblRecords"));
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  //Load previous records, if they exist
  if (tblRecords != null) {
    //Order the records by date
    tblRecords.sort(compareDates);

    //Initializing the table
    $("#tblRecords").html(
      "<thead>" +
      "   <tr>" +
      "     <th>Exam Date</th>" +
      "     <th><abbr title='txtPressure'>Pressure</abbr></th>" +
      "     <th><abbr title='txtTemperature'>Temperature</abbr></th>" +
      "     <th>Edit / Delete</th>" +
      "   </tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    //Loop to insert the each record in the table
    for (var i = 1; i < tblRecords.length; i++) {
      var rec = tblRecords[i];
      $("#tblRecords tbody").append("<tr>" +
        "  <td>" + rec.ExamDate + "</td>" +
        "  <td>" + rec.Pressure + "</td>" +
        "  <td>" + rec.Temperature + "</td>" +
        "</td>" +
        "  <td><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewRecordForm' onclick='callEdit(" +
        i +
        ")' data-icon='edit' data-iconpos='notext'></a>" +
        "  <a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDelete(" +
        i +
        ")' data-icon='delete' data-iconpos='notext'></a></td>" +
        "</tr>");
    }

    $('#tblRecords [data-role="button"]').button(); // 'Refresh' the buttons. Without this the delete/edit buttons wont appear
  } else {
    tblRecords = []; //If there is no data,set an empty array
    $("#tblRecords").html("");
  }
  return true;
}

function showRecordForm(index) {
  try {
    var tblRecords = JSON.parse(localStorage.getItem(
      "tblRecords"));
    var rec = tblRecords[index];
    $('#datExamDate').val(rec.Date);
    $('#txtTSH').val(rec.TSH);
    $('#txtThyroglobulin').val(rec.Tg);
    $('#txtSynthroidDose').val(rec.SynthroidDose);
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

/* Checks that users have entered all valid info
 * and that the date they have entered is not in
 * the future
 */
function checkRecordForm() {
  //for finding current date
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var currentDate = d.getFullYear() + '/' +
    (('' + month).length < 2 ? '0' : '') +
    month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

  if (($("#txtTSH").val() != "") &&
    ($("#datExamDate").val() != "") &&
    ($("#datExamDate").val() <= currentDate) &&
    (parseFloat($("#txtSynthroidDose").val()) <
      1000000) &&
    ($("#txtSynthroidDose").val() != "")) {
    return true;
  } else {
    return false;
  }
}

function callEdit(index) {
  $("#btnSubmitRecord").attr("indexToEdit",
    index);
  /*.button("refresh") function forces jQuery
   * Mobile to refresh the text on the button
   */
  $("#btnSubmitRecord").val("Edit").button(
    "refresh");
}

// Delete the given index and re-display the table
function callDelete(index) {
  deleteRecord(index);
  listRecords();
}

function addRecord() {
    var record = {
      "ExamDate": $('#datExamDate').val(),
      "Pressure": $('#txtPressure').val(),
      "Temperature": $('#txtTemperature').val(),
    };

    try {
      var tblRecords = JSON.parse(localStorage.getItem(
        "tblRecords"));
      if (tblRecords == null) {
        tblRecords = [];
      }
      tblRecords.push(record);
      tblRecords.sort(compareDates);
      localStorage.setItem("tblRecords", JSON.stringify(
        tblRecords));
      alert("Saving Information");
      clearRecordForm();
      listRecords();
    } catch (e) {
      /* Google browsers use different error
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
      console.log(e);
    }
}

function deleteRecord(index) {
  try {
    var tblRecords = JSON.parse(localStorage.getItem(
      "tblRecords"));

    tblRecords.splice(index, 1);

    if (tblRecords.length == 0) {
      /* No items left in records, remove entire
       * array from localStorage
       */
      localStorage.removeItem("tblRecords");
    } else {
      localStorage.setItem("tblRecords", JSON.stringify(
        tblRecords));
    }
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

function editRecord(index) {
  try {
    var tblRecords = JSON.parse(localStorage.getItem(
      "tblRecords"));
    tblRecords[index] = {
      "Exam Date": $('#datExamDate').val(),
      "Pressure": $('#txtPressure').val(),
      "Temperature": $('#txtTemperature').val(),
    }; //Alter the selected item in the array
    tblRecords.sort(compareDates);
    localStorage.setItem("tblRecords", JSON.stringify(
      tblRecords)); //Saving array to local storage
    alert("Saving Information");
    clearRecordForm();
    listRecords();
  } catch (e) {
    /* Google browsers use different error
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}
