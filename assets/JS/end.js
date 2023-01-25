const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')

const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore');


// High scores saving 
   // localStorage.setItem("highScores", JSON.stringify([])); 
   // console.log(localStorage.getItem('highScores')); //console test:  

const highScores = JSON.parse( localStorage.getItem("highScores")) || []; // get high scores or if null - "get empty array"
const MAX_HIGH_SCORES = 5;
// test point: saving high scores:  console.log(highScores); 

console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore // final score display


// username 
username.addEventListener('keyup',() => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value
     
});



saveHighScore = e => {
   // test point:  console.log("clicked the save button") 
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }; 

    // testpoint: console.log(score); 

    highScores.push(score);
    //testpoint: console.log(highScores) 
    highScores.sort( (a,b) => b.score - a.score ) // return highest to lowest if b is higher put b before a (simplified: no return or brackets)
    highScores.splice(5);                        // cutting of to the first 5

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('./index.html');  

    console.table(highScores);

};

