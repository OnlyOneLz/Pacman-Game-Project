
function init() {

  // CONSTS
  const width = 20
  const height = 21
  const cellCount = width * height
  const ghostsNextMove = ['up', 'down', 'left', 'right'];
  const startingPosition = 229
  const walls = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    , 29, 30, 40, 42, 43, 45, 46, 47, 49, 50, 52, 53, 54, 56, 57, 60,
    80, 82, 83, 85, 87, 88, 89, 90, 91, 92, 94, 96, 97, 100, 105, 109,
    110, 114, 120, 121, 122, 123, 125, 126, 127, 129, 130, 132, 133,
    134, 136, 137, 138, 140, 143, 145, 154, 156, 160, 161, 162, 163,
    165, 167, 168, 171, 172, 174, 176, 177, 178, 180, 187, 192, 200,
    201, 202, 203, 205, 207, 208, 211, 212, 214, 216, 217,
    218, 220, 223, 225, 234, 236, 240, 241, 242, 243, 245, 247, 248,
    249, 250, 251, 252, 254, 256, 257, 258, 260, 269, 270, 280, 282,
    283, 285, 286, 287, 289, 290, 292, 293, 294, 296, 297, 300, 303,
    316, 321, 323, 325, 327, 328, 329, 330, 331, 332, 334, 336, 338,
    345, 349, 350, 354, 362, 363, 364, 365, 366, 367, 369, 370, 372,
    373, 374, 375, 376, 377, 377, 320, 340, 360, 380, 400, 39, 59, 79,
    99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359,
    379, 399, 419, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
    412, 413, 414, 415, 416, 417, 418, 141, 142, 157, 158, 221, 222, 237, 238, 188, 191, 209, 210, 169, 170];
  const myAudio = new Audio("./audio/PacMan.mp3");
  // ELEMENTS
  const winner = document.querySelector('#winnerS');
  let scoreboard = document.getElementById('scoreboard');
  let lives = document.getElementById('lives')
  const tryAgainBtn = document.getElementById('tryAgainBtn')
  const grid = document.querySelector('.grid');
  const buttonContainer = document.getElementById('buttonContainer');
  const gameOverAudio = document.getElementById('gameOverAudio');
  const backgroundAudio = document.getElementById('backgroundAudio');

  // LETS
  let cells = []
  let timer
  let score = 0;
  let lifeCount = 3;
  let direction
  let currentPosition = startingPosition;

  // INITIALISE LIVES & SCOREBOARD
  lives.innerHTML = (`Lives: ${lifeCount}`)
  scoreboard.innerHTML = (`Your score: ${score}`)

  // HELPER FUNCTIONS
  

  document.getElementById('playBtn').addEventListener('click', () => {
    myAudio.play();
  })
  document.getElementById('pauseBtn').addEventListener('click', () => {
    myAudio.pause();
  })
  document.getElementById('stopBtn').addEventListener('click', () => {
    myAudio.pause();
    myAudio.currentTime = 0;
  })
  document.getElementById('volumeSlider').addEventListener('input', () => {
    myAudio.volume = volumeSlider.value;
  })

  function playGameOverAudio() {
    gameOverAudio.play();
  }

  function loseGame(lifeCount) {
    if (lifeCount === 0) {
      console.log('hell')
      clearIntervalAllGhostMoves();
      clearInterval(timer);
      tryAgainBtn.style.display = 'flex';
      buttonContainer.style.justifyContent = 'center'
      playGameOverAudio();
      resetPacMan();
    }
  }

  function resetPacMan() {
    removePac(); // Remove Pac class from the current position
    currentPosition = startingPosition; // Reset current position to the starting position
    addPac(currentPosition);
  }

  function addCoins() {
    const coins = [];
    for (let i = 0; i < cells.length; i++) {
      if (!walls.includes(i)) {
        // Exclude cells 181, 189, 190, and 198 from having coins
        if (![229, 181, 189, 190, 198].includes(i)) {
          const newCoin = document.getElementById(`${i}`);
          newCoin.classList.add('coin');
        }
      }
    }
  }


  function clearIntervalAllGhostMoves() {
    ghostMoveIntervals.forEach(intervalId => {
      clearInterval(intervalId);
    });
    ghostMoveIntervals.length = 0;
  }

  // Define an array of ghost objects
  const ghosts = [
    { name: 'red', currentPos: 189 },
    { name: 'blue', currentPos: 189 },
    { name: 'pink', currentPos: 190 },
    { name: 'orange', currentPos: 190 }
  ];

  // Initialize ghost movements
  const ghostMoveIntervals = [];

  // Create a function to handle ghost movements
  function moveGhost(ghost) {
    const direction = ghostsNextMove[Math.floor(Math.random() * ghostsNextMove.length)];

    // Remove the ghost from its current position
    removeGhost(ghost.name);

    // Calculate the new position based on direction
    let newPos;
    if (direction === 'right' && !walls.includes(ghost.currentPos + 1)) {
      newPos = ghost.currentPos + 1;
    } else if (direction === 'left' && !walls.includes(ghost.currentPos - 1)) {
      newPos = ghost.currentPos - 1;
    } else if (direction === 'down' && !walls.includes(ghost.currentPos + width)) {
      newPos = ghost.currentPos + width;
    } else if (direction === 'up' && !walls.includes(ghost.currentPos - width)) {
      newPos = ghost.currentPos - width;
    } else {
      newPos = ghost.currentPos;
    }

    // Update the ghost's current position
    ghost.currentPos = newPos;

    // Add the ghost to its new position
    addGhost(ghost.name, ghost.currentPos);

    // Check if the ghost touches Pac-Man
    if (cells[ghost.currentPos].classList.contains('pac', 'pac-up', 'pac-down', 'pac-right', 'pac-left')) {
      resetPacMan();
      lifeCount--;
      loseGame(lifeCount);
      lives.innerHTML = `Lives: ${lifeCount}`;
    }
  }

  // Start ghost movements
  ghosts.forEach(ghost => {
    const intervalId = setInterval(() => moveGhost(ghost), 300);
    ghostMoveIntervals.push(intervalId);
  });

  // Function to remove a ghost from a cell
  function removeGhost(ghostName) {
    const ghostCell = document.querySelector(`.${ghostName}`);
    if (ghostCell) {
      ghostCell.classList.remove(ghostName);
    }
  }

  // Function to add a ghost to a cell
  function addGhost(ghostName, position) {
    const ghostCell = document.getElementById(position);
    if (ghostCell) {
      ghostCell.classList.add(ghostName);
    }
  }
  // EVENT LISTENERS

  document.addEventListener('keyup', handleDirection)
  tryAgainBtn.addEventListener('click', () => {
    // reload the page
    location.reload();
  });

  // CREATE GRID CELLS

  // Use the cell count to create grid cells
  for (let i = 0; i < cellCount; i++) {
    // create div cell
    const cell = document.createElement('div')

    //? Map and create class walls

    walls.map((wall) => {
      if (wall === i)
        cell.classList.add('wall')
    })


    // Add index to div element
    // cell.innerText = i

    // Add index as an atribute
    cell.id = i
    // Add height & width to each cell
    cell.style.height = `${100 / height}%`
    cell.style.width = `${100 / width}%`
    // Add cell to grid
    grid.appendChild(cell)
    // Ddd newly created div cells to our cells array
    cells.push(cell)
  }

  addCoins()

  // Add user Character class to starting poitions
  addPac(startingPosition)


  // Add Pac class
  function addPac(position) {
    cells[position].classList.add('pac')
  }

  // Remove Pac class
  function removePac() {
    cells[currentPosition].classList.remove('pac', 'pac-up', 'pac-right', 'pac-down', 'pac-left');
  }

  // Function to change Pac-Man's direction
  function changePacDirection(direction) {
    // Remove existing direction classes
    cells[currentPosition].classList.remove('pac-up', 'pac-right', 'pac-down', 'pac-left');

    // Add the corresponding direction class
    cells[currentPosition].classList.add(`pac-${direction}`);
  }
  // Handle direction

  function handleDirection(event) {
    const key = event.keyCode
    const up = 87
    const down = 83
    const left = 65
    const right = 68

    // Clear timer interval so moving in one direction at a time
    clearInterval(timer)
    // Set timer so pac-man moves constantly in a direction 
    timer = setInterval(() => {

      // Remove Pac from current pos before updating currentPosition
      removePac()

      // Check which key was pressed and execute code
      if (key === up && walls.includes(currentPosition - 20) === false) {
        console.log('UP')
        direction = 'up'
        currentPosition -= width
      } else if (key === down && walls.includes(currentPosition + 20) === false) {
        console.log('DOWN')
        direction = 'down'
        currentPosition += width
      } else if (key === left && walls.includes(currentPosition - 1) === false) {
        console.log('LEFT')
        direction = 'left'
        currentPosition--
      } else if (key === right && walls.includes(currentPosition + 1) === false) {
        console.log('RIGHT')
        direction = 'right'
        currentPosition++
      } else { }
      if (currentPosition === 198) {
        currentPosition = 181;
        key = right
      } else if (currentPosition === 181) {
        currentPosition = 198;
        key = left
      }
      if (currentPosition === 228 || currentPosition === 230) {
        removeBar()
      }

      //Add Pac class once currentPostion has been updated 
      addPac(currentPosition)

      // remove coin after pacman has entered the cell
      coinRemove()

      changePacDirection(direction)

      // how many miliseconds interval between movement
    }, 200)

    myAudio.play();

    function removeBar() {
      const index1 = walls.indexOf(169);
      const index2 = walls.indexOf(170);
      if (index1 !== -1) {
        walls.splice(index1, 1); // Remove the element at index1
      }
      if (index2 !== -1) {
        walls.splice(index2, 1); // Remove the element at index2
      }
    }
    // remove coin after pacman has entered the cell
    function coinRemove() {
      const pacCell = document.getElementById(currentPosition)
      if (pacCell.classList.contains('coin')) {
        pacCell.classList.remove('coin')
        score += 10
        scoreboard.innerHTML = (`your score: ${score}`)
        gameWon()
      }
    }

    //Game won function
    function gameWon() {
      if (score === 1850) {
        tryAgainBtn.innerHTML = ('To play again click here!')
        clearIntervalAllGhostMoves();
        clearInterval(timer);
        resetPacMan()
        winner.innerHTML = (`Congratulations you Won!`)
        tryAgainBtn.style.display = 'block';
        winner.style.display = 'block';
      }
    }
  }
  // EVENTS LISTENERS
  document.addEventListener('keyup', handleDirection)
  tryAgainBtn.addEventListener('click', () => {
    // reload the page
    location.reload();
  });
}


window.addEventListener('DOMContentLoaded', init)