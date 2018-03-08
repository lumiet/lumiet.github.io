var questionNumb = 3;
var questionData = [{question : "To dance", answer: "bailar"}, {question: "To sing", answer: "cantar"}, {question: "To speak", answer: "hablar"}]

function getRand(int x) {
return Math.ceil(Math.random()*x);
}


function setQuestion() {
var question = getRand(questionNumb);
document.getElementById('phrase').content = questionNumb.question;
}

function getData() {
var userAnswer = document.getElementById('submission').value;
}
