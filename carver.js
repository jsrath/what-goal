/* Variables
---------------------------------------------------------------------------- */
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

/* Add or Remove Goal Boxes
---------------------------------------------------------------------------- */
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

/* Event Listeners
---------------------------------------------------------------------------- */

/* Clicks
--------------------------------------------------- */

document.getElementById("addGoalBoxes").addEventListener("click", function (event) {
    addFields();
});

document.getElementById("removeGoalBoxes").addEventListener("click", function (event) {
    removeFields();
});

document.getElementById("partTwoButton").addEventListener("click", function (event) {
    createGoalArrays();
});


/* Enter
--------------------------------------------------- */

boxArea.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        addFields();
    }
});

document.getElementById("scoreInput").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        nextScore();
    }
});

/* Create Goal Arrays
---------------------------------------------------------------------------- */
const goalArray = [];
let questionNumber = 0;
function createGoalArrays() {
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i] = [];
    }
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i].push(allBoxes[i].value);
    }
    partOne.style.visibility = "hidden";
    partTwo.style.visibility = "visible";
    nextScore();
}
let questionCounter = 0;
}
function nextScore() {
    let questionText;
    if (questionCounter === 7) {
        goalArray[questionNumber].push(document.getElementById("scoreInput").value);
        questionNumber++;
        questionCounter = 1;
        if (questionNumber > lastBox) {
            tableDisplay();
            return;
        }
    }

    if (questionCounter === 0) {
        document.getElementById("firstGoalText").textContent = goalArray[questionNumber][0];
        questionText = "How would you rate C?";
    } else if (questionCounter === 1) {
        questionText = "How would you rate A?";
    } else if (questionCounter === 2) {
        questionText = "How would you rate R?";
    } else if (questionCounter === 3) {
        questionText = "How would you rate V?";
    } else if (questionCounter === 4) {
        questionText = "How would you rate E?";
    } else if (questionCounter === 5) {
        questionText = "How would you rate R?";
    }
    document.getElementById("questionText").textContent = questionText;
    questionCounter++;
    if(questionCounter === 1 && questionNumber === 0 && document.getElementById("scoreInput").value === ""){
        questionCounter = 0;
        return;
    }
    goalArray[questionNumber].push(document.getElementById("scoreInput").value);
    document.getElementById("scoreInput").value = "";
}

document.getElementById("nextScore").addEventListener("click", function (event) {
    nextScore();
});

function tableDisplay() {
    partTwo.style.visibility = "hidden";
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