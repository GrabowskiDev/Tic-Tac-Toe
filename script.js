const gameBoard = (() => {
    //Query Selectors
    const turnInfo = document.querySelector('.turnInfo');

    //Populating display with content of array
    const populate = (array) => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }
    };

        //Set turn info to indicate who's turn it is
    const setTurnInfo = player => {
        turnInfo.textContent = `It's ${player}'s turn`;
    }
    
    return {
        populate,
        setTurnInfo,
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
        turns = -1;
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
        alert("Player X won");
        alreadyWon = true;
    };

    const playerOWinner = () => {
        alert("Player O won");
        alreadyWon = true;
    };
    
    const tie = () => {
        alert("It's a Tie");
        reset();
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

    return {
        turn,
    }
};

const playerX = playerFactory("Jakub X");
const playerO = playerFactory("Bartek O");

game.startGame();