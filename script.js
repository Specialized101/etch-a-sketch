const container = document.querySelector('#container');
let squaresPerLine = 16;
const containerWidth = 960;
const promptBtn = document.createElement('button');

promptBtn.textContent = 'Adjust the number of squares per side';
promptBtn.setAttribute('id', 'promptBtn');
promptBtn.addEventListener('click', () => {

    let input = prompt("Enter a number between 1 and 100");
    if (input === null || input === NaN) return;

    while (parseInt(input) <= 0 || parseInt(input) > 100) {
        input = prompt("Please make sure your number is between 1 and 100");
    }

    squaresPerLine = parseInt(input);

    let containerChilds = document.querySelectorAll('.square');
    containerChilds.forEach(child => {
        container.removeChild(child);
    });

    container.style.width = `${containerWidth}px`;
    container.style.height = container.style.width;

    for (let i = 0; i < squaresPerLine * squaresPerLine; i++) {
        let div = document.createElement('div');

        div.classList.add('square');
        div.style.width = `${containerWidth / squaresPerLine}px`;
        div.style.height = div.style.width;

        div.addEventListener('pointerover', () => {
            if (div.style.backgroundColor === '') {
                div.style.backgroundColor = getRandomColor();
            } 
        });

        container.appendChild(div);
    }
});

function getRandomColor(){
    return `rgba(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)}, 100%)`; 
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}


container.appendChild(promptBtn);



