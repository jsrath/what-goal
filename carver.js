/* Part One Variables
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
const partThree = document.getElementById("partThree");

partTwo.style.visibility = "hidden";
partThree.style.visibility = "hidden";

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

/* -- Clicks
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

document.getElementById("nextScore").addEventListener("click", function (event) {
    nextScore();
});


/* -- Enter
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

/* Part Two Variables
---------------------------------------------------------------------------- */
let questionNumber = 0;
let questionCounter = 0;
let questionText = document.getElementById("questionText");
let goalDisplay = document.getElementById("firstGoalText");
const critical = "How critical is this to your life?";
const accessible = "How accessible is this?";
const recuperation = "Will you be able to recuperate?";
const vulnerable = "How vulnerable is this?";
const effect = "What effect will this have?";
const recognize = "Can you easily recognize this?";
const score = document.getElementById("scoreInput");

/* Create Goal Arrays
---------------------------------------------------------------------------- */
const goalArray = [];
function createGoalArrays() {
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i] = [];
    }
    for (let i = 0; i < allBoxes.length; i++) {
        goalArray[i].push(allBoxes[i].value);
    }
    partOne.style.visibility = "hidden";
    partTwo.style.visibility = "visible";
    questionText.innerHTML = critical;
    goalDisplay.innerHTML = goalArray[questionNumber][0];
    questionCounter = 1;
}

/* Cycle Through Questions
---------------------------------------------------------------------------- */
function nextScore() {
    questionCounter++;
    if (isNaN(score.value)) {
        document.getElementById("errorMessage").textContent = "Please enter a number from 1 to 10";
        return;
    } else {
        goalArray[questionNumber].push(Number(score.value));
    }
    score.value = "";
    if (questionCounter === 7) {
        questionCounter = 1;
        questionNumber++;
        if (questionNumber > lastBox) {
            tableDisplay();
            return;
        }
        goalDisplay.innerHTML = goalArray[questionNumber][0];
    }
    if (questionCounter === 1) {
        questionText.innerHTML = critical;
    } else if (questionCounter === 2) {
        questionText.innerHTML = accessible;
    } else if (questionCounter === 3) {
        questionText.innerHTML = recuperation;
    } else if (questionCounter === 4) {
        questionText.innerHTML = vulnerable;
    } else if (questionCounter === 5) {
        questionText.innerHTML = effect;
    } else if (questionCounter === 6) {
        questionText.innerHTML = recognize;
    }
}

function tableDisplay() {
    for (let i = 0; i < allBoxes.length; i++) {
        const goalName = goalArray[i].shift();
        const sum = goalArray[i].reduce((total, amount) => total + amount);
        goalArray[i].push(sum);
        goalArray[i].unshift(goalName);

    }
    
    goalArray.sort(function (a, b) {
        return b[7] - a[7]
    });

    partTwo.style.visibility = "hidden";
    partThree.style.visibility = "visible";

    var tableContainer = document.getElementById("tableContainer");
    var resultsTable = document.createElement("table");
    var resultsTableHead = document.createElement("thead");
    var resultsTableBody = document.createElement("tbody");

    for (let i = 0; i < allBoxes.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(goalArray[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        resultsTableBody.appendChild(row);
    }
    resultsTable.appendChild(resultsTableBody);
    tableContainer.appendChild(resultsTable);
    resultsTable.setAttribute("border", "1");
}