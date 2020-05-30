document.addEventListener('DOMContentLoaded', () => {
    // Load the grid
    const grid = document.querySelector('.grid');
    // Transform all divs into an array of 200 elements
    let squares = Array.from(grid.querySelectorAll('div'));
    const span = document.getElementsByClassName('close')[0];
    const hamburgerBtn = document.querySelector('.toggler');
    const menu = document.querySelector('.menu');
    const scoreDisplay = document.querySelector('#score');
    const linesDisplay = document.querySelector('.lines-score');
    const funcButton = document.querySelector('#func-button');

    // Declare tetromino width
    const width = 10;
    // random var
    let nextRandom = 0;
    let timerId;
    let score = 0;
    let lineScore = 0;
    const backgroundImages = [
        'url(images/blue_block.png)',
        'url(images/pink_block.png)',
        'url(images/purple_block.png)',
        'url(images/peach_block.png)',
        'url(images/yellow_block.png)'
    ];

    // Declare Tetrominoes and their possbile shapes
    // L-Tetromino
    const lTetro = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];
    // Square Tetromino
    const squareTetro = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];
    // Skew Tetromino
    const skewTetro = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ];

    // T-Tetromino
    const tTetro = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    // Straight Tetromino
    const straightTetro = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const tetrominoes = [lTetro, skewTetro, tTetro, squareTetro, straightTetro ];

    // New tetro falling
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random()*tetrominoes.length);
    let current = tetrominoes[random][currentRotation]


    // // Randomly select tetro type and its first rotation
    // let random = Math.floor(Math.random()*tetrominoes.length);
    // let current = tetrominoes[random][currentRotation]

    // Add tetromino to the DOM
    function addTetro() {
        current.forEach(index => {
            // Add class to divs
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundImage = backgroundImages[random];
        })
    }

    // Remove tetromino from the DOM
    function removeTetro() {
        current.forEach(index => {
            // Remove class from div
            squares[currentPosition + index].classList.remove('tetromino');
            squares[currentPosition + index].style.backgroundImage = 'none';
        }) 
    }

    // Assign function to interact with keyCodes
    function control(e) {
        switch(e.keyCode) {
            case 37:
                moveLeft();
                break;
            case 38:
                rotate();
                break;
            case 39:
                moveRight();
                break;
            case 40:
                moveDown();
                break;
        }
    }
    // Add event listener
    document.addEventListener('keyup', control)

    // move the tetro to left, unless it is at the edge or encounters a blockage
    function moveLeft() {
        removeTetro();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        addTetro();
    }

    // Rotate the tetromino
    function rotate() {
        removeTetro();
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = tetrominoes[random][currentRotation];
        currentRotation += 1;
        addTetro();
    }

    // Move the tetromino to the right
    function moveRight() {
        removeTetro();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if(!isAtRightEdge) currentPosition += 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        addTetro();
    }

    // Move the tetro down
    function moveDown() {
        removeTetro();
        currentPosition += width;
        addTetro();
        freeze();
    }

    // Freeze the tetro
    function freeze() {
        console.log(currentPosition)
        // If the next div is already taken, freeze the current tetro at its place
        if(current.some(index => squares[currentPosition + index + width].classList.contains('bottom') || squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('taken'))
            // start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random()*tetrominoes.length);
            current = tetrominoes[random][currentRotation];
            currentPosition = 4;
            addTetro();
            displayNextTetro();
            addScore();
            gameOver();
        }
    }
    freeze();

    // show the upcoming tetro in a mini display
    const nextSquares = document.querySelectorAll('.mini-grid div');
    const nextWidth = 4;
    const nextIndex = 0;

    const nextTetrominoes = [
        [1, nextWidth+1, nextWidth*2 + 1, 2 ], // L-Tetromino
        [0, nextWidth, nextWidth + 1, nextWidth*2+1], //Skew Tetromino
        [1, nextWidth, nextWidth + 1, nextWidth + 2], // T-Tetromino
        [0, 1, nextWidth, nextWidth + 1], // Square Tetromino
        [1, nextWidth + 1, nextWidth*2+1, nextWidth*3+1] // Straight Tetromino
    ];


    // Get the shape of next tetro
    function displayNextTetro() {
        nextSquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundImage = 'none';
        });
        nextTetrominoes[nextRandom].forEach(index => {
            nextSquares[nextIndex + index].classList.add('tetromino');
            nextSquares[nextIndex + index].style.backgroundImage = backgroundImages[nextRandom];
        })
    };

    // Add functionality for func button
    funcButton.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } 
        else {
            addTetro();
            // Get the current score and adjust the speed based on current score
            const numScore = parseInt(scoreDisplay.innerHTML);
            const currentScore = numScore > 0 ? numScore : 10;
            timerId = setInterval(moveDown, currentScore*100);
            nextRandom = Math.floor(Math.random()*tetrominoes.length);
            displayNextTetro();
        }
    })

    // Add score
    function addScore() {
        for(let i = 0; i < 199; i += width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            // Use the every method to check if every div is taken
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                lineScore += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lineScore;
                row.forEach(index => {
                    squares[index].classList.remove('taken') || squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundImage = 'none';
                })
                // Concat the remaining squares to the removed square
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    // game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = 'Game Over';
            clearInterval(timerId);
        }
    }

  //Menu eventListeners
  hamburgerBtn.addEventListener('click', () => {
    menu.style.display = 'flex'
  })
  span.addEventListener('click', () => {
    menu.style.display = 'none'
  })

})