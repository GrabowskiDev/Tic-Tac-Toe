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
    let rounds = 0;
    let mark = "X";

    //Query Selectors
    const mainBoard = document.querySelector('.gameBoard');
    
    const startGame = () => {
        //Player with X starts the game
        playerX.turn();
    };
    
    //Add mark to selected div
    const addMark = index => {
        if(array[index]==" ") { 
            array[index] = mark;
            gameBoard.populate(array);
            nextRound();
        }
    }
    
    //Clears the array
    const reset = () => {
        array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }
    
    const nextRound = () => {
        ++rounds;
        if(rounds%2===1) {
            playerO.turn();
            mark = "O";
        } else {
            playerX.turn();
            mark = "X";
        }
    };

    //Listens to clicks on mainBoard divs
    mainBoard.childNodes.forEach((div) => {
        div.addEventListener(('click'), () => {
            //Calls addMark func with clicked div index
            addMark(div.getAttribute('data-index'));
            
        });
    });

    return {
        startGame,
    }
})();

const playerFactory = (name, mark) => {
    const turn = () => {
        gameBoard.setTurnInfo(name);
    }

    return {
        turn,
    }
};

const playerX = playerFactory("Jakub", "X");
const playerO = playerFactory("Bartek", "O");

game.startGame();