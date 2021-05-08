const gameBoard = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    
    const populate = () => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }
    };

    const addMark = (index, mark) => {
        array[index] = mark;
    }

    return {
        populate,
        addMark,
        array
    };
})();

const displayController = (() => {
    const mainBoard = document.querySelector('.gameBoard');

    mainBoard.childNodes.forEach((div) => {
        div.addEventListener(('click'), () => {
            gameBoard.addMark(div.getAttribute('data-index'), "X");
        });
    });

    return {
        
    }
})();

const playerFactory = (name, mark) => {

    return {

    }
};

const playerX = playerFactory("Jakub", "X");
const playerO = playerFactory("Bartek", "O");