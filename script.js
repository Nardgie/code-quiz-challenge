window.onload = function() {
    var highscores = JSON.parse(sessionStorage.getItem('highscores')) || [];
    console.log('Highscores:', highscores);


    highscores.sort(function(a, b) { return b.score - a.score; });
    var list = document.getElementById('highscoresList');
    // var order = 1;
    highscores.forEach(function(highscore) {
        var li = document.createElement('li');
        
        li.textContent = highscore.initials + ': ' + highscore.score;
        li.style.padding = '5px';
        li.style.fontSize = '20px';
        list.appendChild(li);
        for (let i = 0; i < list.children.length; i++) {
            if (i % 2 === 0) {
                list.children[i].style.backgroundColor = "lightgrey";
            } else {
                list.children[i].style.backgroundColor = "aliceblue";
            }
        }
    });
    document.getElementById('clearHighscores').addEventListener('click', function() {
        sessionStorage.removeItem('highscores');
        location.reload();
    });
    
    document.getElementById('goBack').addEventListener('click', function() {
        location.href = 'index.html';
    });
};

var start = document.getElementById("start");
var question = document.querySelector("#question");
var choice = document.querySelectorAll(".choice");
// var quiz = document.getElementByID("question");

var timer = document.querySelector("#time");

var finalScore = document.querySelector("#final-score");

var submit = document.querySelector("#submit");

var feedback = document.querySelector("#feedback");

var feedbackDiv = document.querySelector(".feedback");

var initials = document.querySelector("#initials");

choice.forEach(function (choice) {
    choice.style.display = "none";

});

var line = document.querySelector("hr");
line.style.display = "none";

var timeLeft = 75; // 75 seconds
console.log(timeLeft);
var score = 0;


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
var currentQuestionIndex = 0;

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        return;
    }
    
    var currentQuestion = questions[currentQuestionIndex];

    question.textContent = currentQuestion.title;
    choice.forEach(function (choice, i) {
        choice.style.display = "block";
        choice.textContent = currentQuestion.choices[i];
        choice.addEventListener("click", function (event) {
        // if choice is correct
            event.preventDefault();
            event.stopPropagation();
            

            if (choice.textContent === currentQuestion.answer) {
                score += 10;
                document.querySelector("hr").style.display = "block";
                feedback.textContent = "Correct!";
                var timeOutFeedback = setTimeout(function () {
                    feedback.textContent = "";
                    line.style.display = "none";
                }, 1000);
                currentQuestionIndex++;
                displayQuestion();
            } else if (choice.textContent !== currentQuestion.answer) {
                score -= 2
                line.style.display = "block";
                feedback.textContent = "Incorrect. Please try again.";
                // timeLeft -= 10;
                choice.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    timeLeft -= 9;
                });

                var timeOutFeedback = setTimeout(function () {
                    feedback.textContent = "";
                    document.querySelector("hr").style.display = "none";
                }, 1000);
            }
        // display "Correct!"
        // else
        // display "Wrong!"
        // subtract 10 seconds from timer
        });
        
    });
        
}

if (timeLeft <= 0) {
    timeLeft = 0;
}

if (score < 0) {
    score = 0;
}



start.addEventListener("click", function () {
    startQuiz();
    displayQuestion();
});

function startQuiz() {
    document.querySelector(".header").style.display = "none";
    start.style.display = "none";
    
    var cuurentQuestion = questions[currentQuestionIndex];

    var countdown = setInterval(function () {
        timer.textContent = "Timer: " + timeLeft + " seconds left!";
        timeLeft--;

        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(countdown);
            timer.textContent = "Timer: 0 seconds left!";
            question.textContent = "";
            choice.forEach(function (choice, i) {
                choice.style.display = "none";
                choice.textContent = "";
            });
            //Please Remember to change to double quotes!!!!
            document.querySelector('.end').style.display = 'block';
            // document.querySelector('.final-score').textContent = "Your final score is: " + score + ".";
            finalScore.textContent = "Your final score is: " + score;
            finalScore.style.display = "block";
            document.querySelector('.start').style.display = 'none';
            document.querySelector('.feedback').style.display = 'none';
            document.querySelector("#highscoresForm").style.display = 'block';
            
        }
    }, 1000);

    
}

function endQuiz() {

    // All Done and Final Score
    // hide questions
    // show final score
}

// start.addEventListener("click", startQuiz);  
//Its so slooooow!!!!!!!!
document.getElementById('highscoresForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var initials = document.getElementById('initials').value;
    
    console.log('Initials:', initials);
    console.log('Score:', score);

    var highscores = JSON.parse(sessionStorage.getItem('highscores')) || [];
    highscores.push({ initials: initials, score: score });
    sessionStorage.setItem('highscores', JSON.stringify(highscores));
    location.href = 'highscores.html';
});