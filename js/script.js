// to determine some variables

let display = document.querySelector('.middle__display');

const displayResolutionWidth = display.offsetWidth;
const displayResolutionHeight = display.offsetHeight;



// to clear displayGrid

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
                this.style.backgroundColor = 'yellow';
            }
        }
        
        element.preventDefault();
    }

    function startDrawing(e) {
        
            if (eraseSlider.value == 0) {
                displayElement.forEach(element => element.addEventListener('mousemove', draw))}
                 
            e.preventDefault();
         
    }

    display.addEventListener('mousedown', startDrawing);

    display.addEventListener('mouseup', () => {
        displayElement.forEach(element => element.removeEventListener('mousemove', draw));
        display.addEventListener('mousedown', startDrawing);
    });

    display.addEventListener('mouseleave', () => {
        displayElement.forEach(element => element.removeEventListener('mousemove', draw));
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
        //console.log('eraseSlider inside eraseDisplay:', eraseSlider);
        //console.log('eraseSlider.value inside eraseDisplay:', eraseSlider.value);
        for (let i = 0; i < eraseSlider.value; i ++) {
            let j = i;
          
            do {
                displayElement[j].style.backgroundColor = '';
                j += max;
            } while (j < displayWidth * displayHeight);
        }
        // console.log('Запускаем из eraseDisplay новый makeHover()');
        // makeHover();

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

//console.log(hoverButton.classList.contains('active'));
//console.log(wheelsButton.classList.contains('active'));

function listenHoverButton() {
    if (hoverButton.classList.contains('active')) {
        console.log('Houston, we have a hover button pressed in download!');
            makeHover();
    }

    hoverButton.addEventListener('click', () => {
        //console.log('e:', this);
        if (hoverButton.classList.contains('active')) {
            console.log('Houston, we have a hover button pressed inside EventListener!');
            makeHover();
        }
    })
}

function listenWheelsButton() {
    wheelsButton.addEventListener('click', () => {
        if (wheelsButton.classList.contains('active')) {
            console.log('Houston, we have a wheels button pressed!');
            makeWheels();
            ;
        }
    })
}


function makeWheels() {
    console.log('makeWheels great again!');
}


listenHoverButton();
listenWheelsButton();

//console.log('listenHoverButton():', listenHoverButton());
//console.log('listenWheelsButton():', listenWheelsButton());

