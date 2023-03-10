// to determine some constant variables

const display = document.querySelector('.middle__display');

console.log(display);




for (let i = 0; i < 9; i++) {
    const displayRow = document.createElement('div')
    displayRow.setAttribute('class', 'display__row')
    displayRow.style.display = 'flex';
    displayRow.style.justifyContent = 'space-between';
    displayRow.style.height = 405/9+'px';
    display.appendChild(displayRow);
    console.log('i:', i);
    for (let j = 0; j < 16; j++) {
        const displayElement = document.createElement('div')
        displayElement.setAttribute('class', 'display__element');
        displayElement.style.width = 720 / 16+'px';
        displayElement.style.height = 405/9+'px';
        displayElement.style.border = '1px solid black';
        displayRow.appendChild(displayElement);
        console.log('j:', j);
    }

    
    
}

console.log(display);
