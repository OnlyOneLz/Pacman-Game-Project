function init() {

    //! ELEMENTS
    //CREATE GRID
    const grid = document.querySelector('.grid');

    //! VARIABLES
    //CONFIG
    const width = 20
    const height = 21
    const cellCount = width * height
    let cells = []
    let timer
    const walls = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        , 29, 30, 40, 42, 43, 45, 46, 47, 49, 50, 52, 53, 54, 56, 57, 60,
        80, 82, 83, 85, 87, 88, 89, 90, 91, 92, 94, 96, 97, 100, 105, 109,
        110, 114, 120, 121, 122, 123, 125, 126, 127, 129, 130, 132, 133,
        134, 136, 137, 138, 140, 143, 145, 154, 156, 160, 161, 162, 163,
        165, 167, 168, 171, 172, 174, 176, 177, 178, 180, 187, 192, 200,
        201, 202, 203, 205, 207, 208, 209, 210, 211, 212, 214, 216, 217,
        218, 220, 223, 225, 234, 236, 240, 241, 242, 243, 245, 247, 248,
        249, 250, 251, 252, 254, 256, 257, 258, 260, 269, 270, 280, 282,
        283, 285, 286, 287, 289, 290, 292, 293, 294, 296, 297, 300, 303,
        316, 321, 323, 325, 327, 328, 329, 330, 331, 332, 334, 336, 338,
        345, 349, 350, 354, 362, 363, 364, 365, 366, 367, 369, 370, 372,
        373, 374, 375, 376, 377, 377, 320, 340, 360, 380, 400, 39, 59, 79,
        99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359,
        379, 399, 419, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
        412, 413, 414, 415, 416, 417, 418, 141, 142, 157, 158, 221, 222, 237, 238];
    

    //CHARACTER CONFIG
    const startingPosition = 229
    let currentPosition = 229

    //! FUNCTIONS

    //? CREATE GRID CELLS

    // Use the cell count to create grid cells
    for (let i = 0; i < cellCount; i++) {
        // create div cell
        const cell = document.createElement('div')

        //? Map and create class walls

        walls.forEach((wall) => {
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
    
    function addCoins(){
        const coins = []
        for (let i = 0; i < cells.length; i++)
        if (!walls.includes(i)){
            const newCoin = document.getElementById(`${i}`)   
                   newCoin.classList.add('coin')
            console.log(newCoin)
        }

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
        cells[currentPosition].classList.remove('pac')
    }

    //? Handle Direction

    function handleDirection(event) {
        const key = event.keyCode
        const up = 38
        const down = 40
        const left = 37
        const right = 39

        // Clear timer interval so moving in one direction at a time
        clearInterval(timer)
        // Set timer so pac-man moves constantly in a direction 
        timer = setInterval(() => {

            // Remove Pac from current pos before updating currentPosition
            removePac()

            // Check which key was pressed and execute code
            if (key === up && walls.includes(currentPosition - 20) === false) {
                console.log('UP')
                currentPosition -= width
            } else if (key === down && walls.includes(currentPosition + 20) === false) {
                console.log('DOWN')
                currentPosition += width
            } else if (key === left && walls.includes(currentPosition - 1) === false) {
                console.log('LEFT')
                currentPosition--
            } else if (key === right && walls.includes(currentPosition + 1) === false) {
                console.log('RIGHT')
                currentPosition++
            } else {
                console.log('INVALID KEY')

            }

            //Add Pac class once currentPostion has been updated 
            addPac(currentPosition)

             // remove coin after pacman has entered the cell

            coinRemove()

            // how many miliseconds interval between movement
        }, 500)

    }

     // remove coin after pacman has entered the cell
    function coinRemove(){
     const coinCell = document.getElementById(currentPosition)
     if (coinCell.classList.contains('coin')){
         coinCell.classList.remove('coin')
     }
    }
 
    

    

    









    //! EVENTS
    document.addEventListener('keyup', handleDirection)









    //! PAGE LOAD
    //createGrid() // create grid





}


window.addEventListener('DOMContentLoaded', init)