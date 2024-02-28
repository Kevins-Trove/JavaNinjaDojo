//------------------------------------------------------------------
// logic.js from https://github.com/Kevins-Trove
// By: Kevin Roper
//------------------------------------------------------------------

//------------------------------------------------------------------
// variables to keep track of quiz state
//------------------------------------------------------------------
var questionIndex = 0;
var timeLimit = 15;
var timeLeft;
var timerId;
var userScore = 0;
var curQuestion = -1;
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
var scoreEl = document.querySelector('#score');
var endMsgEl = document.querySelector('#endMessage');

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
  
  // Update score display
  userScore = 0;
  scoreEl.innerHTML = userScore;
  curQuestion = 0;

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
  //var title = document.querySelector('#question-title');
  var div = document.querySelector(".choiceList");
  var choices = document.querySelectorAll('.choices');
  var question;
  var item;
  var list;
  
  // if at end of question end game otherwise off new question
  ++curQuestion;

  if (curQuestion >= questions.length) {
    gameOver();
    return;
  } else {
   question = questions[curQuestion];
  }

  // Set question title and anwsers
  document.querySelector('#question-title').textContent = question.title;
  document.querySelector('#question-answer').textContent = question.answer;

  // remove choice list
  while (div.firstChild) {
    div.removeChild(div.lastChild);
  }

  // Create new choice list
  list = document.createElement("ul");

  for (var i = 0; i < question.choices.length; i++){
    item = document.createElement("LI");
    item.classList.add('choices');
    item.textContent =  question.choices[i];
    item.addEventListener("click", function() {
      if(this.textContent == question.answer){
        userScore = userScore + 5;
      } else {
        userScore = userScore - 10;
      }

      // Update score display
      scoreEl.innerHTML = userScore;
      newQuestion();  
    });
    
    list.appendChild(item);
  }
  
  // Add new list to document
  div.appendChild(list);
   
  
}

function gameOver(){
  startEl.style.display ="none";
  questionsEl.style.display ="none";
  endEl.style.display ="flex";

  // Give user score boost for time left
  if (userScore > 0) {
    userScore = userScore + (timeLeft * 5);
  } 
  
  // Update score display
  scoreEl.innerHTML = userScore;
  endMsgEl.textContent =  ninjaLevel(userScore);
  
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

// update score list, only post the top three
function updateScores() {
  
  // update previous high scores
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
      if (item != null) {
        highScores[i].textContent = item.name + " " + item.score + " - " + ninjaLevel(item.score);
      } else {
        highScores[i].textContent = "No score";
      }
  
    } catch (err) {
      highScores[i].textContent = "No score";
    }
  }

}

// returns ninga name levels by value
function ninjaLevel(value) {
  // update previous high scores, only post the top three
  switch(true) {
    case value  >= 30:
      return "MASTER NINJA"
      break;
    case value >= 20:
      return "Ninja coder"
      break;
    case value >= 10:
      return "Novice"
      break;
    case value >= 0 :
        return "No chance of being a ninja"
        break;
    default:
      return "Try needle point"
  }

}

// Update clock interface
function clock() {
  
  // Update clock
  timeLeft--;
  timeEl.innerHTML = timeLeft;

  // Are we out of time
  if (timeLeft <= 0) {
    gameOver();
  }
}
