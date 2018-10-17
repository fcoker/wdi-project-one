//PREDICAMENTS
//----->Add health progress bars to indivdual ships that go down relative to hit counts
//----->How can i get the computer to randomnly position his/her ships on the board at the start of the game?
//----->Give computer if condition that once a hit is made, its next hit is a 1/4,
//      if hit again 1/1 till ship destroyed.
//----->allow computer randmonly place all ships on board at the start of the game.
//----->animations for hit and miss functions that explode on ship or drop into the water
//----->sound for FIRE functions
//----->add difficulty levels using probability of computer hits
//----->When game is finished restart with button.

//User gameboard containing position of all hits, misses and location of computers ships.
// NUMBER CODE AND MEANING!
// 0 represents all empty boxes on the gameBoard
// 3 represents a miss when an empty box with no ship on it is clicked
// 1 represents the position of a carrier on the box
// 4 represents the position of a Patrol Boat on the box
// 5 represents the position of a Battle Ship on the box
// 6 represents the position of a Submarine on the box
// 7 represents the position of a Destroyer on the box
// 2 * box number represents a hit on a ship if correct location box of ship is located
const userActualGameBoard = [
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
//Computer gameboard containing position of all hits, misses and location of computers ships.
const compActualGameBoard = [
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

//Setting the rows and colums for the DOM game board
const columns = 10;
const rows = 10;
let userNumberOfHits = 0;
let compNumberOfHits = 0;
let playerTurn = true;

//storing the main div containing the user grid in a variable.
const userDomGameContainer = document.getElementById('gameBoardDiv');
//storing the main div containing the computer grid in a variable.
const compDomGameContainer = document.getElementById('computerGameBoardDiv');
//storing ingame display box as variable
const ingameDisplay = document.getElementsByClassName('displayText')[0];
// console.log(ingameDisplay);

//CREATING USERS GRID!!
//Generating boxes in the grid by adding extra divs to my DOM gameBoard using a loop within a
//loop to create and id the new divs in rows and columns
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    userDomGameContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'B' + i  + j;
    //adding the same class to all clickable boxes
    box.className = 'userIndividualBoxes';
  }
}
//CREATING COMPUTERS GRID!!
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    compDomGameContainer.appendChild(box);

    //adding individual id's to each box right after they've been made.
    box.id = 'C' + i  + j;
    //adding the same class to all clickable boxes
    box.className = 'compIndividualBoxes';
  }
}
//storing individual game boxes in a variable
const userIndividualDomGameBoxes = document.querySelectorAll('.userIndividualBoxes');
// console.log(userIndividualDomGameBoxes);

//PLAYER'S MOVE AGAINST COMPUTER!!
//Type of ships arrays, once portion of ship is damaged it is pushed into its respective array
let carrier = [];
let patrolBoat = [];
let battleShip = [];
let submarine = [];
let destroyer = [];

//Event listeners for all boxes.
userIndividualDomGameBoxes.forEach(box =>{
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


  //MISS FUNCTION!!
  //miss function changes specific box to 3 if miss. it should also change the shade of color in the DOM box to grey
  function miss(){
    // for the user to know which square has been missed the DOM box should be greyed out once click and missed
    currentGameBox.style.background = 'grey';
    ingameDisplay.textContent = 'YOUR TORPEDO MISSED!!';
    playerTurn = false;
    //for me as the developer to know which square has been missed
    return userActualGameBoard[currentRowNumber][currentColumnNumber] = 3;

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

    //DETERMINING TYPE OF SHIP HIT
    function userDestroyShip(){
      const compTypeOfShipHit= userActualGameBoard[currentRowNumber][currentColumnNumber] * 2;
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

      //DETERMINING TYPE OF SHIP DESTROYED
      if(carrier.length === 5){
        ingameDisplay.innerHTML = ('You have destroyed computer\'s Aircraft Carrier!!');
        carrier = [];
      } else if (patrolBoat.length === 2) {
        ingameDisplay.textContent = 'You have destroyed computer\'s Patrol Boat!!';
        patrolBoat = [];
      } else if(battleShip.length === 4){
        ingameDisplay.textContent = 'You have destroyed computer\'s Battle Ship!!';
        battleShip = [];
      } else if (submarine.length === 3) {
        ingameDisplay.textContent = 'You have destroyed computer\'s Submarine!!';
        submarine = [];
      } else if (destroyer.length === 3){
        ingameDisplay.textContent = 'You have destroyed computer\'s Destroyer!!';
        destroyer = [];
      }
    }
    //Win!!
    if(userNumberOfHits === 17){
      return userWin();
    }
    ingameDisplay.textContent = 'YOU   HAVE   HIT   COMPUTER\'S   SHIP!!';
    userDestroyShip();
    // console.log(userNumberOfHits);
  }

  // WIN FUNCTION
  function userWin(){
    return ingameDisplay.textContent = 'You have sunk all of computers ships, You Win!';
  }

  //HIT AND MISS CONDITION!!
  //If miss, Miss function is invoked
  if(!userActualGameBoard[currentRowNumber][currentColumnNumber]){
    miss();
    //Hit!!
    //If hit, hit function is invoked
  } else if(userActualGameBoard[currentRowNumber][currentColumnNumber]){
    hit();
  }
  // console.log('clicked ' +'currentRow :' + currentRow + ' current column :' + currentColumn);

  //Remove event listener from each box clicked once they have been clicked.
  currentGameBox.removeEventListener('click', userFire);
  if (!playerTurn){

    setTimeout(computerFire, 800);
  }
}
// if(!playerTurn)


//COMPUTER'S MOVE AGAINST PLAYER!!
let compCarrier = [];
let compPatrolBoat = [];
let compBattleShip = [];
let compSubmarine = [];
let compDestroyer = [];


//computer fire function!!
//Check if square has already been hit previously by computer
function squareIsAlreadyHit(row, column) {
  const square = compActualGameBoard[row][column];
  return [2, 3, 8, 10, 12, 14].includes(square);
}
//Computer choice of random un-hit box to fire
function chooseRandomUntriedSquare() {
  let randomRow = Math.floor(Math.random()*10);
  let randomColumn = Math.floor(Math.random()*10);
  while (squareIsAlreadyHit(randomRow, randomColumn)) {
    console.log(randomRow, randomColumn, 'already hit! Trying again...');
    randomRow = Math.floor(Math.random()*10);
    randomColumn = Math.floor(Math.random()*10);
  }
  return [randomRow, randomColumn];
}
//COMPUTER FIRE FUNCTION
function computerFire(){
  const randomRowAndColumn = chooseRandomUntriedSquare();
  const randomRow = randomRowAndColumn[0];
  const randomColumn = randomRowAndColumn[1];
  const compCurrentGameBoxID = 'C' + randomRow + randomColumn;
  const compCurrentGameBox = document.getElementById(compCurrentGameBoxID);
  // console.log(compActualGameBoard[randomRow][randomColumn]);
  const compCurrentDomChoice = compActualGameBoard[randomRow][randomColumn];

  //Computer miss function
  function compMiss(){
    compCurrentGameBox.style.background = 'grey';
    ingameDisplay.textContent = 'Computer\'s torpedo missed you!!';
    playerTurn = true;
    // console.log(compCurrentDomChoice);
    compActualGameBoard[randomRow][randomColumn] = 3;
  }
  // console.log(compCurrentDomChoice);
  //computer win function
  function compWin(){
    return ingameDisplay.textContent = 'Computer has sunk all your ships, you Loose!!';
  }
  //computer hit function
  function compHit(){
    compCurrentGameBox.style.background = 'red';
    ingameDisplay.textContent = 'Computer has hit your ship!!';
    compNumberOfHits ++;
    const userTypeOfShipHit = compCurrentDomChoice * 2;
    compActualGameBoard[randomRow][randomColumn] = userTypeOfShipHit;
    //Determine type of user ship hit and push the portion of the ship hit to their respective ship array.
    function compDestroyedShips(){
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
      //Determine when user ship has been destroyed
      if(compCarrier.length === 5){
        ingameDisplay.textContent = 'Computer has destroyed your Aircraft Carrier!!';
        return compCarrier = [];
      } else if (compPatrolBoat.length === 2) {
        ingameDisplay.textContent = 'Computer has destroyed your Patrol Boat!!';
        return compPatrolBoat = [];
      } else if(compBattleShip.length === 4){
        ingameDisplay.textContent = 'Computer has destroyed your Battle Ship!!';
        return compBattleShip = [];
      } else if (compSubmarine.length === 3) {
        ingameDisplay.textContent = 'Computer has destroyed your Submarine!!';
        return compSubmarine = [];
      } else if (compDestroyer.length === 3){
        ingameDisplay.textContent = 'Computer has destroyed your Destroyer!!';
        return compDestroyer = [];
      }
    }
    compDestroyedShips();
    //Computer win function
    if(compNumberOfHits === 17){
      return compWin();
    }
  }
  //HIT AND MISS CONDITION FOR COMPUTER!!
  //If miss, Miss function is invoked
  //  Check for an empty square or an already missed square
  if(compCurrentDomChoice === 0 || compCurrentDomChoice === 3){
    compMiss();
    // Hit!!
    // If hit, hit function is invoked
  } else if(compCurrentDomChoice ){
    compHit();
  }
  if (!playerTurn){

    setTimeout(computerFire, 800);
  }
}
//Total number of hits per player to win is 17. So if any player gets hit 17 times the game is over.
// Carrier     - 5 boxes/hits
// Battleship  - 4 boxes/hits
// Destroyer   - 3 boxes/hits
// Submarine   - 3 boxes/hits
// Patrol Boat - 2 boxes/hits

//Positions of my ships on computers board.
for(let compRow = 0; compRow < compActualGameBoard.length; compRow++){
  for(let compColumn = 0; compColumn < compActualGameBoard[compRow].length; compColumn++){
    if(compActualGameBoard[compRow][compColumn] === 1){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compActualGameBoard[compRow][compColumn] === 5){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compActualGameBoard[compRow][compColumn] === 6){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compActualGameBoard[compRow][compColumn] === 7){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    } else if(compActualGameBoard[compRow][compColumn] === 4){
      const userCarrierBoxPositionID = 'C' + compRow + compColumn;
      const userCarrierBoxPosition = document.getElementById(userCarrierBoxPositionID);
      userCarrierBoxPosition.style.background = 'black';
    }
  }
}
// const randomRow = Math.floor(Math.random()*10);
// const randomColumn = Math.floor(Math.random()*10);
// computerFire();
// console.log(compActualGameBoard[randomRow][randomColumn])
