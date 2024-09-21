document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    const startPage = document.querySelector(".start-page");
    const entryPage = document.querySelector(".entry-page");
    const gamePage = document.querySelector(".game-page");
    const pvpBtn = document.getElementById("pvp-btn");
    const pvcBtn = document.getElementById("pvc-btn");
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#new-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let main = document.querySelector("main");
    
    let turnO = true;
    let vsComputer = false;
    let gameOver = false;
    
    let winPatterns = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [6, 7, 8]
    ];

    startGameBtn.addEventListener("click", () => {
        startPage.style.display = "none"; 
        entryPage.classList.remove("hide"); 
    });

    pvpBtn.addEventListener("click", () => {
        entryPage.classList.add("hide"); 
        gamePage.classList.remove("hide"); 
        startPage.classList.add("hide");
        vsComputer = false; 
        resetGame();
    });

    pvcBtn.addEventListener("click", () => {
        entryPage.classList.add("hide"); 
        gamePage.classList.remove("hide"); 
        vsComputer = true; 
        resetGame();
    });

    const resetGame = () => {
        turnO = true;
        gameOver = false;
        enableBoxes();
        resetBoxStyles();
        msgContainer.classList.add("hide");
        removeShakeEffect();
    };

    const resetBoxStyles = () => {
        boxes.forEach((box) => {
            box.classList.remove("player-o", "player-x", "shake");
            box.textContent = "";
        });
        main.classList.remove("main");
    };

    const removeShakeEffect = () => {
        boxes.forEach((box) => {
            box.classList.remove("shake");
        });
    };

    const enableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = false;
            box.textContent = "";
        });
    };

    const disableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (!box.disabled && !gameOver) {
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

                if (vsComputer && !turnO && !gameOver) {
                    setTimeout(computerTurn, 500);
                }
            }
        });
    });

    const showWinner = (winner, winningBoxes) => {
        gameOver = true;
        disableBoxes();
        addShakeEffect(winningBoxes);
        setTimeout(() => {
            msg.innerText = `Congratulations, Winner is ${winner} 💥🎉`;
            msgContainer.classList.remove("hide");
            main.classList.add("main");
            removeShakeEffect();
        }, 2000);
    };

    const addShakeEffect = (winningBoxes) => {
        winningBoxes.forEach(index => {
            boxes[index].classList.add("shake");
        });
    };

    const checkWinnerOrDraw = () => {
        let isWinner = false;
        for (let pattern of winPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
                if (pos1val === pos2val && pos2val === pos3val) {
                    showWinner(pos1val, pattern);
                    isWinner = true;
                    return;
                }
            }
        }

        if (!isWinner && isDraw()) {
            gameOver = true;
            setTimeout(resetGame, 1000);
        }
    };

    const isDraw = () => {
        return [...boxes].every(box => box.innerText !== "");
    };

    const computerTurn = () => {
        if (!gameOver) {
            let emptyBoxes = [...boxes].filter(box => box.innerText === "");
            if (emptyBoxes.length > 0) {
                let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                randomBox.textContent = "X";
                randomBox.classList.add("player-x");
                randomBox.disabled = true;
                turnO = true;
                checkWinnerOrDraw();
            }
        }
    };

    newGameBtn.addEventListener('click', () => {
        gamePage.classList.add("hide");
        entryPage.classList.remove("hide");
        resetGame();
    });

    resetBtn.addEventListener("click", resetGame);
});
