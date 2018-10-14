//!!!!!!!!!!!!
//----->ask for help on toggle so that boxes can only be clicked Once
//----->sort out loop within a loop to be able to search through entire gameBoard array to look for the right
//      ship numbers to be pushed into their corresponding type of ship array.(currently my function kind of-
//      works pushing ships into their individual arrays but for some reason there are way too many ship numbers-
//      being pushed into the arrays).


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
  // 2 * box number represents a hit on a ship if correct location box of ship is located
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
  //hit function changes specific box to number * 2 if hit, it should also change the shade of color to red
  // console.log(numberOfHits);
  function hit(){
    // for the user to know which square has been hit the box should be reded out once click and hit
    currentGameBox.style.background = 'red';
    numberOfHits ++;
    //Win!!
    if(numberOfHits === 17){
      win();
    }
    // console.log(numberOfHits);
    //for me as the developer to know which square has been hit
    //return ship number * 2(this is to determine which ship was hit)
    return DomGameBoard[currentRowNumber][currentColumnNumber] = DomGameBoard[currentRowNumber][currentColumnNumber] * 2;
  }

  // console.log(DomGameBoard[currentRowNumber][currentColumnNumber]);

  // WIN FUNCTION
  function win(){
    return console.log('you have sunk all of computers battleships, you win!');
  }

  //Miss!!
  //If miss, Miss function is invoked
  if(!DomGameBoard[currentRowNumber][currentColumnNumber]){
    miss();
    //Hit!!
    //If hit, hit function is invoked
  } else if(DomGameBoard[currentRowNumber][currentColumnNumber]){
    hit();
  }
  // console.log(currentClick);
  //
  // console.log('clicked ' +'currentRow :' + currentRow + ' current column :' + currentColumn);

  //PREDICAMENTS
  //a.)how do I know when all 1's in a row or column have been changed to 2(meaning a destroyed ship)?
  //b.)How do I save the '1's' on DomGameBoard as the actual five ships?
  //--if any line(either vertical or horizontal) of 1's are wedged between two 0's, it is a ship.
  //--the number of 1's wedged inbetween the two 0's determines what type of ship it is.
  //c.)How can i get the computer to randomnly position his ships on the board at the start of the game?
}



// COMPUTER'S MOVE AGAINST PLAYER!!


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
//SHIP KEYS and Ship Keys once Hit(Ship number multiplied by 2)!
//1 -->Carrier----------------------->Once Hit changes to 2
//4 -->Patrol Boat------------------->Once Hit changes to 8
//5 -->Battle Ship------------------->Once Hit changes to 10
//6 -->Submarine--------------------->Once Hit changes to 12
//7 -->Destroyer--------------------->Once Hit changes to 14

//Thought Process
//b.)How do I save the '1's' on DomGameBoard as the actual five types ships?
//--if any line(either vertical or horizontal) of more than two 1's in a row are wedged between two 0's, it is a ship.
//---->detect 1's horizontally by checking through each array for 1's wedged btw 0's and counting them
//---->if 1"s nested between 0's is greater than 2 then return the 1's
//---->1 is true, 0 is false therefore could check if each condition in array[index] is true or false.
//---->how can i use .filter() to check for ("1's" in a row > than two) and that are wedged btw 0 ([0,1,1,1,1,0])


//total number of boxes per ship/total hits for ship to be destroyed. Total number of hits per player in any
//given game is 17. So if any player gets hit 17 times then game is over.
// Carrier     - 5 boxes/hits
// Battleship  - 4 boxes/hits
// Destroyer   - 3 boxes/hits
// Submarine   - 3 boxes/hits
// Patrol Boat - 2 boxes/hits

//DETERMINING SHIPS!!(possible solution)
//-->push what type ship box has been hit to its corresponding type of ship array.
//-->if ship type array has been filled then said ship has been destroyed.

// const carrier = [];
// const patrolBoat = [];
// const battleShip = [];
// const submarine = [];
// const destroyer = [];
// for(let i = 0; i < DomGameBoard.length; i ++){
//   for(let j = 0; j < DomGameBoard[i].length; j++){
//     if(DomGameBoard[i][j] === 2){
//       carrier.push(DomGameBoard[i][j]);
//       // return carrier;
//     } else if(DomGameBoard[i][j] === 8){
//       patrolBoat.push(DomGameBoard[i][j]);
//       // return patrolBoat;
//     } else if(DomGameBoard[i][j] === 10){
//       battleShip.push(DomGameBoard[i][j]);
//       // return battleShip;
//     } else if(DomGameBoard[i][j] === 12){
//       submarine.push(DomGameBoard[i][j]);
//       // return submarine;
//     } else if(DomGameBoard[i][j] === 14){
//       destroyer.push(DomGameBoard[i][j]);
//       // return destroyer;
//     }
//   }
// }
