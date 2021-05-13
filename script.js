const gameBoard = (() => {
    //Query Selectors
    const turnInfo = document.querySelector('.turnInfo');
    const winnerPrompt = document.querySelector('.roundEnd');
    const winnerText = document.querySelector('#winnerText');
    const mainBoardDivs = document.querySelectorAll('div[data-index]');

    let colorX = '#F00';
    let colorO = '#00F';

    //Populating display with content of array
    const populate = (array) => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }

        populateColors();
    };

    const populateColors = () => {
        mainBoardDivs.forEach(div => {
            console.log(div);
            if(div.textContent==="X") div.classList.add('markX');
            else if(div.textContent==="O") div.classList.add('markO');
            else {
                div.classList.remove('markX');
                div.classList.remove('markO');
            }
        })
    }

    //Set turn info to indicate who's turn it is
    const setTurnInfo = player => {
        turnInfo.textContent = `It's ${player}'s turn`;
    }

    const toggleWinnerPrompt = () => {
        winnerPrompt.classList.toggle('hidden');
    }

    const announceWinner = name => {
        winnerText.textContent = `The winner is ${name}!`;
        toggleWinnerPrompt();
    }

    const announceTie = () => {
        winnerText.textContent = "It's a Tie";
        toggleWinnerPrompt();
    }

    const popupClose = (div) => {
        div.classList.remove('popup-open');
        setTimeout(function(){div.classList.add('popup-close')}, 20);
    }

    return {
        populate,
        setTurnInfo,
        announceWinner,
        announceTie,
        toggleWinnerPrompt,
        popupClose
    };
})();

const game = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let turns = 0;
    let mark = "X";
    let alreadyWon = false;

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    //Query Selectors
    const mainBoard = document.querySelector('.gameBoard');
    
    const startGame = () => {
        //Player with X starts the game
        playerX.turn();
        mark = "X"
    };
    
    //Add mark to selected div
    const addMark = index => {
        if(alreadyWon) return;
        if(array[index]==" ") { 
            array[index] = mark;
            gameBoard.populate(array);
            checkForWinner()
            if(!alreadyWon) nextTurn();
        }
    }
    
    //Reset the game
    const reset = () => {
        array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        turns = 0;
        alreadyWon = false;
        gameBoard.toggleWinnerPrompt();
        gameBoard.populate(array);
        startGame();
    }
    
    const nextTurn = () => {
        ++turns;
        if(turns%2===1) {
            playerO.turn();
            mark = "O";
        } else {
            playerX.turn();
            mark = "X";
        }
    };

    const checkForWinner = () => {
        winConditions.forEach(condition => {
            const st = condition[0];
            const nd = condition[1];
            const rd = condition[2];
            if(array[st]===array[nd]&&array[st]===array[rd]) {
                if(array[st]==="X") playerXWinner();
                else if(array[st]==="O") playerOWinner();
            }
        });

        if(!array.includes(" ")&&!alreadyWon) tie();
    };

    const playerXWinner = () => {
        gameBoard.announceWinner(playerX.getName());
        alreadyWon = true;
    };

    const playerOWinner = () => {
        gameBoard.announceWinner(playerO.getName());
        alreadyWon = true;
    };
    
    const tie = () => {
        gameBoard.announceTie();
    }

    //Listens to clicks on mainBoard divs
    mainBoard.childNodes.forEach((div) => {
        div.addEventListener(('click'), () => {
            //Calls addMark func with clicked div index
            addMark(div.getAttribute('data-index'));
            
        });
    });

    return {
        startGame,
        reset,
    }

})();

const playerFactory = (name) => {
    const turn = () => {
        gameBoard.setTurnInfo(name);
    }

    const getName = () => {
        return name;
    }

    return {
        turn,
        getName
    }
};

let playerX;
let playerO;

function start() {
    let playerXName = document.querySelector('#playerX').value;
    let playerOName = document.querySelector('#playerO').value;
    let playerNames = document.querySelector('.playerNames');
    gameBoard.popupClose(playerNames);

    playerX = playerFactory(playerXName);
    playerO = playerFactory(playerOName);

    setTimeout(function(){playerNames.classList.add('hidden');}, 1020);
    game.startGame();
}
