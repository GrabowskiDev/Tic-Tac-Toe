const gameBoard = (() => {
    let array = ["X", "O", "X", "X", "X", "O", " ", " ", "X"];
    let mark = " ";
    const mainBoard = document.querySelector('.gameBoard');

    
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
        });
    });

    return {
        populate,
        mark
    };
})();

const game = (() => {

    return {

    }
})();

const playerFactory = (name, mark) => {

    return {

    }
};

const playerX = playerFactory("Jakub", "X");
const playerO = playerFactory("Bartek", "O");