const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// test point - high scores list: console.log(highScores);

/* ? replaced ?
highScores.map(score => {
    // console.log('<li> ${score.name}-${score.score} </li>');
    console.log('li'); // ? how to display li in JS as list 
    
}); */



// ---- - high scores to be fixed ... 
highScoresList.innerHTML = 
    highScores
        .map(score =>{      

          
            return  score.name + " - " + score.score +"  " ;

           
            
            // '<li class="high-score">${score.name}-${score.score}</li> ';
        })
        // .join("");

    





   
