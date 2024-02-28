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
  //var title = document.querySelector('#question-title');
  var list = document.querySelector("#choiceList");
  var choices = document.querySelectorAll('.choices');
  var question = questions[curQuestion++]; // increment question index  while getting reference
  
  // Set question title and anwsers
  document.querySelector('#question-title').textContent = questions[0].title;
  document.querySelector('#question-answer').textContent = questions[0].answer;

  list.parentNode.removeChild(list);
  
  for (var i = 0; i < choices.length; i++){
  
  }
  
  
  
  
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
