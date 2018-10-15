//PREDICAMENTS
//
//----->How can i get the computer to randomnly position his/her ships on the board at the start of the game?

//set the rows and colums
const columns = 10;
const rows = 10;
let numberOfHits = 0;

//storing the main div containing the user grid in a variable.
const gameBoardContainer = document.getElementById('gameBoardDiv');
//storing the main div containing the computer grid in a variable.
const computerBoardContainer = document.getElementById('computerGameBoardDiv');

// console.log(gameBoard);


//Generating boxes in the grid by adding extra divs to my gameBoard using a loop within a
//loop to create and id the extra divs in rows and columns
for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    gameBoardContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'B' + i  + j;
    //add the same class to all clickable boxes
    box.className = 'individualBoxes';

  }
}

for(let i=0; i < columns; i++){
  for(let j=0; j< rows; j++){
    const box = document.createElement('div');
    computerBoardContainer.appendChild(box);

    //add individual id's to each box right after they've been made.
    box.id = 'C' + i  + j;
    //add the same class to all clickable boxes
    box.className = 'individualBoxes';

  }
}
//storing individual game boxes in a variable
const DomIndividualBoxes = document.querySelectorAll('.individualBoxes');
// console.log(DomIndividualBoxes);

//PLAYER'S MOVE AGAINST COMPUTER!!
//Type of ships arrays, once portion of ship is damaged it is pushed into its respective array
let carrier = [];
let patrolBoat = [];
let battleShip = [];
let submarine = [];
let destroyer = [];

//Event listeners for all boxes.
DomIndividualBoxes.forEach(box =>{
  box.addEventListener('click', fire);
});

//CALLBACK FIRE FUNCTION!!
function fire(){
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
    return DomGameBoard[currentRowNumber][currentColumnNumber] = 3;
  }

  //HIT FUNCTION!!
  //hit function changes specific box to shipNumber * 2 if hit, it should also change the shade of color to red
  // console.log(numberOfHits);
  function hit(){
    // for the user to know which square has been hit the box should be reded out once click and hit
    currentGameBox.style.background = 'red';
    console.log('you have hit computers ship');
    numberOfHits ++;
    //Determine type of ship hit and push the portion of the ship hit to their respective ship array.
    //SHIP KEYS and Ship Keys once Hit(Ship number multiplied by 2)!
    //1 -->Carrier----------------------->Once Hit changes to 2
    //4 -->Patrol Boat------------------->Once Hit changes to 8
    //5 -->Battle Ship------------------->Once Hit changes to 10
    //6 -->Submarine--------------------->Once Hit changes to 12
    //7 -->Destroyer--------------------->Once Hit changes to 14
    const typeOfShipHit = DomGameBoard[currentRowNumber][currentColumnNumber] * 2;
    if(typeOfShipHit === 2){
      carrier.push(typeOfShipHit);
    } else if (typeOfShipHit === 8) {
      patrolBoat.push(typeOfShipHit);
    } else if (typeOfShipHit === 10) {
      battleShip.push(typeOfShipHit);
    } else if (typeOfShipHit === 12) {
      submarine.push(typeOfShipHit);
    } else if(typeOfShipHit === 14){
      destroyer.push(typeOfShipHit);
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
    if(numberOfHits === 17){
      win();
    }
    // console.log(numberOfHits);
  }

  // WIN FUNCTION
  function win(){
    return console.log('you have sunk all of computers ships, you win!');
  }

  //HIT AND MISS CONDITION!!
  //If miss, Miss function is invoked
  if(!DomGameBoard[currentRowNumber][currentColumnNumber]){
    miss();
    //Hit!!
    //If hit, hit function is invoked
  } else if(DomGameBoard[currentRowNumber][currentColumnNumber]){
    hit();
  }
  // console.log('clicked ' +'currentRow :' + currentRow + ' current column :' + currentColumn);

  //Remove event listener from each box clicked once they have been clicked.
  currentGameBox.removeEventListener('click', fire);


}

// COMPUTER'S MOVE AGAINST PLAYER!!


//Total number of hits per player to win is 17. So if any player gets hit 17 times the game is over.
// Carrier     - 5 boxes/hits
// Battleship  - 4 boxes/hits
// Destroyer   - 3 boxes/hits
// Submarine   - 3 boxes/hits
// Patrol Boat - 2 boxes/hits
const DomGameBoard = [
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
// function generateComputerShipPlacement(){
//   const randomnRow = Math.floor(Math.random()*10);
//   const randomnColumn = Math.floor(Math.random()*10);
// }
// generateComputerShipPlacement();

//-->how do i randomnly generate each individual ship type/number to be aligned in correct order
//   randomnly either vertically or horizontally anywhere on the board.

//-->DomGameBoard[randomnRow] or [randomnColumn]
//-->DomGameBoard[randomnRow or randomnColumn] shipNumber
