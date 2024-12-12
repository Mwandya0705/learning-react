const questions = [
    {
        question:"Which brand produced the most expensive car in the world?",
        answers:[
            {text:"Bugatti",correct:false},
            {text:"Bentley",correct:false},
            {text:"mercedes",correct:true},
            {text:"Aston Martin",correct:false},
        ]
    },
    {
        question:"Who is the most beautiful woman in the world?",
        answers:[
            {text:"Taylor Swift",correct:false},
            {text:"Jodie Comer",correct:true},
            {text:"Beyonce",correct:false},
            {text:"Bella Hadid",correct:false},
        ] 
    },
    {
        question:"the most developer tools in the world?",
        answers:[
            {text:"GitHub",correct:true},
            {text:"Nifty",correct:false},
            {text:"Jira",correct:false},
            {text:"Cloud 9",correct:false},
        ] 
    },
    {
        question:"what are the most visited tourist countries in the world?",
        answers:[
            {text:"United States",correct:false},
            {text:"italy",correct:false},
            {text:"Spain",correct:false},
            {text:"France",correct:true},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

 function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." +currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();