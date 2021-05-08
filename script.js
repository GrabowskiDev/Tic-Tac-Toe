const gameBoard = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let mark = " ";

    const mainBoard = document.querySelector('.gameBoard');
    const turnInfo = document.querySelector('.turnInfo');

    const populate = () => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }
    };

    const addMark = index => {
        array[index] = mark;
    }

    mainBoard.childNodes.forEach((div) => {
        div.addEventListener(('click'), () => {
            addMark(div.getAttribute('data-index'));
            populate()
        });
    });

    const setTurnInfo = player => {
        turnInfo.textContent = `It's ${player}'s turn`;
    }
    
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