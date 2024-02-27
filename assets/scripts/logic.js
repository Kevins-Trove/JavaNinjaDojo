// variables to keep track of quiz state
var questionIndex = 0;
var time = questions.length * 15;
var timeId;

var score1 = {
  name: "",
  score: 0
}

var score2 = {
  name: "",
  score: 0
}

var score3 = {
  name: "",
  score: 0
}

var x = new Array();

score1.name = "KR";
score1.score = 50;
x.push(score1);
score2.name = "FE";
score2.score = 76;
x.push(score2);
score3.name = "we";
score3.score = 3;
x.push(score3);
localStorage.setItem("dojoScores", JSON.stringify(x));

// variables to reference DOM elements
var startEl = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var endEl = document.querySelector('#end');
var startBtn = document.querySelector('#startButton');
var highScores = document.querySelectorAll('.highScores');

var timeEl = document.querySelector('#time');


// Setup Event listeners
window.addEventListener('load', () => {
  startEl.style.display ="flex";
  questionsEl.style.display ="none";
  endEl.style.display ="none";
  
  updateScores();
});


startBtn.addEventListener('click', () => {
  startEl.style.display ="none";
  questionsEl.style.display ="flex";
  endEl.style.display ="none";
});

// Functions
function updateScores() {
  // update previous high scores, only post the top three
  var savedScores = localStorage.getItem("dojoScores");
  
  if (savedScores) {
    var decoded = JSON.parse(savedScores);
console.log(decoded);
    decoded.sort( (a,b) => {
      if (a.score > b.score) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(decoded);
    for (var i =0; i < 3; i++ ){
      if (i< decoded.length){
        if (decoded[i])
    
          highScores[i].textContent = decoded[i].name + " " + decoded[i].score + " - " + ninjaLevel(decoded[i].score);
      } else {
        highScores[i].textContent = "No score";
      }
    }
   

  }
}

// returns ninga name levels by value
function ninjaLevel(value) {
  // update previous high scores, only post the top three
  switch(true) {
    case value  >= 75:
      return "MASTER OF UNIVERSE"
      break;
    case value >= 50:
      return "Ninja coder"
      break;
    case value >= 20:
      return "Novice"
      break;
    case value >= 10 :
        return "No chance of being a ninja"
        break;
    default:
      return "Try needle point"
  }

}



/*
// sound effects
var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  // un-hide questions section
  questionsEl.removeAttribute('class');

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}


function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    // play "wrong" sound effect
    sfxWrong.play();

    feedbackEl.textContent = 'Wrong!';
  } else {
    // play "right" sound effect
    sfxRight.play();

    feedbackEl.textContent = 'Correct!';
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
*/