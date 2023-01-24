const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// test point - high scores list: console.log(highScores); 


// ---- - high scores 
highScoresList.innerHTML = 
    highScores
        .map(score =>{             
            return  score.name + " - " + score.score +"  " ;                 
            
        })
        

        





   
