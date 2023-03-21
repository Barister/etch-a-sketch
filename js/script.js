// to determine some variables

let display = document.querySelector('.middle__display');

const displayResolutionWidth = display.offsetWidth;
const displayResolutionHeight = display.offsetHeight;

// test for rightclick 
let displayButton = display.addEventListener('pointerdown', event => event.button);




    
//console.log('displayButton:', displayButton);

// to disable for open context menu by right click in display
display.addEventListener('contextmenu', event => event.preventDefault());

// to clear displayGrid

//console.log('displayButton:', displayButton);

function clearGrid() {
    document.querySelectorAll('.display__row')
     
   .forEach(element => element.remove());
 
}

// to make a grid for display
function makeGrid() {
    let displayWidth = document.querySelector('.resolution__width').innerHTML;
    let displayHeight = document.querySelector('.resolution__height').innerHTML;

    for (let i = 0; i < displayHeight; i++) {
        const displayRow = document.createElement('div');
        displayRow.setAttribute('class', 'display__row');
        displayRow.style.display = 'flex';
        displayRow.style.justifyContent = 'space-between';
        displayRow.style.height = displayResolutionHeight / displayHeight + 'px';
        display.appendChild(displayRow);
        
        for (let j = 0; j < displayWidth; j++) {
            const displayElement = document.createElement('div')
            displayElement.setAttribute('class', 'display__element');
            displayElement.style.width = displayResolutionWidth / displayWidth + 'px';
            // displayElement.style.border = '1px solid black';
            displayRow.appendChild(displayElement);
            
        }
    }
}

makeGrid();

//makeHover();

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
}



// to make hover effect

function makeHover() {

    let displayElement = document.querySelectorAll('.display__element');
    let eraseSlider = document.querySelector('.clear__slider');

    // func outside to have possibility to remove it if slider.value is > 0;
    // contains condition of choosing color 

    function draw(element) {

          

        if (hoverButton.classList.contains('active')) {

            if (blackButton.classList.contains('active')){
                this.style.backgroundColor = '#000';
            }
            else if (colorButton.classList.contains('active')) {
                let randomRed = Math.floor(Math.random() * 255);
                let randomGreen = Math.floor(Math.random() * 255);
                let randomBlue =  Math.floor(Math.random() * 255);
                
                this.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
            }
            
        }
        
        element.preventDefault();
    }

    function erase(element) {
        if (hoverButton.classList.contains('active')) {
                this.style.backgroundColor = ``;
            
            
        }
    }

    function startDrawing(e) {
        console.log('element:', e);
        e.preventDefault();
            if (eraseSlider.value == 0 && e.button == 0) {
                displayElement.forEach(element => element.addEventListener('pointermove', draw))}
            else if(eraseSlider.value == 0 && e.button == 2) {
                displayElement.forEach(element => element.addEventListener('pointerdown', erase))
            }    
            
         
    }

    display.addEventListener('pointerdown', startDrawing);

    display.addEventListener('pointerup', () => {
        displayElement.forEach(element => element.removeEventListener('pointermove', draw));
        display.addEventListener('pointerdown', startDrawing);
    });

    display.addEventListener('pointerleave', () => {
        displayElement.forEach(element => element.removeEventListener('pointermove', draw));
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

let hoverButton = document.querySelector('.hover__button');
let wheelsButton = document.querySelector('.wheels__button');

function listenHoverButton() {
    if (hoverButton.classList.contains('active')) {
            rotateWheels();
            makeHover();
    }

    hoverButton.addEventListener('click', () => {
        
        if (hoverButton.classList.contains('active')) {
            rotateWheels();
            makeHover();
        }
    })
}

function listenWheelsButton() {
    wheelsButton.addEventListener('click', () => {
        if (wheelsButton.classList.contains('active')) {
            
            console.log('Houston, we have a wheels button pressed!');
                        
        }
    })
}

// to rotateWheels when pointermove above the display 

function rotateWheels() {
    

    let displayElement = document.querySelectorAll('.display__element');
    let arrayX = [];
    let arrayY = [];

    displayElement.forEach(element => element.addEventListener('pointerenter', event => {
        //console.log('движение по оси X:', event.x);
        
        arrayX.push(event.x);
        //console.log(arrayX);
        if (arrayX[(arrayX.length - 1)] > arrayX[(arrayX.length - 2)]) {
            //console.log('значение больше предыдущего');
            arrayX.shift();
            rotateLeftWheelRight();
        }
        else if (arrayX[(arrayX.length - 1)] < arrayX[(arrayX.length - 2)]){
            //console.log('значение меньше предыдущего');
            arrayX.shift();
            rotateLeftWheelLeft();
        };
        
        arrayY.push(event.y);
        //console.log(arrayY);
        if (arrayY[(arrayY.length - 1)] < arrayY[(arrayY.length - 2)]) {
            //console.log('значение больше предыдущего');
            arrayY.shift();
            rotateRightWheelRight();
        }
        else if (arrayY[(arrayY.length - 1)] > arrayY[(arrayY.length - 2)]){
            //console.log('значение меньше предыдущего');
            arrayY.shift();
            rotateRightWheelLeft();
        };

    }));
}

// functions for rotation of wheels for 5 min

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


