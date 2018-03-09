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
            {question:"to know", answer:"saber"},
            {question:"to be able to", answer:"poder"},
            {question:"to arrive", answer:"llegar"},
            {question:"to put", answer:"poner"},
            {question:"to continue", answer:"seguir"},
            {question:"to encounter", answer:"encontrar"},
            {question:"to come", answer:"venir"},
            {question:"to think", answer:"pensar"},
            {question:"to be familiar with", answer:"conocer"},
            {question:"to search", answer:"buscar"},
            {question:"to take", answer:"tomar"},
            {question:"to work", answer:"trabajar"},
            {question:"to lose", answer:"perder"},
            {question:"to write", answer:"escribir"},
            {question:"to produce", answer:"producir"},
            {question:"to finish", answer:"terminar"},
            {question:"to permit", answer:"permitir"},
            {question:"to serve", answer:"servir"},
            {question:"to take out", answer:"sacar"},
            {question:"to read", answer:"leer"},
            {question:"to change", answer:"cambiar"},
            {question:"to fall", answer:"caer"},
            {question:"to win", answer:"ganar"},
            {question:"to bring", answer:"traer"},
            {question:"to study", answer:"estudiar"},
            {question:"to run", answer:"correr"},
            {question:"to help", answer:"ayudar"},
            {question:"to listen", answer:"escuchar"},
            {question:"to discover", answer:"descubrir"}
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
