const boxArea = document.getElementById("goalBoxArea");
const allBoxes = document.getElementsByClassName("goalInput");
const firstBox = allBoxes[0];
const allBreaks = document.getElementsByTagName("br");
let lastBreak = allBreaks.length - 1;
let lastBox = allBoxes.length - 1;
let boxIndex = 1;
const partOne = document.getElementById("partOne");
const partTwo = document.getElementById("partTwo");

partTwo.style.visibility = "hidden";

//Add more goals
function addFields() {
    let input = document.createElement("input");
    input.className = "goalInput";
    input.type = "text";
    input.id = "goalBox" + boxIndex++;
    input.name = input.id;
    boxArea.appendChild(input);
    boxArea.appendChild(document.createElement("br"));
    lastBox++;
    allBoxes[lastBox].focus();
}

function removeFields() {
    boxArea.removeChild(boxArea.lastChild.previousSibling);
    boxArea.removeChild(boxArea.lastChild);
    lastBox--;
    allBoxes[lastBox].focus();
}

boxArea.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        addFields();
    }
});

document.getElementById("partTwoButton").addEventListener("click", function (event) {
    createGoalArrays();
});

function createGoalArrays() {
    const goalArray = [];
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i] = [];
    }
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i].push(allBoxes[i].value);
    }
    partOne.style.visibility = "hidden";
    partTwo.style.visibility = "visible";
    document.getElementById("firstGoalText").textContent = goalArray[0][0];
        
    }

function nextCriteria() {
    document.write("Sup BITCHES!!!!");
}

 /*   const input = document.createElement("input");
	input.className = "carverAnswers";
	input.type = "text";
	input.id = "carver" + boxIndex++;
	input.name = input.id;
	boxArea.appendChild(input);
	boxArea.appendChild(document.createElement("br"));
	lastBox++;
	allBoxes[lastBox].focus(); */


/*//Create arrays
const myArray = [];
function goalArray (){
	for (const i = 0; i<allBoxes.length; i++) {
    myArray.push(allBoxes[i].value);
    }
}

for(const i = 0; i<allBoxes.length; i++){
	
}
function arrayz (){
const array = [
    [allBoxes[0].value],
    [allBoxes[1].value],
    [allBoxes[2].value]
  ] // Creating a data array which a loop will source from

const table = document.createElement('table');
document.body.appendChild(table); // Drew the main table node on the document

array.forEach(function(row) {
  const tr = table.insertRow(); //Create a new row

  row.forEach(function(column) {
    const td = tr.insertCell();
    td.innerText = column; // Take string from placeholder variable and append it to <tr> node
  });
});
}
*/
//@ sourceMappingURL = Test.js