const gameBoard = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let mark = " ";

    //Query Selectors
    const mainBoard = document.querySelector('.gameBoard');
    const turnInfo = document.querySelector('.turnInfo');

    //Populating display with content of array
    const populate = () => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }
    };

    //Add mark to selected div
    const addMark = index => {
        if(array[index]==" ") array[index] = mark;
    }

    //Listens to clicks on mainBoard divs
    mainBoard.childNodes.forEach((div) => {
        div.addEventListener(('click'), () => {
            //Calls addMark func with clicked div index
            addMark(div.getAttribute('data-index'));
            populate();
        });
    });

    //Set turn info to indicate who's turn it is
    const setTurnInfo = player => {
        turnInfo.textContent = `It's ${player}'s turn`;
    }
    
    //Clears the array
    const reset = () => {
        array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    return {
        setTurnInfo,
        reset,
        mark
    };
})();

const game = (() => {
    const startGame = () => {
        //Player with X starts the game
        playerX.turn();
    };

    return {

    }
})();

const playerFactory = (name, mark) => {
    let name = name;
    let mark = mark;

    const turn = () => {
        gameBoard.setTurnInfo(name);
    }
    return {

    }
};

const playerX = playerFactory("Jakub", "X");
const playerO = playerFactory("Bartek", "O");