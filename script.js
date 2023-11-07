const container = document.querySelector('#container');
const squaresPerLine = 16;
const containerWidth = 960;

container.style.width = `${containerWidth}px`;
container.style.height = container.style.width;

for(let i = 0; i < squaresPerLine * squaresPerLine; i++){
    let div = document.createElement('div');

    div.classList.add('square');
    div.style.width = `${containerWidth / squaresPerLine}px`;
    div.style.height = div.style.width;
    
    container.appendChild(div);
}