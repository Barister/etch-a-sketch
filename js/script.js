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



    console.log('eraseSlider.value:', eraseSlider.value);
    console.log(typeof eraseSlider);

    if (eraseSlider.value == 0) {
        displayElement.forEach(element => element.addEventListener('mousemove', () => {
            element.style.backgroundColor = '#000';
        }));
    }

    
    
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
        // console.log('Запускаем из eraseDisplay новый makeHover()');
        // makeHover();

    }
    
}


// to make buttons about color

let blackButton = document.querySelector('.black__button');
let colorButton = document.querySelector('.color__button');

let bottomLeftButtons = document.querySelectorAll('.bottom__left button');
let bottomRightButtons = document.querySelectorAll('.bottom__right button');


// to toggle active buttons

function toggleActive(buttons) {
    buttons.forEach(e => {
        console.log('this до функции:', this);

        e.addEventListener('click', 
        
        function(element) {
            let current = this;

            //способ через ForEach к осознанию, переписанный мной
            buttons.forEach(test => {
                if (current != test) {
                    test.classList.remove('active');
                }
                else if (current.classList.contains('active')) {
                    current.classList.remove('active')
                }
                else {
                    current.classList.add('active');
                }
            })

            // способ копи-паста через цикл к осознанию
            //})
            // let current = this;
            // console.log('this внутри функции:', current);
            // for (let i = 0; i < buttons.length; i++) {
            //     console.log('buttons[i]:', buttons[i], '||', 'element:', element);
            //     if (current != buttons[i]) {
            //         buttons[i].classList.remove('active');
            //     }
            //     else if (current.classList.contains('active')) {
            //         current.classList.remove('active')
            //     }
            //     else {
            //         current.classList.add('active');
            //     }
            // }
            element.preventDefault();
        })
    })
}



function toggleActiveForeach (buttons) {
    buttons.forEach(e => {
        console.log('this до функции:', this);

        e.addEventListener('click', () => {
            console.log('this внутри toggleActiveForeach:', this);
        })
    })
}

toggleActiveForeach (bottomLeftButtons)
    
    // element => {
        
    //     console.log('e:', e);
    //     console.log('element:', element);
    //     console.log('class кнопки:', e.getAttribute('class'));

    //     //if (e != element) {e.classList.remove('active');}
    //     if (e.getAttribute('class').includes('active')) {
    //         e.classList.remove('active');
    //     }
    //     else {
    //         e.classList.add('active');
    //     }
    //     })
    

//});
//}

// toggleActive(bottomLeftButtons);
toggleActive(bottomRightButtons);



