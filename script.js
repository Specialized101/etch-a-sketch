function getRandomColor() {
    return `hsl(${getRandomInt(360)} ${getRandomInt(100)}% 90%)`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rgbToHSL(rgb) {
    let red = parseInt(rgb.replace('rgb(', '').replace(')', '').replaceAll(' ', '').split(',')[0]);
    let green = parseInt(rgb.replace('rgb(', '').replace(')', '').replaceAll(' ', '').split(',')[1]);
    let blue = parseInt(rgb.replace('rgb(', '').replace(')', '').replaceAll(' ', '').split(',')[2]);

    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;

    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);

    //Luminance
    let l = (min + max) / 2;

    let s = 0;
    let h = 0;

    // Saturation
    if (min !== max) {
        if (l <= 0.5)
            s = (max - min) / (max + min);
        else
            s = (max - min) / (2 - max - min);
    }

    //Hue
    if (r === max)
        h = ((g - b) / (max - min)) * 60;
    else if (g === max)
        h = (2 + (b - r) / (max - min)) * 60;
    else
        h = (4 + (r - g) / (max - min)) * 60;

    if (h < 0)
        h += 360;


    return `hsl(${Math.round(h * 100) / 100} ${s * 100}% ${l * 100}%)`;

}

function darkenHSL(hsl, value){
    let h = hsl.replace('hsl(', '').replace(')', '').split(' ')[0];
    let s = hsl.replace('hsl(', '').replace(')', '').split(' ')[1];
    let l = parseInt(hsl.replace('hsl(', '').replace(')', '').split(' ')[2]);
    
    l -= value;
    if (l < 0) {
        l = 0;
    }

    return `hsl(${h} ${s} ${l}%)`;

}


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
            } else {
                div.style.backgroundColor = darkenHSL(rgbToHSL(div.style.backgroundColor), 10);
            }
        });

        container.appendChild(div);
    }
});

container.appendChild(promptBtn);



