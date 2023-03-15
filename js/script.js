// to determine some variables

const display = document.querySelector('.middle__display');

const displayResolutionWidth = display.offsetWidth;
const displayResolutionHeight = display.offsetHeight;



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
makeHover();

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
    if (eraseSlider.value / 1 > 0) {
        eraseSlider.value = 0;
    }

    clearGrid();
    makeGrid();
    makeHover()
}



// to make hover effect


function makeHover() {
    let displayElement = document.querySelectorAll('.display__element');
    let eraseSlider = document.querySelector('.clear__slider');


    console.log('eraseSlider.value снаружи:', eraseSlider.value);
    //console.log('typeof eraseSlider снаружи eventListener:', typeof eraseSlider);

    // func outside to have possibility to remove it if slider.value is > 0;
    function test(element) {
        this.style.backgroundColor = '#000';
    }

    if (eraseSlider.value == 0) {
        displayElement.forEach(element => element.addEventListener('mouseenter', test))}
        
    
    eraseSlider.addEventListener('input', (e) => {
        console.log('eraseSlider.value inside eventListener:', eraseSlider.value);
        
        if (eraseSlider.value /1 == 0) {
            console.log('eraseSlider == 0 это уже после смены инпута')
            displayElement.forEach(element => element.addEventListener('mouseenter', test));
        }
        else if (eraseSlider.value > 0) {
            console.log('!!!value > 0 после снятия события!!!:', eraseSlider.value);
            displayElement.forEach(element => element.removeEventListener('mouseenter', test ));
        
            
        }
        

    })

    

    
    
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

