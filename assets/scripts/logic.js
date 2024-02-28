//------------------------------------------------------------------
// variables to keep track of quiz state
//------------------------------------------------------------------
var questionIndex = 0;
var timeLimit = 15;
var timeLeft;
var timerId;
var userScore = 0;
var itemObj = {
  name: "",
  score: 0
};  

//------------------------------------------------------------------
// variables to reference DOM elements
//------------------------------------------------------------------
var startEl = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var endEl = document.querySelector('#end');
var startBtn = document.querySelector('#startButton');
var highScores = document.querySelectorAll('.highScores');
var initials = document.querySelector('#initials');
var submit = document.querySelector('#submit');
var timeEl = document.querySelector('#time');

//------------------------------------------------------------------
// Setup Event listeners
//------------------------------------------------------------------
// Set initial display when form loads
window.addEventListener('load', () => {
  // Change visibility of sections
  startEl.style.display ="flex";
  questionsEl.style.display ="none";
  endEl.style.display ="none";
  
  updateScores();
});

// start button event, starts timer
startBtn.addEventListener('click', () => {
  // Change visibility of sections
  startEl.style.display ="none";
  questionsEl.style.display ="flex";
  endEl.style.display ="none";

  timeLeft = timeLimit;
  timeEl.innerHTML = timeLeft;
  timerId = setInterval(clock, 1000);
  newQuestion();
});

// Initials submit button
submit.addEventListener('click', (event) => {
  event.stopPropagation();

  // Force the user to input intiaials
  var text = new String(initials.value).toUpperCase().trim();
  text = text.replace(" ", "");
  
  if (text.length != 2 ){
    alert("Initials must be two characters.")
    return;    
  }
  userScore = userScore +22
  addScore(text, userScore);
  updateScores();
  
  // Change visibility of sections
  startEl.style.display ="flex";
  questionsEl.style.display ="none";
  endEl.style.display ="none";

});


//------------------------------------------------------------------
// Functions
//------------------------------------------------------------------
function newQuestion(){
  var title = document.querySelector('#question-title');
  var choices = document.querySelector('#choices');
  
  title.textContent = questions[0].title;
  console.log(choices);
  choices.removeChild(choices);
  
  
  
}

function gameOver(){
  startEl.style.display ="none";
  questionsEl.style.display ="none";
  endEl.style.display ="flex";

  clearInterval(timerId);
  updateScores();
  
}

// Add scrore to highscore list
function addScore(inti, newSc) {
  
  // Get previous high scores
  var savedScores = localStorage.getItem("dojoScores");
  var newScore = {
    name: inti,
    score: newSc
  }

  var decoded = JSON.parse(savedScores);
  if(decoded == null) {
    decoded = new Array();
  }

  decoded.push(newScore);

  decoded.sort( (a,b) => {
    if (a.score > b.score) {
      return -1;
    } else {
      return 1;
    }
  });

  // trim off extra high scores past 3
  decoded.slice(0,2);

  // Save scores to storage
  localStorage.setItem("dojoScores", JSON.stringify(decoded));
}

function updateScores() {
  
  // update previous high scores, only post the top three
  var decoded = JSON.parse(localStorage.getItem("dojoScores"));
  
  // Sort the array if it is not null
  if (decoded != null){
    decoded.sort( (a,b) => {
      if (a.score > b.score) {
        return -1;
      } else {
        return 1;
      }
    })
  } 

  // add items to score list
  var item;  
  for (var i =0; i < 3; i++ ){
    
    try {
      var item = decoded[i];  
    } catch (err) {
      var item = itemObj;
    }
    
    if (item.name != "") {
      highScores[i].textContent = item.name + " " + item.score + " - " + ninjaLevel(item.score);
    } else {
      highScores[i].textContent = "No score";
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

function clock() {
  
  // Update clock
  timeLeft--;
  timeEl.innerHTML = timeLeft;

  // Are we out of time
  if (timeLeft <= 0) {
    gameOver();
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



