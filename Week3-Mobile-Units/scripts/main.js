function update(){
  let selectUnits=$('#selectUnits option:selected').text();
  let units=$("#units").val();
  let result=$('#result');
  //Constants
  const GALLONS=0.264172
  const LITERS=3.78541
//Checks the input for validity and provides an error message if the value in invalid. Otherwise provides the converted value
  if(units.length===0 || $.isNumeric(units)===false || parseInt(units) < 1 || parseInt(units) > 500){
    $('#unitsInvalid').text('Please enter a valid number between 1 and 500.');
  } else {
    $('#unitsInvalid').text('');
    let convert = (selectUnits == 'Gallons' ? units*LITERS + ' Liters' : units*GALLONS + ' Gallons');
    result.text(units + ' ' + selectUnits + ' converts to ' + convert);
  }
}
