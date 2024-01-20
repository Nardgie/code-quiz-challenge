var start = document.getElementById("start");
var question = document.querySelector("#question");
var choice = document.querySelectorAll(".choice");

var timer = document.querySelector("#time");

var finalScore = document.querySelector("#final-score");

var submit = document.querySelector("#submit");



var timeLeft = 75; // 75 seconds
// JavaScript quiz questions
var questions = [
    {
        title: "A contition in an if/else statement is enclosed within _______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What are NOT commonly used data types in JavaScript?",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "How do you create a function in JavaScript? (ES5)",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "function => myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "What is var used for?",
        choices: ["declaring a variable", "declaring a function", "declaring a string", "declaring a number"],
        answer: "declaring a variable"
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    }
]

// A function to display questions and choices

function displayQuestion() {

    for (let i = 0; i< questions.length; i++) {
        var currentQuestion = questions[i];
        question.textContent = currentQuestion.title;
        choice.forEach(function (choice, i) {
            choice.textContent = currentQuestion.choices[i];
        });
    }

    // question.textContent = currentQuestion.title;

    // choice.forEach(function (choice, i) {
    //     choice.textContent = currentQuestion.choices[i];
    // });

}

start.addEventListener("click", displayQuestion);

function startQuiz() {
    var countdown = setInterval(function () {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(countdown);
            // All Done and Final Score
            // hide questions
            // show final score
            
        }
    }, 1000);
}
