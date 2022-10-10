let buttonChoices = Array.from(document.querySelector(".choices").getElementsByTagName("button"));

let scoreBoard = document.querySelector(".score-board");

let promptPlr;

let playerScore;
let computerScore;
const movesCombinations = {
    rock: {
        rock: "tie",
        paper: "lose",
        scissors: "win",
    },
    paper: {
        rock: "win",
        paper: "tie",
        scissors: "lose",
    },
    scissors: {
        rock: "lose",
        paper: "win",
        scissors: "tie",
    },
};



const regEx = {
    scissors: /^Scissors$/i,
    rock: /^Rock$/i,
    paper: /^Paper$/i,
};

const resultMessage = {
    lose: "You lose!",
    win: "You win!",
    tie: "You tie!",
};


function getCompChoice() {
    let randomNum = Math.random();

    return (randomNum < .33) ? "Rock" :
        (randomNum < .66) ? "Paper" :
            (randomNum < .99) ? "Scissors" :
                "Rock";
}



function playRound(playerSelection, compSelection) {
    let player = insensitive(playerSelection);
    let computer = insensitive(compSelection);

    let result = movesCombinations[player][computer];

    return ([resultMessage[result] + ` Player threw ${player} and computer threw ${computer}.`, result]);
}


function insensitive(string) {
    if (typeof (string) === "string") {
        return string.toLowerCase();
    }
}

let doneGame;
function game() {
    doneGame = false;
    playerScore = 0;
    computerScore = 0;


    buttonChoices.forEach((btn) => {
        btn.addEventListener('click', btnChoice);
    });
}

function btnChoice(e) {
    let btn = this;
    if (playerScore >= 5) {
        alert("You beat the computer!");
        buttonChoices.forEach((btn) => {
            btn.removeEventListener('click', btnChoice);
        });
        doneGame = true;
        return;
    } else if (computerScore >= 5) {
        alert('You lost to the computer!');
        buttonChoices.forEach((btn) => {
            btn.removeEventListener('click', btnChoice);
        });
        doneGame = true;
        return;
    }

    if (!doneGame) {
        let result = playRound(btn.innerText.toLowerCase(), getCompChoice());
        scoreBoard.innerText = (result[0] + `\n${playerScore} for player and ${computerScore} for pc.`);


        if (result[1] === "lose") {
            computerScore++;
        } else if (result[1] === "win") {
            playerScore++;
        }
    }
}

game()