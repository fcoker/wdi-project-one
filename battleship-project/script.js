
//set the rows and colums
const columns = 10;
const rows = 10;
let numberOfHits = 0;

//storing the main div containing the boardgame in a variable.
const gameBoardContainer = document.getElementById('gameBoardDiv');
// console.log(gameBoard);

//generating boxes in the grid by adding extra divs to my gameBoard using a loop within a
// loop to create and id the extra divs in rows and columns
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    gameBoardContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'B' + i  + j;

  }
}

//PLAYER'S MOVE AGAINST COMPUTER!!

//set event listeners for all boxes.
gameBoardContainer.addEventListener('click', fire);

//CALLBACK FIRE FUNCTION!!
function fire(){
  const currentClick = event.target.id;
  const currentRow = currentClick.substring(1, 2);
  const currentColumn =currentClick.substring(2,3);
  const currentRowNumber = parseFloat(currentRow);
  const currentColumnNumber = parseFloat(currentColumn);
  // const currentRowColumn = currentClick.substring(1, 3);
  const currentGameBox = event.target;
  // console.log(currentColumn);

  // NUMBER CODE AND MEANING!
  // 0 represents all empty boxes on the gameBoard
  // 1 represents the position of the ships on the boxes
  // 2 represents a hit on a ship if correct location box of ship is located
  // 3 represents a miss when an empty box with no ship on it is clicked

  //MISS FUNCTION!!
  //miss function changes specific box to 3 if miss. it should also change the shade of color to grey
  function miss(){
    // for the user to know which square has been missed the box should be greyed out once click and missed
    currentGameBox.style.background = 'grey';
    //for me as the developer to know which square has been missed
    return DomGameBoard[currentRowNumber][currentColumnNumber] = 3;
  }

  //HIT FUNCTION!!
  //hit function changes specific box to 2 if hit. it should also change the shade of color to red
  // console.log(numberOfHits);
  function hit(){
    // for the user to know which square has been hit the box should be reded out once click and hit
    currentGameBox.style.background = 'red';
    numberOfHits ++;

    if(numberOfHits === 17){
      win();
    }
    // console.log(numberOfHits);
    //for me as the developer to know which square has been hit
    return DomGameBoard[currentRowNumber][currentColumnNumber] = 2;
  }

  // WIN FUNCTION
  function win(){
    return console.log('you have sunk all of computers battleships, you win!');
  }

  //Miss!!
  //If miss, Miss function is invoked
  if(DomGameBoard[currentRowNumber][currentColumnNumber] === 0){
    miss();
    //Hit!!
    //If hit, hit function is invoked
  } else if(DomGameBoard[currentRowNumber][currentColumnNumber] === 1){
    hit();
  }
  // console.log(currentClick);
  //
  // console.log('clicked ' +'currentRow :' + currentRow + ' current column :' + currentColumn + ' currentRowColumn is :' + currentRowColumn);

  //PREDICAMENTS
  //How do I save the '1's' as the actual 5 ships?
  //how do I know when a ship has been fully destroyed?
  //How can i get the computer to randomnly position his ships on the board at the start of the game?
}

// COMPUTER'S MOVE AGAINST PLAYER!!


const DomGameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,1,0,0,0],
  [0,0,1,0,0,0,1,0,0,0],
  [0,0,1,0,1,0,1,0,0,0],
  [0,0,1,0,1,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

//total number of hits in any given game is 17. so if any player gets hit 17 times then game is over.
// Carrier     - 5 hits
// Battleship  - 4 hits
// Destroyer   - 3 hits
// Submarine   - 3 hits
// Patrol Boat - 2 hits
