// to determine some variables

let display = document.querySelector('.middle__display');

const displayResolutionWidth = display.offsetWidth;
const displayResolutionHeight = display.offsetHeight;

// to display help

let helpButton = document.querySelector('.button__help');
let displayHelp = document.querySelector('.display__help');

helpButton.addEventListener('click', event => {
    console.log('Help displayed');
    if (helpButton.classList.contains('active')) {
        displayHelp.style.display = 'none';
        helpButton.classList.remove('active');
        document.querySelectorAll('.display__row').forEach(element => element.style.display = 'flex');
    }
    else {
        displayHelp.style.display = 'flex';
        helpButton.classList.add('active');
        document.querySelectorAll('.display__row').forEach(element => element.style.display = 'none');
    }
    
});

// to disable for open context menu by right click in display
display.addEventListener('contextmenu', event => event.preventDefault());

function clearGrid() {
    document.querySelectorAll('.display__row')
     
   .forEach(element => element.remove());
 
}

// to make a grid for display
let countGrids = 1;

function makeGrid() {
    let displayWidth = document.querySelector('.resolution__width').innerHTML;
    let displayHeight = document.querySelector('.resolution__height').innerHTML;
    
    countGrids = 1;

    for (let i = 0; i < displayHeight; i++) {
        const displayRow = document.createElement('div');
        displayRow.setAttribute('class', 'display__row');
        displayRow.style.display = 'flex';
        displayRow.style.justifyContent = 'space-between';
        displayRow.style.height = displayResolutionHeight / displayHeight + 'px';
        display.appendChild(displayRow);
        
        for (let j = 0; j < displayWidth; j++) {
            const displayElement = document.createElement('div')
            displayElement.setAttribute('class', `display__element cell__${countGrids}`);
            displayElement.style.width = displayResolutionWidth / displayWidth + 'px';
            //displayElement.style.border = '1px dashed black';
            displayRow.appendChild(displayElement);
            countGrids++;            
        }
    }

    //makeHover();
    //listenHoverButton();
    //listenWheelsButton();
    
}

makeGrid();


// to make slider change of grid


function sizeChange() {
    let sizeSlider = document.querySelector('.vertical__slider');
    let eraseSlider = document.querySelector('.clear__slider');
    
    let spanWidth = document.querySelector('.resolution__width');
    let spanHeight = document.querySelector('.resolution__height'); 

    spanWidth.innerHTML = sizeSlider.value;
    spanHeight.innerHTML = sizeSlider.value / 16 * 9;
    
    eraseSlider.setAttribute('max', sizeSlider.value);

    // to return eraseSlide on the left;
    if (eraseSlider.value > 0) {
        eraseSlider.value = 0;
    }

    clearGrid();
    makeGrid();
    listenHoverButton();
    listenWheelsButton();
}



// to draw by mouse in hover mode

function makeHover() {

    let displayElement = document.querySelectorAll('.display__element');
    let eraseSlider = document.querySelector('.clear__slider');

    // func to have possibility to remove drawings if eraseSlider.value is > 0;
    // contains condition for choosing color 

    // let countDraw = 0;
    function draw(element) {
        element.preventDefault();
        
        // countDraw++;
        // console.log('draw: что такое this:', this);
        // console.log('draw: что такое element:', element);
        // console.log('draw: что такое event:', event);
        // console.log('сработала func draw раз:', countDraw);

        if (hoverButton.classList.contains('active')) {

            if (blackButton.classList.contains('active')){
                this.style.backgroundColor = '#000';
            }
            else if (colorButton.classList.contains('active')) {
                let randomRed = Math.floor(Math.random() * 255);
                let randomGreen = Math.floor(Math.random() * 255);
                let randomBlue =  Math.floor(Math.random() * 255);
                
                // to try mode to make colours darker after another pointerenter
                if (this.style.backgroundColor && this.style.backgroundColor != '#000') {
                                                      
                    let rgbArray = this.style.backgroundColor.match(/\d+/g);
                                        
                    let darkerRGBArray = [];

                    rgbArray.forEach(e => {
                        if (e / 10 > 0) {
                            e -= 25;
                            
                            if (e < 0) {
                                e = 0;
                            }
                        }
                        darkerRGBArray.push(e);
                    })

                    this.style.backgroundColor = `rgb(${darkerRGBArray[0]},${darkerRGBArray[1]},${darkerRGBArray[2]})`;

                } else {
                this.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`; 
                }
            
            }
            
            
        }    
        
    }

    // func to erase display element

    //let countErase = 0;

    function erase(element) {
        element.preventDefault();
        
        // countErase++;
        // console.log('функция erase сработала раз:', countErase);

        if (hoverButton.classList.contains('active') && element.button === 2) {
                this.style.backgroundColor = ``;
        }
    }

    let countStartDrawing = 0;

    function startDrawing(e) {
        
        e.preventDefault();
        countStartDrawing++;
        // console.log('e.target внутри starDrawing:', e.target);
        // console.log('e.which внутри starDrawing:', e.which);
        // console.log('starDrawing сработала раз:', countStartDrawing);
            if (eraseSlider.value == 0 && e.which === 1) {
                displayElement.forEach(element => element.addEventListener('pointerdown', draw));
                displayElement.forEach(element => element.addEventListener('pointerenter', draw));
            }
            else if(eraseSlider.value == 0 && e.which === 3) {
                displayElement.forEach(element => element.addEventListener('pointerdown', erase));
            }    
            
         
    }

    // eventlisteners for mouse and touch down to draw
    
    display.addEventListener('pointerdown', startDrawing);
    
    //crazy fix for drawing by the first click 

    display.addEventListener('pointerdown', event => {
        //console.log('event внутри pointerdown', event.target.closest('.display__element'));

        let eventTarget = event.target.closest('.display__element');
        if (eventTarget && event.which === 1 && eraseSlider.value == 0) {

            if (hoverButton.classList.contains('active')) {

                if (blackButton.classList.contains('active')){
                    eventTarget.style.backgroundColor = '#000';
                }
                else if (colorButton.classList.contains('active')) {
                    let randomRed = Math.floor(Math.random() * 255);
                    let randomGreen = Math.floor(Math.random() * 255);
                    let randomBlue =  Math.floor(Math.random() * 255);
                    
                    // to try mode to make colours darker after another pointerenter
                    if (eventTarget.style.backgroundColor && eventTarget.style.backgroundColor != '#000') {
                                                          
                        let rgbArray = eventTarget.style.backgroundColor.match(/\d+/g);
                                            
                        let darkerRGBArray = [];
    
                        rgbArray.forEach(e => {
                            if (e / 10 > 0) {
                                e -= 25;
                                
                                if (e < 0) {
                                    e = 0;
                                }
                            }
                            darkerRGBArray.push(e);
                        })
    
                        eventTarget.style.backgroundColor = `rgb(${darkerRGBArray[0]},${darkerRGBArray[1]},${darkerRGBArray[2]})`;
    
                    } else {
                    eventTarget.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`; 
                    }
                
                }
                
                
            }  
        }
        else if (eventTarget && hoverButton.classList.contains('active') && event.which === 3) {
            eventTarget.style.backgroundColor = ``;
        }
    });

    display.addEventListener('pointerup', () => {

        //console.log('сработал обработчик pointerup');

        displayElement.forEach(element => element.removeEventListener('pointerenter', draw));
        
        display.addEventListener('pointerdown', startDrawing);
    });

    display.addEventListener('pointerleave', () => {
        //console.log('сработал обработчик pointerleave');
        displayElement.forEach(element => element.removeEventListener('pointerenter', draw));
    });
}



// to erase display by eraseSlider

function eraseDisplay() {
    let eraseSlider = document.querySelector('.clear__slider');
    let max = eraseSlider.getAttribute('max') / 1;
    let displayElement = document.querySelectorAll('.display__element');
    let displayWidth = document.querySelector('.resolution__width').innerHTML / 1;
    let displayHeight = document.querySelector('.resolution__height').innerHTML / 1;
        
    if (eraseSlider.value > 0) {
        
        for (let i = 0; i < eraseSlider.value; i ++) {
            let j = i;
          
            do {
                displayElement[j].style.backgroundColor = '';
                j += max;
            } while (j < displayWidth * displayHeight);
        }
        

    }
    
}

// to toggle active buttons

let bottomLeftButtons = document.querySelectorAll('.bottom__left button');
let bottomRightButtons = document.querySelectorAll('.bottom__right button');

function toggleActive(buttons) {
    buttons.forEach(e => {
        
        e.addEventListener('click', 
        
        function(event) {
            let clickedButton = this;
            
            //to take clicked element and compare with buttons array element
            buttons.forEach(button => {
                if (clickedButton != button) {
                    button.classList.remove('active');
                }
                else if (clickedButton.classList.contains('active')) {
                    clickedButton.classList.remove('active')
                }
                else {
                    clickedButton.classList.add('active');
                }
            })

            event.preventDefault();
        })
    })
}


toggleActive(bottomLeftButtons);
toggleActive(bottomRightButtons);



// to make buttons about color

let blackButton = document.querySelector('.black__button');
let colorButton = document.querySelector('.color__button');


// to make wheels rotation

// easy mode to repeat mouse moves

let hoverButton = document.querySelector('.hover__button');
let wheelsButton = document.querySelector('.wheels__button');

function listenHoverButton() {
    if (hoverButton.classList.contains('active')) {
            rotateWheels();
            
            makeHover();
    }

    hoverButton.addEventListener('click', () => {
        
        if (hoverButton.classList.contains('active')) {
            clearGrid();
            makeGrid();
            makeHover();
        }
    })
}

// to rotateWheels in hoverMode when pointermove above the display made with ChatGPT.

function rotateWheels() {
    let displayElement = document.querySelectorAll('.display__element');
    let arrayX = [];
    let arrayY = [];

    let pointerDown = false;
    let pointerEnter = false;

    function rotate() {
        arrayX.push(event.x);
        if (arrayX[(arrayX.length - 1)] > arrayX[(arrayX.length - 2)]) {
            arrayX.shift();
            rotateLeftWheelRight();
        }
        else if (arrayX[(arrayX.length - 1)] < arrayX[(arrayX.length - 2)]) {
            arrayX.shift();
            rotateLeftWheelLeft();
        }

        arrayY.push(event.y);
        if (arrayY[(arrayY.length - 1)] < arrayY[(arrayY.length - 2)]) {
            arrayY.shift();
            rotateRightWheelRight();
        }
        else if (arrayY[(arrayY.length - 1)] > arrayY[(arrayY.length - 2)]) {
            arrayY.shift();
            rotateRightWheelLeft();
        }
    }

    function checkIfBothEventsHappened() {
        if (pointerDown && pointerEnter) {
            displayElement.forEach(element => element.addEventListener('pointerenter', rotate));
            pointerDown = false;
            pointerEnter = false;
        }
    }

    display.addEventListener('pointerdown', function(event) {
        pointerDown = true;
        checkIfBothEventsHappened();
    });

    display.addEventListener('pointerenter', function(event) {
        pointerEnter = true;
        checkIfBothEventsHappened();
    });

    display.addEventListener('pointerup', function(event) {
        pointerDown = false;
        pointerEnter = false;
        displayElement.forEach(element => element.removeEventListener('pointerenter', rotate));
    });

    displayElement.forEach(element => element.addEventListener('pointerenter', function(event) {
        if (pointerDown) {
            rotate();
        }
    }));
}

// functions for rotation of wheels for 5 mins (deg)

function rotateLeftWheelRight() {
    let leftWheel = document.querySelector('.left__wheel');
    leftWheel.classList.add('rotateRight15deg');

    leftWheel.addEventListener('animationend', event => {leftWheel.classList.remove('rotateRight15deg')});

        
}

function rotateLeftWheelLeft() {
    let leftWheel = document.querySelector('.left__wheel');
    leftWheel.classList.add('rotateLeft15deg');

    leftWheel.addEventListener('animationend', event => {leftWheel.classList.remove('rotateLeft15deg')});
}


function rotateRightWheelRight() {
    let rightWheel = document.querySelector('.right__wheel');
    rightWheel.classList.add('rotateRight15deg');

    rightWheel.addEventListener('animationend', event => {rightWheel.classList.remove('rotateRight15deg')});
     
}

function rotateRightWheelLeft() {
    let rightWheel = document.querySelector('.right__wheel');
    rightWheel.classList.add('rotateLeft15deg');

    rightWheel.addEventListener('animationend', event => {rightWheel.classList.remove('rotateLeft15deg')});
}

listenHoverButton();
listenWheelsButton();

// hard mode to draw by wheels
let firstStart = false;

if (wheelsButton.classList.contains('active')){
    firstStart = true;

    listenWheelsButton();
}

function listenWheelsButton() {
    wheelsButton.addEventListener('click', function () {
        clearGrid();
        makeGrid();
        if (wheelsButton.classList.contains('active')) {
            firstStart = true;
            
            console.log('Houston, we have a wheels button pressed!');
            console.log('firstStart:', firstStart);

            toDetermineStartCell();
            toStartWheelsMode();            
        }
        
    });
}

// big part about drawing by wheels mode

// to determine a cell to start drawing
let startCell;
let activeCell;

function toDetermineStartCell() {
    if (firstStart) {
        startCell = display.querySelector(`.cell__${Math.floor(Math.random() * countGrids)}`);
        //console.log('startCell:', startCell);

        activeCell = startCell;
        console.log('activeCell:', activeCell);
    }
}




function toStartWheelsMode() {
    let leftWheel = document.querySelector('.left__wheel');
    let rightWheel = document.querySelector('.right__wheel');
    
    let leftWheelAngle = 0;
    let rightWheelAngle = 0;

    function rotateLeftWheel(angle) {
        leftWheel.style.transform = `rotate(${angle}deg)`;
        console.log('leftWheelAngle:', angle);
    }

    function rotateRightWheel(angle) {
        rightWheel.style.transform = `rotate(${angle}deg)`;
        console.log('rightWheelAngle:', angle);
    }

    function toDraw(cell) {
        if (blackButton.classList.contains('active')){
            cell.style.backgroundColor = '#000';
        }
        else if (colorButton.classList.contains('active')) {
            let randomRed = Math.floor(Math.random() * 255);
            let randomGreen = Math.floor(Math.random() * 255);
            let randomBlue =  Math.floor(Math.random() * 255);
            
            // to try mode to make colours darker after another pointerenter
            if (cell.style.backgroundColor && cell.style.backgroundColor != '#000') {
                                                  
                let rgbArray = cell.style.backgroundColor.match(/\d+/g);
                                    
                let darkerRGBArray = [];

                rgbArray.forEach(e => {
                    if (e / 10 > 0) {
                        e -= 25;
                        
                        if (e < 0) {
                            e = 0;
                        }
                    }
                    darkerRGBArray.push(e);
                })

                cell.style.backgroundColor = `rgb(${darkerRGBArray[0]},${darkerRGBArray[1]},${darkerRGBArray[2]})`;

            } else {
            cell.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`; 
            }
        
        }
    }

    document.addEventListener('keydown', event => {
        //activeCell.style.backgroundColor = '#000';
        switch (event.code) {
            case 'KeyA':
                leftWheelAngle -= 10;
                rotateLeftWheel(leftWheelAngle);
                let leftCell = activeCell.previousElementSibling;
                if (leftCell) {
                    toDraw(leftCell);
                    //leftCell.style.backgroundColor = '#000';
                    activeCell = leftCell;
                }
                break;
            case 'KeyZ':
                leftWheelAngle += 10;
                rotateLeftWheel(leftWheelAngle);
                let rightCell = activeCell.nextElementSibling;
                if (rightCell) {
                    toDraw(rightCell);
                    //rightCell.style.backgroundColor = '#000';
                    activeCell = rightCell;
                }
                break;
            case 'KeyK':
                rightWheelAngle += 10;
                rotateRightWheel(rightWheelAngle);
                
                let parentRow = activeCell.parentElement;
                let count = Array.from(parentRow.children).indexOf(activeCell);
                let upperRow = parentRow.previousElementSibling;
                let upperCell = upperRow.children[count];
                if (upperCell) {
                    toDraw(upperCell);
                    //upperCell.style.backgroundColor = '#000';
                    activeCell = upperCell;
                }
                break;
            case 'KeyM':
                rightWheelAngle -= 10;
                rotateRightWheel(rightWheelAngle);
                
                
                let lowerRow = activeCell.parentElement.nextElementSibling;
                let lowerCell = lowerRow.children[Array.from(activeCell.parentElement.children).indexOf(activeCell)];
                if (lowerCell) {
                    toDraw(lowerCell);
                    //lowerCell.style.backgroundColor = '#000';
                    activeCell = lowerCell;
                }
                break;
            default:
                break;
            
        }
    });


    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    

    // document.addEventListener('pointerdown', event => {
    //     event.preventDefault();
    //     if (event.button === 0) {
    //         isMouseDown = true;
    //         lastMouseX = event.clientX;
    //         lastMouseY = event.clientY;
    //     }
    // });

    leftWheel.addEventListener('pointerdown', event => {
        event.preventDefault();
        if (event.button === 0) {
            isMouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    });

    rightWheel.addEventListener('pointerdown', event => {
        event.preventDefault();
        if (event.button === 0) {
            isMouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    });

    document.addEventListener('pointerup', event => {
        if (event.button === 0) {
            isMouseDown = false;
        }
    });

    leftWheel.addEventListener('pointermove', event => {
        event.preventDefault();
        if(isMouseDown) {
            let deltaX = event.clientX - lastMouseX;
            
            leftWheelAngle += deltaX;
         
            rotateLeftWheel(leftWheelAngle);
       
            lastMouseX = event.clientX;
       
        }
    });

    rightWheel.addEventListener('pointermove', event => {
        event.preventDefault();
        if(isMouseDown) {
            //let deltaX = event.clientX - lastMouseX;
            let deltaY = event.clientY - lastMouseY;
            //leftWheelAngle += deltaX;
            rightWheelAngle += deltaY;
            //rotateLeftWheel(leftWheelAngle);
            rotateRightWheel(rightWheelAngle);
            //lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    });
}