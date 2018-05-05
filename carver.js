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
    questionText.textContent = critical;
    goalDisplay.textContent = goalArray[questionNumber][0];
    questionCounter = 1;
}


/* Cycle Through Questions
---------------------------------------------------------------------------- */
function nextScore() {
    questionCounter++;
    goalArray[questionNumber].push(score.value);
    score.value = "";
    if (questionCounter === 7) {
        questionCounter = 1;
        questionNumber++;
        if (questionNumber > lastBox) {
            tableDisplay();
            return;
        }
        goalDisplay.textContent = goalArray[questionNumber][0];
    }
    if (questionCounter === 1) {
        questionText.textContent = critical;
    } else if (questionCounter === 2) {
        questionText.textContent = accessible;
    } else if (questionCounter === 3) {
        questionText.textContent = recuperation;
    } else if (questionCounter === 4) {
        questionText.textContent = vulnerable;
    } else if (questionCounter === 5) {
        questionText.textContent = effect;
    } else if (questionCounter === 6) {
        questionText.textContent = recognize;
    }
}

function tableDisplay() {
    partTwo.style.visibility = "hidden";
    partThree.style.visibility = "visible";
}