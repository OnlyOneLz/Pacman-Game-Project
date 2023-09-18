function init() {

    //! VARIABLES & ELEMENTS
    //? ELEMENTS
    //CREATE GRID
    const grid = document.querySelector('.grid')
    //console.log(grid)

    //? T VARIABLES
    //CONFIG
    const width = 20
    const height = 19
    const cellCount = width * height
    let cells = []

    //CHARACTER CONFIG
    const startingPosition = 209
    let currentPosition = 209

    //! FUNCTINS
    //CREATE GRID CELLS
    //Use the cell count to create grid cells
    for (let i = 0; i < cellCount; i++) {
        // create div cell
        const cell = document.createElement('div')
        // add index to div element
        // cell.innerText = i
        // Add index as an atribute
        cell.dataset.id = i
        // ADD height & width to each cell
        cell.style.height = `${100 / height}%`
        cell.style.width = `${100 / width}%`
        // Add cell to grid
        grid.appendChild(cell)
        // add newly created div cells to our cells array
        cells.push(cell)
    }

    // Add user Character class to starting poitions
    addPac(startingPosition)


    //? ADD CAT CLASS
    function addPac(position) {
        cells[position].classList.add('pac')
    }

    //? REMOVE CAT CLASS
    function removePac() {
        cells[currentPosition].classList.remove('pac')
    }

    //? Handle movement 
    function handleMovement(event) {
        let timer;
        $('body').keydown(function () {
            let key = event.which;
            window.clearInterval(timer);
            timer = window.setInterval(function () {
                switch (key) {
                    case 37:
                        addPac.leftMove();
                        break;
                    case 38:
                        addPac.topMove();
                        break
                    case 39:
                        addPac.rightMove();
                        break;
                    case 40:
                        addPac.bottomMove();
                        break;

                }
            }, 100);
        });

        // Remove Pac from current pos before updating currentPosition
        removePac()

        // Check which key was pressed and execute code
        if (key === up && currentPosition >= width) {
            console.log('UP')
            currentPosition -= width
        }




        else if (key === down && currentPosition + width <= cellCount - 1) {
            console.log('DOWN')
            currentPosition += width
        }



        else if (key === left && currentPosition % width !== 0) {
            console.log('LEFT')
            currentPosition--
        }



        else if (key === right && currentPosition % width !== width - 1) {
            console.log('RIGHT')
            currentPosition++
        }



        else {
            console.log('INVALID KEY')
        }

        //Add cat class once currentPostion has been updated 
        addPac(currentPosition)
    }









    //! EVENTS
    document.addEventListener('keydown',handleMovement)









    //! PAGE LOAD
    //createGrid() // create grid



}




window.addEventListener('DOMContentLoaded', init)