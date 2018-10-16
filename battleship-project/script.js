//PREDICAMENTS
//MVP!!!
//----->how do i get user to play again once he has a hit and to move to computer's turn when he/she misses.
//----->how do i get computer to take a turn right after user clicks and misses
//----->how to get computer to play again if it gets a hit and stop if it misses.
//----->How can i get the computer to randomnly position his/her ships on the board at the start of the game?
//----->When game is won how do i end game and restart.
// FINISHED GAME
//----->Give computer if condition that once a hit is made, its next hit is a 1/4,
//      if hit again 1/1 till ship destroyed.
//----->allow computer randmonly place all ships on board at the start of the game.
//----->animations for hit and miss functions that explode on ship or drop into the water
//----->sound for FIRE functions
//----->ingame display box with animated captain head showing relevant messages and alerts

//set the rows and colums
const columns = 10;
const rows = 10;
let userNumberOfHits = 0;
let compNumberOfHits = 0;
let playerTurn = true:

//storing the main div containing the user grid in a variable.
const gameBoardContainer = document.getElementById('gameBoardDiv');
//storing the main div containing the computer grid in a variable.
const computerBoardContainer = document.getElementById('computerGameBoardDiv');

// console.log(gameBoard);

//CREATING USERS GRID!!
//Generating boxes in the grid by adding extra divs to my gameBoard using a loop within a
//loop to create and id the extra divs in rows and columns
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    gameBoardContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'B' + i  + j;
    //add the same class to all clickable boxes
    box.className = 'userIndividualBoxes';
  }
}
//CREATING COMPUTERS GRID!!
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    computerBoardContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'C' + i  + j;
    //add the same class to all clickable boxes
    box.className = 'compIndividualBoxes';

  }
}
//storing individual game boxes in a variable
const UserIndividualGameBoxes = document.querySelectorAll('.userIndividualBoxes');
// console.log(UserIndividualGameBoxes);

//PLAYER'S MOVE AGAINST COMPUTER!!
//Type of ships arrays, once portion of ship is damaged it is pushed into its respective array
let carrier = [];
let patrolBoat = [];
let battleShip = [];
let submarine = [];
let destroyer = [];

//Event listeners for all boxes.
UserIndividualGameBoxes.forEach(box =>{
  box.addEventListener('click', userFire);
});

//CALLBACK User FIRE FUNCTION!!
function userFire(){
  const currentClick = event.target.id;
  const currentRow = currentClick.substring(1, 2);
  const currentColumn = currentClick.substring(2,3);
  const currentRowNumber = parseFloat(currentRow);
  const currentColumnNumber = parseFloat(currentColumn);
  const currentGameBox = event.target;
  // console.log(currentColumn);

  // NUMBER CODE AND MEANING!
  // 0 represents all empty boxes on the gameBoard
  // 3 represents a miss when an empty box with no ship on it is clicked
  // 1 represents the position of a carrier on the box
  // 4 represents the position of a Patrol Boat on the box
  // 5 represents the position of a Battle Ship on the box
  // 6 represents the position of a Submarine on the box
  // 7 represents the position of a Destroyer on the box
  // 2 * box number represents a hit on a ship if correct location box of ship is located

  //MISS FUNCTION!!
  //miss function changes specific box to 3 if miss. it should also change the shade of color to grey
  function miss(){
    // for the user to know which square has been missed the box should be greyed out once click and missed
    currentGameBox.style.background = 'grey';
    console.log('your torpedo missed!!');
    //for me as the developer to know which square has been missed
    return userDomGameBoard[currentRowNumber][currentColumnNumber] = 3;
  }

  //HIT FUNCTION!!
  //hit function changes specific box to shipNumber * 2 if hit, it should also change the shade of color to red
  // console.log(userNumberOfHits);
  function hit(){
    // for the user to know which square has been hit the box should be reded out once click and hit
    currentGameBox.style.background = 'red';
    console.log('you have hit computers ship');
    userNumberOfHits ++;
    //Determine type of ship hit and push the portion of the ship hit to their respective ship array.
    //SHIP KEYS and Ship Keys once Hit(Ship number multiplied by 2)!
    //1 -->Carrier----------------------->Once Hit changes to 2
    //4 -->Patrol Boat------------------->Once Hit changes to 8
    //5 -->Battle Ship------------------->Once Hit changes to 10
    //6 -->Submarine--------------------->Once Hit changes to 12
    //7 -->Destroyer--------------------->Once Hit changes to 14
    const compTypeOfShipHit= userDomGameBoard[currentRowNumber][currentColumnNumber] * 2;
    if(compTypeOfShipHit === 2){
      carrier.push(compTypeOfShipHit);
    } else if (compTypeOfShipHit === 8) {
      patrolBoat.push(compTypeOfShipHit);
    } else if (compTypeOfShipHit === 10) {
      battleShip.push(compTypeOfShipHit);
    } else if (compTypeOfShipHit === 12) {
      submarine.push(compTypeOfShipHit);
    } else if(compTypeOfShipHit === 14){
      destroyer.push(compTypeOfShipHit);
    }
    //Determine when ship has been destroyed
    if(carrier.length === 5){
      console.log('You have destroyed computer\'s Aircraft Carrier!!');
      return carrier = [];
    } else if (patrolBoat.length === 2) {
      console.log('You have destroyed computer\'s Patrol Boat!!');
      return patrolBoat = [];
    } else if(battleShip.length === 4){
      console.log('You have destroyed computer\'s Battle Ship!!');
      return battleShip = [];
    } else if (submarine.length === 3) {
      console.log('You have destroyed computer\'s Submarine!!');
      return submarine = [];
    } else if (destroyer.length === 3){
      console.log('You have destroyed computer\'s Destroyer!!');
      return destroyer = [];
    }
    //Win!!
    if(userNumberOfHits === 17){
      userWin();
    }
    // console.log(userNumberOfHits);
  }

  // WIN FUNCTION
  function userWin(){
    return console.log('you have sunk all of computers ships, you win!');
  }

  //HIT AND MISS CONDITION!!
  //If miss, Miss function is invoked
  if(!userDomGameBoard[currentRowNumber][currentColumnNumber]){
    miss();
    //Hit!!
    //If hit, hit function is invoked
  } else if(userDomGameBoard[currentRowNumber][currentColumnNumber]){
    hit();
  }
  // console.log('clicked ' +'currentRow :' + currentRow + ' current column :' + currentColumn);

  //Remove event listener from each box clicked once they have been clicked.
  currentGameBox.removeEventListener('click', userFire);
}


//COMPUTER'S MOVE AGAINST PLAYER!!
let compCarrier = [];
let compPatrolBoat = [];
let compBattleShip = [];
let compSubmarine = [];
let compDestroyer = [];
//computer fire function!!
function computerFire(){
  const randomnRow = Math.floor(Math.random()*10);
  const randomnColumn = Math.floor(Math.random()*10);
  // (compDomGameBoard)keeps coming up as undefined even though it is defined globally!!
  // let currentDomCompChoice = compDomGameBoard[randomnRow][randomnColumn];
  const compCurrentGameBoxID = 'C' + randomnRow + randomnColumn;
  const compCurrentGameBox = document.getElementById(compCurrentGameBoxID);
  // console.log(compDomGameBoard[randomnRow][randomnColumn]);
  function compMiss(){
    compCurrentGameBox.style.background = 'grey';
    console.log('Computer\'s torpedo missed you!!');
    return compDomGameBoard[randomnRow][randomnColumn] = 3;
  }
  function compWin(){
    return console.log('Computer has sunk all your ships, you Loose!!');
  }
  function compHit(){
    compCurrentGameBox.style.background = 'red';
    console.log('Computer has hit your ship!!');
    compNumberOfHits ++;
    //Determine type of ship hit and push the portion of the ship hit to their respective ship array.
    const userTypeOfShipHit = compDomGameBoard[randomnRow][randomnColumn] * 2;
    if(userTypeOfShipHit === 2){
      compCarrier.push(userTypeOfShipHit);
    } else if (userTypeOfShipHit === 8) {
      compPatrolBoat.push(userTypeOfShipHit);
    } else if (userTypeOfShipHit === 10) {
      compBattleShip.push(userTypeOfShipHit);
    } else if (userTypeOfShipHit === 12) {
      compSubmarine.push(userTypeOfShipHit);
    } else if(userTypeOfShipHit === 14){
      compDestroyer.push(userTypeOfShipHit);
    }
    //Determine when ship has been destroyed
    if(compCarrier.length === 5){
      console.log('Computer has destroyed your Aircraft Carrier!!');
      return compCarrier = [];
    } else if (compPatrolBoat.length === 2) {
      console.log('Computer has destroyed your Patrol Boat!!');
      return compPatrolBoat = [];
    } else if(compBattleShip.length === 4){
      console.log('Computer has destroyed your Battle Ship!!');
      return compBattleShip = [];
    } else if (compSubmarine.length === 3) {
      console.log('Computer has destroyed your Submarine!!');
      return compSubmarine = [];
    } else if (compDestroyer.length === 3){
      console.log('Computer has destroyed your Destroyer!!');
      return compDestroyer = [];
    }
    if(compNumberOfHits === 17){
      compWin();
    }
  }
  //HIT AND MISS CONDITION FOR COMPUTER!!
  //If miss, Miss function is invoked
  if(!compDomGameBoard[randomnRow][randomnColumn]){
    compMiss();
    // Hit!!
    // If hit, hit function is invoked
  } else if(compDomGameBoard[randomnRow][randomnColumn]){
    compHit();
  }
}
//Total number of hits per player to win is 17. So if any player gets hit 17 times the game is over.
// Carrier     - 5 boxes/hits
// Battleship  - 4 boxes/hits
// Destroyer   - 3 boxes/hits
// Submarine   - 3 boxes/hits
// Patrol Boat - 2 boxes/hits
const userDomGameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,7,0,0,0],
  [0,0,1,0,0,0,7,0,0,0],
  [0,0,1,0,4,0,7,0,0,0],
  [0,0,1,0,4,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,0,5,5,5,5,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,6,6,6,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
const compDomGameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0],
  [0,0,1,0,7,7,7,0,0,0],
  [0,0,1,0,0,0,0,0,6,0],
  [0,0,1,0,4,4,0,0,6,0],
  [0,0,1,0,0,0,0,0,6,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,5,5,5,5,5,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
//Positions of my ships on computers board.
for(let compRow = 0; compRow < compDomGameBoard.length; compRow++){
  for(let compColumn = 0; compColumn < compDomGameBoard[compRow].length; compColumn++){
    if(compDomGameBoard[compRow][compColumn] === 1){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compDomGameBoard[compRow][compColumn] === 5){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compDomGameBoard[compRow][compColumn] === 6){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compDomGameBoard[compRow][compColumn] === 7){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compDomGameBoard[compRow][compColumn] === 4){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    }
  }
}
// const randomnRow = Math.floor(Math.random()*10);
// const randomnColumn = Math.floor(Math.random()*10);
// computerFire();
// console.log(compDomGameBoard[randomnRow][randomnColumn])
