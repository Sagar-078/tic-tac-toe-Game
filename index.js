let gameInfo = document.querySelector(".game_info");
let boxs = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameBoxs;

let winningPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], 
                        [2,5,8], [0,4,8,], [2,4,6]];


// creat a function for intialise the game
function intialiseGame(){
    currentPlayer = "x";
    gameBoxs = ["","","","","","","","",""];

    // for show empty in ui 
    boxs.forEach((box, index) =>{
        box.innerText = "";
        boxs[index].style.pointerEvents = "all"; 

        // intialise box with removing css properties
        box.classList = `box box${index+1}`;

    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

intialiseGame();

boxs.forEach((box, index) =>{
    box.addEventListener("click", () =>{
        handelClick(index);
    })
});

function handelClick(index){
    if(gameBoxs[index] === ""){
        boxs[index].innerText = currentPlayer;
        gameBoxs[index] = currentPlayer;
        
        // remove curser pointer property for alrady innertext prasent
        boxs[index].style.pointerEvents = "none"; 

        turnSwap();

        // check for gameOver
        checkGameOver();
    }
    
   
}

function turnSwap(){
    if(currentPlayer === "x"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "x";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// creat a function for check is game over
function checkGameOver(){
    let result = "";

    winningPositions.forEach((position) =>{
        // if 3 boxes should be non-empty same in value
        if((gameBoxs[position[0]] !== "" || gameBoxs[position[1]] !== "" 
        || gameBoxs[position[2]] !== "") && 
        (gameBoxs[position[0]] === gameBoxs[position[1]])
        &&(gameBoxs[position[1]] === gameBoxs[position[2]])){

            if(gameBoxs[position[0]] === "x"){
                result = "x";
            }else{
                result = "O";
            }

            //for if winer is found then pointer event will be none
            boxs.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            //winer boxes will be color
            boxs[position[0]].classList.add("win");
            boxs[position[1]].classList.add("win");
            boxs[position[2]].classList.add("win");

        }
    });

    // for show in game Info
    if(result !== ""){
        gameInfo.innerText = `Congratulation
                            Winner Player - ${result}`;
        
        newGameBtn.classList.add("active");
    }

    // if no winer found but boxs are filled 
    let filledBox = 0;
    gameBoxs.forEach((box) =>{
        if(box !== ""){
            filledBox++;
        }
    });

    // if full box is filled then print game is tie
    if(result === ""){
        if(filledBox === 9){
            gameInfo.innerText = `Game is Tied !
                                    Try Again`;
            newGameBtn.classList.add("active");
        }
    }

}


// if click on  new game btn then it intialise 

newGameBtn.addEventListener("click", intialiseGame);

