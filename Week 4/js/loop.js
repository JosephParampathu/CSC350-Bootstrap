let randomBK = ['darkgreen', 'navy', 'maroon', 'black']; //globally set background color array

function createTable() {
  let myTable = document.createElement('table');
  document.body.appendChild(myTable);
  document.body.style.backgroundColor = randomBK[Math.floor(Math.random()*randomBK.length)];

  for (let i = 2; i<= 100; i++)
  {
    let currentRow = myTable.insertRow(-1);
    let firstCell = currentRow.insertCell(0);
    i = i * Math.floor(Math.random() * 3 + 1);  //Random number of 1, 2, 3, or 4
    firstCell.innerHTML = i.toString();

    let secondCell = currentRow.insertCell(1);
    secondCell.innerHTML = (i * i).toString();

    let thirdCell = currentRow.insertCell(2);
    thirdCell.innerHTML = (i * i * i).toString();
  }

  let tableLength = myTable.rows.length.toString();
  let numberOfCells = tableLength * myTable.rows[0].cells.length;
  let rowCountMessage = document.createTextNode("Number of Cells in the Table: " + numberOfCells);
  myTable.append(rowCountMessage);
}

function regenerate() {
  let myTable = document.getElementsByTagName("table");
  document.body.removeChild(myTable[0]);
  createTable();
}
