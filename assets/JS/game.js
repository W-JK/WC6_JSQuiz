 // test point - game start: console.log("start game");

// ----------------   variables 

     // -------------------------
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text')); 
                                                                            /* note: check properties in console (on answer element)- if selector is assigned: 
                                                                            dataset: DOMStringMap
                                                                            number:"1" 
                                                                            */ 

// test point - single answer:  // console.log(choices) 

//---------------------- hud dsiplay -------------- 
const progressText = document.getElementById('progressText'); // progress bar
const progressBarFull = document.getElementById('progressBarFull'); // progress bar fill - as progress with questions

const scoreHud = document.getElementById('score');
const countDownHud = document.getElementById('countDown');

    // -------------------------- 
    let currentQuestion ={};
    let acceptingAnswer = true;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];
    let startingMinutes = 0 

// ------------- question set ----------------- 
let questions = [
    {
        question: "question 1 text - text ",
        choice1: "q1 Choice1",
        choice2: "q1 Choice2",
        choice3: "q1 Choice3",
        choice4: "q1 Choice4",
        answer: 1     

    },

    {
        question: "question 2 text - text ",
        choice1: "q2 Choice1",
        choice2: "q2 Choice2",
        choice3: "q2 Choice3",
        choice4: "q2 Choice4",
        answer: 2    

    },

    {
        question: "question 3 text - text ",
        choice1: "q3 Choice1",
        choice2: "q3 Choice2",
        choice3: "q3 Choice3",
        choice4: "q3Choice4",
        answer: 3   

    },

    {
        question: "question 4 text - text ",
        choice1: "q4 Choice1",
        choice2: "q4 Choice2",
        choice3: "q4 Choice3",
        choice4: "q4 Choice4",
        answer: 4     

    }
]; 

// Constants 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
const TIME_PENALTY = -10;


startGame = () => {
    questionCounter = 0;
    score = 0;
    startingMinutes = 5; 
    time = startingMinutes * 60; // adding seconds to the timer 
    


    //timer to set - start value

    setInterval(updateCountDown, 1000);
    function updateCountDown() {
        
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
        if (seconds < 0 ) {
            clearInterval(updateCountDown)
        }
        
        else { 
            countDownHud.innerHTML = minutes + " : " + seconds ;
            time--;  
        };
        // test point: console.log(time) 
        
    }

    // --------------------  generate questions ---------------------- 
    availableQuestions = [...questions]; // get all questions and chose question set
    // test point: console.log(availableQuestions);   //  display questions after startGame(); function is triggered

    getNewQuestion(); //   getNewQuestion - function start point
};
                                                                  

// ----------------------  function - get new question ------------------------

getNewQuestion = () => {

        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){ 
            localStorage.setItem('mostRecentScore', score);
            //if there is no awailable questions or question counter is smaller or equal max questions for current sesion
            return window.location.assign("/end.html"); // return to end/high score page
        } 
        
    questionCounter++;

    // ----- hud counters  - questions -----
        

    //progres barr - question counter
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    // update progress barr fill 
     console.log((questionCounter/MAX_QUESTIONS)*100) 
    progressBarFull.style.width = ((questionCounter/MAX_QUESTIONS)*100 )+ "%"; 


    const questionIndex = Math.floor(Math.random() * availableQuestions.length );   // note: new constant - questionIndex = is checking lenght of element and choising random question; 
    // test point: console.log(questionIndex) 
    currentQuestion = availableQuestions[questionIndex];  
     question.innerText = currentQuestion.question;       

// get question ------------------------------------
     choices.forEach (choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]; // get question text
     } );

     //remove used question from "new question array" for current game
     availableQuestions.splice(questionIndex,1);

     acceptingAnswer = true 

// -----------------------------------  user input - answers  ----------------------------------------------------- 

choices.forEach(choice => {
choice.addEventListener('click', e => {
  // console.log(e.target); // test point: registering click for each choice

  // ---------- comparing answers  ----------
    if (!acceptingAnswer) return; // note: breakpoint - return if not accepting more ansvers 
    
    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // test point - comparing answers: console.log(selectedAnswer, currentQuestion.answer); 
    //test point: console.log(selectedAnswer == currentQuestion.answer);      // if selected answer = current question answer === comparing strict )including data == to be used
    

    // ---------- behaviour on right and wrong - answer class asingment ---------------------------------------------


    const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // same as if/else - assigning answer category
        //test point: console.log(classToApply); 

    // --- hud count - scores --------------------------------------------------------------

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            var snd = new Audio('/assets/sfx/correct.wav');  //play sound on event
            snd.play();
        } 

        if (classToApply === 'incorrect') {
            var snd = new Audio('/assets/sfx/incorrect.wav');  //relative path starter\assets\sfx\incorrect.wav
            snd.play(); 
            time = time + TIME_PENALTY    // time penalty       
        }
   

    
    //adding class correct/incorrect to answer cattegory
        selectedChoice.parentElement.classList.add(classToApply);
    
    //-------------------- timeout for answer display (delay before next question) -------------------------------
    setTimeout (() => {
        //removing class correct/incorrect to answer cattegory
        selectedChoice.parentElement.classList.remove(classToApply);

        getNewQuestion(); //loading new question after answer 

    }, 1000);   

})
});

};  

// ------------------ get new question end --------------------------------

// adding points to hud/score display 
incrementScore = num => {
    score += num;
    scoreHud.innerText = score;
}

// --------- game start point ---------------------------------------------
startGame();
    