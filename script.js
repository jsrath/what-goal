/* Part One Variables
---------------------------------------------------------------------------- */
const boxArea = document.getElementById('goalBoxArea');
const allBoxes = document.getElementsByClassName('goalInput');
const firstBox = allBoxes[0];
const allBreaks = document.getElementsByTagName('br');
let lastBreak = allBreaks.length - 1;
let lastBox = allBoxes.length - 1;
let boxIndex = 1;
const intro = document.getElementById('intro');
const partOne = document.getElementById('partOne');
const partTwo = document.getElementById('partTwo');
const partThree = document.getElementById('partThree');

partTwo.style.display = 'none';
partThree.style.display = 'none';

/* Add or Remove Goal Boxes
---------------------------------------------------------------------------- */
function addFields() {
  let input = document.createElement('input');
  input.className = 'goalInput';
  input.type = 'text';
  input.id = 'goalBox' + boxIndex++;
  input.name = input.id;
  input.placeholder = 'Enter a goal'
  boxArea.appendChild(input);
  boxArea.appendChild(document.createElement('br'));
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

document.getElementById('addGoalBoxes').addEventListener('click', function (event) {
  addFields();
});

document.getElementById('removeGoalBoxes').addEventListener('click', function (event) {
  removeFields();
});

document.getElementById('partTwoButton').addEventListener('click', function (event) {
  createGoalArrays();
});

document.getElementById('nextScore').addEventListener('click', function (event) {
  nextScore();
});


/* -- Enter
--------------------------------------------------- */

boxArea.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    addFields();
  }
});

document.getElementById('scoreInput').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    nextScore();
  }
});

/* Part Two Variables
---------------------------------------------------------------------------- */
let questionNumber = 0;
let questionCounter = 0;
let questionText = document.getElementById('questionText');
let goalDisplay = document.getElementById('firstGoalText');
const critical = '<p>How important is this goal to your life?</p><p>From <span class="bold"> 1 (not important) to 10 (very important)</span> how critical is this goal?</p>';
const accessible = '<p>Do you have, or can you easily obtain, the resources necessary to accomplish this goal?</p><p>From <span class="bold"> 1 (no resources) to 10 (full resources)</span> do you have the required resources?</p>';
const recuperation = '<p>If you achieve this goal, will it solve an issue permanently or is the issue likely to reoccur?</p><p>From <span class="bold"> 1 (temporary) to 10 (permanent)</span> how long will achieving this goal last?</p>';
const vulnerable = '<p>How easy is this goal to achieve?</p><p>From <span class="bold">1 (easy) to 10 (difficult)</span> is this something you can practically achieve?</p>';
const effect = '<p>If you achieve this goal, will it have a significant long-term impact on your life?</p><p>From <span class="bold"> 1 (least impact) to 10 (most impact)</span> how much impact will this goal have on your life?</p>';
const recognize = '<p>Is this goal clearly defined and easy to recognize or is it unclear?</p><p>From <span class="bold"> 1 (unclear) to 10 (very clear)</span> how defined is this goal?</p>';
const score = document.getElementById('scoreInput');

/* Create Goal Arrays
---------------------------------------------------------------------------- */
const goalArray = [];
function createGoalArrays() {
  if (allBoxes.length > 1) {
    for (let i = 0; i < allBoxes.length; i++) {
      goalArray[i] = [];
    }
    for (let i = 0; i < allBoxes.length; i++) {
      goalArray[i].push(allBoxes[i].value);
    }
    partOne.style.display = 'none';
    partTwo.style.display = 'block';
    questionText.innerHTML = critical;
    goalDisplay.innerHTML = goalArray[questionNumber][0];
    questionCounter = 1;
  } else {
    document.getElementById('noOfGoals').textContent = 'Please enter more than one goal!'
    setTimeout(() => {
      document.getElementById('noOfGoals').textContent = ''
    }, 3000);
  }
}

/* Cycle Through Questions
---------------------------------------------------------------------------- */
function nextScore() {
  if (isNaN(score.value) || score.value < 1) {
    document.getElementById('errorMessage').textContent = 'Whoops! Please enter a number from 1 to 10';
    return;
  } else {
    questionCounter++;
    document.getElementById('errorMessage').textContent = '';
    goalArray[questionNumber].push(Number(score.value));
  }
  score.value = '';
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

  partTwo.style.display = 'none';
  partThree.style.display = 'block';

  const tableContainer = document.getElementById('tableContainer');
  let resultsTableBody = document.createElement('tbody');

  for (let i = 0; i < allBoxes.length; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement('td');
      let cellText = document.createTextNode(goalArray[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    resultsTableBody.appendChild(row);
  }
  tableContainer.appendChild(resultsTableBody);

  let winner = document.getElementById('winner');
  winner.innerText = document.querySelector('tr:first-child td:first-child').innerText;
}

