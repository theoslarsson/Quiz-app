const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const feedback = document.getElementById("feedback");
const score = document.getElementById("score");
const nextQuestion = document.getElementById("next");
const restart = document.getElementById("restart");


// Constructor for question re-use
class QuizQuestion {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
}

const question1 = new QuizQuestion(
    "What is the capital of Norway?",
    ["Oslo", "Bergen", "Trondheim", "Stavanger"],
    "Oslo"
)

const question2 = new QuizQuestion (
    "In which year did the Berlin Wall fall?",
    ["1989", "1991", "1990", "1987"],
    "1989"
)
const question3 = new QuizQuestion (
    "Which desert is the largest hot desert in the world?",
    ["Gobi Desert", "Sahara Desert", "Arabian Desert", "Kalahari Desert"],
    "Sahara Desert"
)
const question4 = new QuizQuestion (
    "What is the chemical symbol for the element gold on the periodic table?",
    ["Ag", "Au", "Gd", "Go"],
    "Au"
)

nextQuestion.hidden = true;

const questions = [
    
    question1,
    question2,
    question3,
    question4,
]

let currentQuestion = 0

// Update the level

function updateQuestions() {
    
    question.innerText = questions[currentQuestion].question

    options.forEach((option, index)=> {
        option.innerText = questions[currentQuestion].options[index]
    })
   

    feedback.innerText = "";

    showButtons()

    question.hidden = false;
}

updateQuestions()

// When next button is pressed, currentLevel++ and  updates level

nextQuestion.addEventListener("click", () => {
    
    if(currentQuestion < questions.length - 1) {
        
        currentQuestion++
        updateQuestions()
        console.log(currentQuestion)
        nextQuestion.hidden = true;
        
    } 
    if(currentQuestion === questions.length -1) {
        
        nextQuestion.hidden = true;
    }
    
})


// Right / wrong system for each button
    
    options.forEach(option => {

        option.addEventListener("click", () => {
        
            if(option.innerText === questions[currentQuestion].correctAnswer) {
                
                nextQuestion.hidden = false
                question.hidden = true;
                feedback.innerText = "Correct!"
                scoreUpdate()
                
                hideButtons() 

                    if(currentQuestion === questions.length -1) {
                        nextQuestion.hidden = true;
                        feedback.innerText = "You won!"

                        score.classList.add("final-score")

                        score.innerText = "Final Score: " + point

                        restart.hidden = false;
                    }
            } else {
            
                feedback.innerText = "Wrong answer"

                hideButtons()

                question.hidden = true;

                nextQuestion.hidden = true;

                score.classList.add("final-score")

                score.innerText = "Final Score: " + point

                restart.hidden = false;

                
        }
    })
   
})

// update score

let point = 0

function scoreUpdate() {
    point++
    score.innerText = "Score: " + point
}
// hide each button

function hideButtons() {
    options.forEach(option => {
        option.hidden = true;
    })
}

// show each button

function showButtons() {
    options.forEach(option => {
        option.hidden = false;
    })
}

// Restart button for loss and win

restart.addEventListener("click", () => {
    currentQuestion = 0
    updateQuestions()
    point = 0
    score.classList.remove("final-score");
    score.innerText = "Score: " + point
    restart.hidden = true;
    nextQuestion.hidden = true;

})