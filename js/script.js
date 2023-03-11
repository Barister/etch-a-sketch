// to determine some variables

const display = document.querySelector('.middle__display');

const displayResolutionWidth = display.offsetWidth;
const displayResolutionHeight = display.offsetHeight;



console.log('display.children:', display.children);

// to clear displayGrid

function clearGrid() {
    document.querySelectorAll('.display__row')
     
   .forEach(element => element.remove());
 
}

// to make a grid for display
function makeGrid() {
    let displayWidth = document.querySelector('.resolution__width').innerHTML / 1;
    let displayHeight = document.querySelector('.resolution__height').innerHTML / 1;

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
makeHover()

// to make slider change of grid


function sizeChange() {
    let sizeSlider = document.querySelector('.vertical__slider');
    let eraseSlider = document.querySelector('.clear__slider');

    let spanWidth = document.querySelector('.resolution__width');
    let spanHeight = document.querySelector('.resolution__height'); 

    spanWidth.innerHTML = sizeSlider.value;
    spanHeight.innerHTML = sizeSlider.value / 16 * 9;
    
    eraseSlider.setAttribute('max', sizeSlider.value);

    clearGrid();
    makeGrid();
    makeHover()
}



// to make hover effect
function makeHover() {
    let displayElement = document.querySelectorAll('.display__element');

    displayElement.forEach(element => element.addEventListener('mousemove', () => {
        element.style.backgroundColor = '#000';
    }));
}


// to erase display

function eraseDisplay() {
    let eraseSlider = document.querySelector('.clear__slider');

    let displayElement = document.querySelectorAll('.display__element');

    console.log('eraseSliderValue', eraseSlider.value);
    
    if (eraseSlider.value / 1 == eraseSlider.getAttribute('max')) {
        displayElement.forEach(element => element.style.backgroundColor = '');

    }

    
}