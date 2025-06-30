let boxes = document.querySelectorAll(".box");
let gameDiv = document.querySelector(".game");
let reset = document.createElement("button");
let winMsg = document.createElement("h1");

let turnX = true; //if true - print X , if false - print O

const winningPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const checkWinner = () => {
    for(let i = 0; i < 8; i++) {
        if((boxes[winningPattern[i][0]].innerText == "X" && boxes[winningPattern[i][1]].innerText == "X" && boxes[winningPattern[i][2]].innerText == "X") || (boxes[winningPattern[i][0]].innerText == "O" && boxes[winningPattern[i][1]].innerText == "O" && boxes[winningPattern[i][2]].innerText == "O"))
            return "Win";
    }
};

const drawCheck = () => {
    let check = true;
    boxes.forEach((val) => {
        if(val.disabled == false) {
            check = false;
        }
    });
    return check;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true; //to disable it as a button

        let draw = drawCheck();
        if(draw) {
            for(let el of boxes) {
                el.style.display = "none";
            }
            gameDiv.style.display = "none";
            document.querySelector("h1").after(winMsg);
            winMsg.innerText = `Game draw`;

            reset.classList.add("reset");
            document.querySelector("pre").after(reset);
            reset.innerText = `Reset Game`;
        }

        let result = checkWinner();
        if(result === "Win") {
            for(let el of boxes) {
                el.style.display = "none";
            }
            gameDiv.style.display = "none";
            document.querySelector("h1").after(winMsg);
            winMsg.innerText = `${turnX ? "Player 2" : "Player 1"} wins the game`;

            reset.classList.add("reset");
            document.querySelector("pre").after(reset);
            reset.innerText = `Reset Game`;
        }
    });
});

reset.addEventListener("click", () => {
    for(let el of boxes) {
        el.style.display = "inline-block";
        el.innerText = "";
        el.disabled = false;
    }
    turnX = true;
    gameDiv.style.display = "flex";
    winMsg.remove();
    winMsg.innerText = ``;

    reset.remove();
    reset.innerText = ``;
});