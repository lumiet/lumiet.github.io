var currQuestion = 0;
var score = 0;
var questionData = [
            {question:"to dance", answer:"bailar"},
            {question:"to speak", answer:"hablar"},
            {question:"to leave", answer:"salir"},
            {question:"to want",answer:"querer"},
            {question:"to have", answer:"tener"},
            {question:"to see", answer:"ver"},
            {question:"to make", answer:"hacer"},
            {question:"to ask", answer:"preguntar"},
            {question:"to open", answer:"cubrir"},
            {question:"to jump", answer:"saltar"},
            {question:"to fly", answer:"voler"},
            {question:"to like", answer:"gustar"},
            {question:"to play", answer:"jugar"},
            {question:"to save", answer:"ahorrar"},
            {question:"to start", answer:"empezar"},
            {question:"to die", answer:"morir"},
            {question:"to live", answer:"vivir"},
            {question:"to eat", answer:"comer"},
            {question:"to wish for", answer:"pedir"},
            {question:"to believe", answer:"creer"},
            {question:"to know", answer:"saber"}
]

window.addEventListener('keydown', function (e) {
            var key = e.keyCode;
if(key==13) getData();
        });


function getRand(x) {
return Math.floor(Math.random()*x);
}


function setQuestion() {
currQuestion = getRand(questionData.length);
document.getElementById('phrase').innerHTML = questionData[currQuestion].question;
}

function updateScore() {
 document.getElementById('score').innerHTML = "Score: " + score;
}

function getData() {
var userAnswer = document.getElementById('submission').value.toLowerCase();
  if(userAnswer==questionData[currQuestion].answer) {
    document.getElementById('checkans').innerHTML = "Correct";
    score++;
    updateScore();
    setQuestion();
document.getElementById('submission').value = "";
  }
  else {
   document.getElementById('checkans').innerHTML = "Incorrect, try again"; 
  }
}
