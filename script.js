let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let pvpBtn = document.querySelector("#pvp-btn");
let pvcBtn = document.querySelector("#pvc-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");
const startGameBtn = document.querySelector("#start-game-btn");
const startPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
    
let turnO = true;
let vsComputer = false; // Determine if the game is PvP or PvC

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
document.addEventListener("DOMContentLoaded", () => {
    
    startGameBtn.addEventListener("click", () => {
        startPage.style.display ="none";
        gamePage.classList.remove("hide");
    });
  
});

// Reset game function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    resetBoxStyles(); 
    msgContainer.classList.add("hide");
    removeShakeEffect(); 
};

// Reset box styles function
const resetBoxStyles = () => {
    boxes.forEach((box) => {
        box.classList.remove("player-o", "player-x", "shake");
    });
    main.classList.remove("main");
};

// Remove shake effect function
const removeShakeEffect = () => {
    boxes.forEach((box) => {
        box.classList.remove("shake");
    });
};

// Handle box clicks for both PvP and PvC modes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!box.disabled) {
            if (turnO) {
                box.textContent = "O";
                box.classList.add("player-o");
                turnO = false;
            } else {
                box.textContent = "X";
                box.classList.add("player-x");
                turnO = true;
            }
            box.disabled = true;
            checkWinnerOrDraw();

            if (vsComputer && !turnO) {
                setTimeout(computerTurn, 500); // Give a slight delay before the computer plays
            }
        }
    });
});

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Show winner
const showWinner = (winner, winningBoxes) => {
    disableBoxes(); 
    addShakeEffect(winningBoxes);

    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner} 💥🎉`;
        msgContainer.classList.remove("hide");
        main.classList.add("main");
        removeShakeEffect();
    }, 2000); 
};

// Add shake effect to winning boxes
const addShakeEffect = (winningBoxes) => {
    winningBoxes.forEach(index => {
        boxes[index].classList.add("shake");
    });
};

// Check if there's a winner or a draw
const checkWinnerOrDraw = () => {
    let isWinner = false;
    
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val, pattern);
                isWinner = true;
                return; 
            }
        }
    }

    if (!isWinner && isDraw()) {
        setTimeout(() => {
            resetGame(); 
        }, 1000); 
    }
};

// Check if the game is a draw
const isDraw = () => {
    return [...boxes].every(box => box.innerText !== ""); 
};

// Computer's turn (simple AI that chooses a random empty box)
const computerTurn = () => {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");
    
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.textContent = "X";
        randomBox.classList.add("player-x");
        randomBox.disabled = true;
        turnO = true;
        checkWinnerOrDraw(); 
    }
};

// Event listeners for buttons
pvpBtn.addEventListener("click", () => {
    vsComputer = false; // Play with people
    resetGame();
});

pvcBtn.addEventListener("click", () => {
    vsComputer = true; // Play with computer
    resetGame();
});

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener("click", resetGame);


