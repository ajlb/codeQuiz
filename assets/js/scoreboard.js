function showScoreboard () {
    // get highscores from localStorage or if blank set to empty array
    let highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort the scores
    highScores.sort(function(a,b) {
        return b.score - a.score;
    })

    // display the scores
    highScores.forEach(function(score) {
        let listEl = document.createElement("li");
        listEl.textContent = score.initials + "::" + score.score;

        let olEl = document.querySelector('#scoreboard');
        olEl.appendChild(listEl);
    })
}

function clearScoreboard () {
    // clear highscores out of localStorage and reload page
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

// if clear button is clicked clear the page
let clearButton = document.querySelector('#clear');
clearButton.onclick = clearScoreboard;

showScoreboard();