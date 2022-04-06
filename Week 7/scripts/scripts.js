function addValueToPassword(button)
{
  var currVal = $("#passcode").val();
  if(button=="bksp")
  {
    $("#passcode").val(currVal.substring(0,currVal.length-1));
  }
  else
  {
    $("#passcode").val(currVal.concat(button));
  }
}

$(document).ready(function()
{
  $("#btnEnter").click(function()
  {
    var password = getPassword();
    if(document.getElementById("passcode").value==password)
    {
      $("#btnEnter").attr("href", "#pageMenu").button();
    }
    else
    {
      alert("Incorrect password, please try again.");
    }
  });
});

function getPassword()
{
  return "1111";
}

$(document).ready(function()
{
  $("#frmUserForm").submit(function()
  { //Event : submitting the form
    saveUserForm();
  });
});

function saveUserForm()
{
  var user = {
    "Manufacturer" : $("#txtManufacturer").val(),
    "PurchaseDate" : $("#datPurchaseDate").val(),
    "BoilerID" : $("#txtBoilerID").val(),
    "MaxTemperature" : $("#txtMaxTemperature").val(),
    "MaxPressure" : $("#txtMaxPressure").val(),
    "NewPassword" : $("#changePassword").val(),
  };

  try
  {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Saving Information");
    $("#btnUserUpdate").attr("href", "#pageMenu").button();
  }
  catch(e)
  {
    if (window.navigator.vendor === "Google Inc.")
    {
      if(e == DOMException.QUOTA_EXCEEDED_ERR)
      {
        alert("Error: Local Storage limit exceeds.");
      }
    }
    else if (e == QUOTA_EXCEEDED_ERR)
    {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

function showUserForm()
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
    $("#txtManufacturer").val(user.Manufacturer);
    $("#datPurchaseDate").val(user.PurchaseDate);
    $("#txtBoilerID").val(user.BoilerID);
    $("#txtMaxTemperature").val(user.MaxTemperature);
    $("#txtMaxPressure").val(user.MaxPressure);
    $("#changePassword").val(user.NewPassword);
  }
}
