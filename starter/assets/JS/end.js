const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')

const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore');


// High scores saving 
  localStorage.setItem("highScores",JSON.stringify([])); //console test:
const highScores = JSON.parse( localStorage.getItem("highScores")) || []; // get high scores or if null - "get empty array"
console.log(highScores); // test point: saving high scores
console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore // final score display


// username 
username.addEventListener('keyup',() => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value
     
});



saveHighScore = e => {
    console.log("clicked the save button") // test point 
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }; 
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score ) // return highest to lowest if b is higher put b before a (simplified: no return or brackets)
    highScores.splice(5); // cutting of to the first 5

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');

    console.table(highScores);

};

