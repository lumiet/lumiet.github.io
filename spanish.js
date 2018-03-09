var currQuestion = 0;
var score = 0;
var questionData = [{question:"to dance", answer:"bailar"},{question:"to speak", answer:"hablar"},{question:"to leave", answer:"salir"},{question:"to want",answer:"querer"},{question:"to have", answer:"tener"},{question:"to see", answer:"ver"},{question:"to make", answer:"hacer"},{question:"to ask", answer:"preguntar"}]

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
