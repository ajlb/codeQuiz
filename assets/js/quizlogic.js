//DOM elements we need to interact with
const timerEl = document.querySelector('#countdown');
const startButton = document.querySelector('#start');
const questionsEl = document.querySelector('#questions');
const answerChoices = document.querySelector('#answer-choices');
const finalScore = document.querySelector('#final-score');
const playerInitials = document.querySelector('#initials');
const submitButton = document.querySelector('#submit');
const feedbackEl = document.querySelector("#feedback");

// set initial values
var currentQuestionIndex = 0;
var finalCountdown = questions.length * 10;
var timer;

// start the quiz
function startQuiz() {
    // hide the instructions section
    let instructionsEl = document.querySelector('#instructions')
    instructionsEl.setAttribute("class", "hide");

    // show the questions section
    questionsEl.removeAttribute("class", "hide");

    // start the countdown
    // timer = setInterval(clockTick, 1000);
    timer = setInterval(() => {
        // update time
        finalCountdown--;
        timerEl.textContent = finalCountdown;

        // check if user ran out of time
        if (finalCountdown <= 0) {
            quizEnd();
        }
    }, 1000);

    // display the countdown
    timerEl.textContent = finalCountdown;

    // get a question
    getQuestion();
}

// get questions
function getQuestion() {
    // get the first question in the questions array
    let currentQuestion = questions[currentQuestionIndex];

    // update the card title to the question title
    let questionTitleEl = document.querySelector('#questions-title');
    questionTitleEl.textContent = currentQuestion.title;

    // clear any previous answers
    answerChoices.innerHTML = "";

    // list out the answer choices
    currentQuestion.options.forEach(function(option, i) {
        // create new button for each option
        let optionButton = document.createElement("button");
        optionButton.setAttribute("type", "button");
        optionButton.setAttribute("class", "btn-primary btn-lg btn-block");
        optionButton.setAttribute("value", option);
        // add some formatting
        optionButton.textContent = option;

        // attach event listener to each button
        optionButton.onclick = answerClick;
        // display the button
        answerChoices.appendChild(optionButton);
    });
}

// check answers
function answerClick() {
    // check if answer is wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // deduct time and display updated value
        finalCountdown -= 10;
        if (finalCountdown < 0) {
            finalCountdown = 0;
        }
        timerEl.textContent = finalCountdown;

        // notify user is incorrect
        feedbackEl.textContent = "Incorrect Answer!";
    } else {
        feedbackEl.textContent = "Correct!";
    }
    // show right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");

    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we are at the end of the question array
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// end of the quiz
function quizEnd() {
    // stop timer
    clearInterval(timer);

    // display the end quiz section
    let finishQuiz = document.querySelector('#quiz-done');
    finishQuiz.removeAttribute("class", "hide");

    // display final score
    let totalScore = document.querySelector('#final-score');
    totalScore.textContent = finalCountdown;

    // hide the questions card
    questionsEl.setAttribute("class", "hide");

}

// save high score
function highscore() {
    // get the input
    let initials = playerInitials.value.trim();

    // only store populated initials. if blank do nothing
    if (initials !== "") {
        // write the initials and score to local storage
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        // record newHighscore for player
        let newHighscore = {
            score: finalCountdown,
            initials: initials
        };
        // add value to local storage
        highscores.push(newHighscore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        // send player to highscore page
        window.location.href = "highscores.html"
    }
}

function checkForEnterKey(event) {
    if (event.key === "Enter") {
        highscore();
    };

}

// event listeners on buttons do things
startButton.onclick = startQuiz;
// check initials submit for mouse and keyboard event
submitButton.onclick = highscore;
playerInitials.onkeypress = checkForEnterKey;