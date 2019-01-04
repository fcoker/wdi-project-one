# **Battleships** <img align="right" src="https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67"/>
## Summary
This is an online version of the traditional grid game Battleships in which the user plays against computer. Each player has to guess what grid square their opponents ships are on and the objective of the game is to sink all of the opponents ships. My version of battleships was made using basic HTML, CSS and JavaScript.

Battleships was my pioneer project from General Assembly's Web development immersive course and was done individually with a timeframe of one week.The project was Front-end only. This was the first project in which I was able to incorporate all three languages and actually see a working project on a browser. I got to mainly test out my newly acquired JavaScript skills.


links Below
Web Site [GitHub](https://fcoker.github.io/wdi-project-one/).
GitHub [Repo](https://github.com/fcoker/wdi-project-one).


## Brief

* Render a grid-based game in the browser
* Switch turns between two players
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Use Javascript or jQuery for DOM manipulation
* Deploy your game online, using Github Pages, where the rest of the world can access it
* Use Javascript or jQuery for DOM manipulation
* Use semantic markup for HTML and CSS (adhere to best practices)

## Approach Taken

### Grid Layout & Ship Representation

I started out by deciding to represent my 10 x 10 game board grid with an array of arrays in which each box in the columns and rows would be represented by each element in the arrays. Secondly I made a key system with the numbers in the array in which I would be able to tell the status on each square e.g (position and type of ship, Hit, Miss, Empty).

My second predicament in the planning stage was deciding how I was going to represent my ships and also how to tell if they had been destroyed. My plan for this was to represent each ship as an empty array. To determine whether a ship had been destroyed the empty array had to be filled up with its relative key(number).  


## Technologies Used

* CSS3
* HTML
* JavaScript(ES6)
* Git
* GitHub
* Google Fonts



### Featured Piece of Code no. 1
My first piece of code which i'm quite proud of is determining whether a ship has been hit, what type of ship has been hit and also when a ship has been totally destroyed. I was able to determine when a ship and what type of ship has been hit using specific numbers as keys on my grid which is shown below. each number represent either a ship, a hit, a miss and type of ship hit.

Secondly to tell when a ship had been destroyed I used conditional statements to check the element lengths of each ship array, when the array length matches the total ship length then the ship has been destroyed.

``` JavaScript
//SHIP KEYS and Ship Keys once Hit(Ship number multiplied by 2)!
//1 -->Carrier----------------------->Once Hit changes to 2
//4 -->Patrol Boat------------------->Once Hit changes to 8
//5 -->Battle Ship------------------->Once Hit changes to 10
//6 -->Submarine--------------------->Once Hit changes to 12
//7 -->Destroyer--------------------->Once Hit changes to 14

//DETERMINING TYPE OF SHIP HIT
//Type of ship arrays, once portion of ship is damaged it is pushed into its respective array
let carrier = [];

function userDestroyShip(){
  const compTypeOfShipHit= userActualGameBoard[currentRowNumber][currentColumnNumber] * 2;
  if(compTypeOfShipHit === 2){
    carrier.push(compTypeOfShipHit);
  } else if ............

  //DETERMINING TYPE OF SHIP DESTROYED
  if(carrier.length === 5){
    ingameDisplay.innerHTML = ('You have destroyed computer\'s Aircraft Carrier!!');
    carrier = [];
  } else if ..........
  }
}
```

### Featured Piece of Code no. 2
The second piece of code is the computer fire function. I found this relatively tricky because I realised that the computer was unable to determine whether or not a square was already occupied by a hit ship. This bug also led to the computer hitting ships on the user's game boards that weren't actually there so I had to create two functions to determine first of all whether a grid square has already been hit or missed using conditional statements the computer only successfully fires if the random square it picks is either empty or hasn't been hit before.


``` JavaScript
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
}
```

## Screenshots
**User Hit**
![mvp1](battleship img/userHit.png)
**Destroyed All Ships**
![mvp1](battleship img/sunkAllShips.png)
**Computer Miss**
![mvp1](battleship img/computerMiss.png)





## Wins and Blockers

My biggest win was being able to produce a working project which people could actually play. Seeing the finished product knowing that it was the first time that I have combined CSS,HTML and Javascript to produce a working game on a browser was also a win in its own right

Another win for me was finally being able to get my logic for ship representation and ship hits functional. It took a long process of thinking before any code was actually written and it worked out rather well in the end.

My first blocker is also a win as it was overcome eventually. This was figuring out how to get the computer to know what a grid square was occupied with and if it should fire there or pick another box. This was a win because although it took me a long time the problem was eventually solved.

Overall I think the biggest blocker here was time. Initially I had so many features and designs planned but getting it all functional within a week seemed to be very problematic. I found at certain points the project was stressful as I ended up spending more time than I had planned for trying to solve certain problems.

## Bugs
Below is a list of some of the known bugs within the game:

* If player clicks/fires too fast repeatedly, computer's game play lags and can sometimes be two game plays behind the user.
* The game design isn't very responsive on mobile or tablet devices.
* When all ships of any player are destroyed the player can still continue clicking/firing as opposed to the game ending.


## Future Content

Some future content that I would potentially like to add would be:

* I would like for the user to be able place his/her ships anywhere on the board before the game starts as well as computer being able to randomly place his/her ships anywhere on the board.
* Adding difficulty levels. Allowing user pick difficulty by increasing the probability of the computer making a hit on the second go after he/she has made the a hit.
* I would like to get he health bars functional so that the bars reduce depending on which ship has been hit.
* More styling and animations(possibly sound effects) for gameplay.
* Enabling two human players to actually be able to play with each other.
