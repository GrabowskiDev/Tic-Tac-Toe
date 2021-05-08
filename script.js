const gameBoard = (() => {
    let array = ["X", "O", "X", "X", "X", "O", " ", " ", "X"];
    
    const populate = () => {
        for(i=0; i<9; i++) {
            document.querySelector(`div[data-index="${i}"]`).textContent = array[i];
        }
    };

    return {
        populate
    };
})();

const displayController = (() => {

    return {
        
    }
})();

const playerFactory = name => {

    return {

    }
};