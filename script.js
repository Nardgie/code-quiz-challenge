var start = document.getElementById("start");
var question = document.querySelector("#question");
var choice = document.querySelectorAll(".choice");

var timer = document.querySelector("#time");

var finalScore = document.querySelector("#final-score");

var submit = document.querySelector("#submit");

var feedback = document.querySelector("#feedback");

var feedbackDiv = document.querySelector(".feedback");



var timeLeft = 75; // 75 seconds
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
// Put this loop in event listener? 
    var currentQuestion = questions[currentQuestionIndex];
    question.textContent = currentQuestion.title;
    choice.forEach(function (choice, i) {
        choice.textContent = currentQuestion.choices[i];
        choice.addEventListener("click", function () {
        // if choice is correct
            if (choice.textContent === currentQuestion.answer) {
            //create hr element
                score += 10;
                feedback.textContent = "Correct!";
                currentQuestionIndex++;
                displayQuestion();

            //prepend hr element to feedback
            } else {
                score -= 2
                feedback.textContent = "Incorrect. Please try again.";
                timeLeft -= 10;
            }
        // display "Correct!"
        // else
        // display "Wrong!"
        // subtract 10 seconds from timer
        });
    });
        
}

    // choice.addEventListener("click", function () {
    //     // if choice is correct
    //     if (choice.textContent === currentQuestion.answer) {
    //         //create hr element
    //         document.createElement("hr");
    //         feedbackDiv.prepend(hr);
    //         feedback.textContent = "Correct!";

    //         //prepend hr element to feedback
    //     } else {
    //         feedback.textContent = "Incorrect. Please try again.";
    //         // timeLeft -= 10;
    //     }
    //     // display "Correct!"
    //     // else
    //     // display "Wrong!"
    //     // subtract 10 seconds from timer
    // });

    // question.textContent = currentQuestion.title;

    // choice.forEach(function (choice, i) {
    //     choice.textContent = currentQuestion.choices[i];
    // });



start.addEventListener("click", function () {
    startQuiz();
    displayQuestion();
});

function startQuiz() {
    document.querySelector(".header").style.display = "none";
    start.style.display = "none";

    var countdown = setInterval(function () {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft + " seconds left!";

        if (timeLeft === 0 || (currentQuestionIndex === questions.length)) {
            clearInterval(countdown);

            var highscores = JSON.parse(sessionStorage.getItem('highscores')) || [];
            highscores.push({ initials: prompt('Enter your initials'), score: score });
            sessionStorage.setItem('highscores', JSON.stringify(highscores));

            //Please Remember to change to double quotes!!!!
            document.querySelector('.end').style.display = 'block';
            document.querySelector('.final-score').textContent = "Your final score is: " + score + ".";
            document.querySelector('.start').style.display = 'none';
            document.querySelector('.quiz').style.display = 'none';
            document.querySelector('.choices').style.display = 'none';
            document.querySelector('.feedback').style.display = 'none';
            // All Done and Final Score
            // hide questions
            // show final score
            
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
