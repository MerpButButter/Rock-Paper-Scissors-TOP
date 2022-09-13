let promptPlr
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
}


const regEx = {
    scissors: /^Scissors$/i,
    rock: /^Rock$/i,
    paper: /^Paper$/i,
}

const resultMessage = {
    lose: "You lose!",
    win: "You win!",
    tie: "You tie!",
}


function getCompChoice() {
    let randomNum = Math.random()

    return (randomNum < .33) ? "Rock" :
        (randomNum < .66) ? "Paper" :
            (randomNum < .99) ? "Scissors" :
                "Rock"
}



function playRound(playerSelection, compSelection) {
    let player = insensitive(playerSelection);
    let computer = insensitive(compSelection);

    let result = movesCombinations[player][computer];

    return ([resultMessage[result] + ` Player threw ${player} and computer threw ${computer}.`, result])
}


function insensitive(string) {
    if (typeof (string) === "string") {
        return string.toLowerCase()
    }
}

function game() {
    let playerScore = 0
    let computerScore = 0

    while (true) {
        if (playerScore >= 5) {
            alert("You beat the computer!")
            break
        } else if (computerScore >= 5) {
            alert("You lost to the computer!")
            break
        }

        let playerChoice = promptPlayer()


        let roundData = playRound(playerChoice, getCompChoice())
        let result = roundData[1]

        if (result === "lose") {
            computerScore++
        } else if (result === "win") {
            playerScore++
        }

        console.log(roundData[0], `${playerScore} for player and ${computerScore} for pc.`)
    }

}


const askString = "Rock, Paper or Scissors;"
function promptPlayer() {

    promptPlr = prompt(askString)

    if (
        regEx["rock"].test(promptPlr) ||
        regEx["paper"].test(promptPlr) ||
        regEx["scissors"].test(promptPlr)
    ) {
        return promptPlr
    } else {
        promptPlayer()
        return promptPlr
    }
}