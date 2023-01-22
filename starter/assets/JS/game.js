console.log("start game"); // test point: game start
// ----------------   variables 

     // -------------------------
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text')); 
                                                                            /* note: check properties in console (on answer element)- if selector is assigned: 
                                                                            dataset: DOMStringMap
                                                                            number:"1" 
                                                                            */ 

// test point - single answer  // console.log(choices) 
    //---------------------- hud dsiplay -------------- 
const progressText = document.getElementById('progressText'); // progress bar
const progressBarFull = document.getElementById('progressBarFull'); // progress bar fill - as progress with questions

const scoreHud = document.getElementById('score');
    // -------------------------- 
    let currentQuestion ={};
    let acceptingAnswer = true;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];

// ------------- question set ----------------- //
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

// const start time - questions * time per question
// const INCORRECT_TIME



startGame = () => {
    questionCounter = 0;
    score = 0;
    //timer

    // --------------------  generate questions ---------------------- 
    availableQuestions = [...questions]; // pobiera wszystkie pytania z array (let questions [...]; i tworzy nowy array z wybranymi )
    // test point: console.log(availableQuestions);   //  wyswietla pytania after startGame(); function is triggered

    getNewQuestion(); //   getNewQuestion - function start point
};


                                                                                // note: arrow syntax: function name = (multiple parameters) => {function body}  //single parameter can be added without ()

// ----------------------  function - get new question ------------------------
getNewQuestion = () => {

        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS /* || timer = 0 */ ){
            localStorage.setItem('mostRecentScore', score);
            //jesli nie ma dostepnych putan lub question counter jest mniejszy lub rowny max question przeznaczonych dla 1 sesji
            return window.location.assign('/end.html'); // return to end/high score page
        }

    questionCounter++;
    // ----- hud counters  - questions -----
  

    //progres barr - question counter
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    // update progress barr fill 
     console.log((questionCounter/MAX_QUESTIONS)*100) 
    progressBarFull.style.width = ((questionCounter/MAX_QUESTIONS)*100 )+ "%"; // note: "%" przekazuje wart procentowa wyrazenia do css


    const questionIndex = Math.floor(Math.random() * availableQuestions.length );   // note: nowa stala: questionIndex = sprawdza dlugisc elementu i wybiera randomowe pytanie; 
    // test point: console.log(questionIndex) 
    currentQuestion = availableQuestions[questionIndex];  // reference to current question przypisany z zestawu available questions uzywajac questionIndex (?)
     question.innerText = currentQuestion.question;       // dodaje (wartosc?) HTML text z bierzacego pytania uzywajac jego question property (KEY?)

// dla kazdego choices ta sama akcja - pobiez pytanie(?)  
     choices.forEach (choice =>{
        // get number from dataset property "data-number"= ... from single answer HTML: div/p/class dla Choice ...</p>
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]; // pobiera text dla pytania 
     } );

     //remove used question from "new question array" dla current game
     availableQuestions.splice(questionIndex,1);

     acceptingAnswer = true 

// -----------------------------------  user input - answers  ----------------------------------------------------- 

choices.forEach(choice => {
choice.addEventListener('click', e => {
  // console.log(e.target); // test point: registering click for each choice

  // ---------- comparing answers  ----------
    if (!acceptingAnswer) return; // note: breakpoint - if not accepting more ansvers
    
    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    console.log(selectedAnswer, currentQuestion.answer); // test point - comparing answers
    console.log(selectedAnswer == currentQuestion.answer); //test point: if selected answer = current question answer === comparing strict )including data == to be used
    

    // behaviour on right and wrong


    const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // same as if/else - assigning answer category
        //test point: console.log(classToApply); 

    // --- hud count - scores -----
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        } 

    // ----- hud count - timer ------------ to be created 
    
    //adding class correct/incorrect to answer cattegory
        selectedChoice.parentElement.classList.add(classToApply);
    
    //-------------------- timeout for answer display (delay before next question) -------------------------------
    setTimeout (() => {
        //removing class correct/incorrect to answer cattegory
        selectedChoice.parentElement.classList.remove(classToApply);

        getNewQuestion(); //loading new question after answer 

    }, 1000);   //note: 1000 milisecond's = 1 second

})
});

};  // ? bug ?  - to be tested and remowed 

// ------------------ get new question end --------------------------------

// adding points to hud/score display 
incrementScore = num => {
    score += num;
    scoreHud.innerText = score;
}

// rozpoczyna gre 
startGame();
    