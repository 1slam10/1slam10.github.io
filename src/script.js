let box = document.querySelector('.box');
let main = document.querySelector("main");

let xAcceleration = 5;
let yAcceleration = 5;

// get current position of the box
let boxTop = box.offsetTop;
let boxLeft = box.offsetLeft;


let colors = [];
for (let i = 0; i < 360; i += 30) {
    colors.push(`hsl(${i}, 100%, 50%)`);
}
let colorIndex = 0;

function animateBox() {
    let boxWidth = box.offsetWidth;
    let boxHeight = box.offsetHeight;

    let deviceWidth = window.innerWidth;
    let deviceHeight = document.querySelector("main").offsetHeight;

    boxLeft += xAcceleration;
    boxTop += yAcceleration;

    if (boxLeft + boxWidth >= deviceWidth || boxLeft <= 0) {
        xAcceleration *= -1;
    }
    if (boxTop + boxHeight >= deviceHeight || boxTop <= 0) {
        yAcceleration *= -1;
    }

    box.style.left = boxLeft + 'px';
    box.style.top = boxTop + 'px';

    changeColor();

    requestAnimationFrame(animateBox);
}

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;

    box.style.backgroundColor = colors[colorIndex];
}

function adjustBoxPosition() {
    let boxWidth = box.offsetWidth;
    let boxHeight = box.offsetHeight;

    let mainWidth = main.offsetWidth;
    let mainHeight = main.offsetHeight;

    if (boxLeft + boxWidth > mainWidth) {
        boxLeft = mainWidth - boxWidth;
    }
    if (boxTop + boxHeight > mainHeight) {
        boxTop = mainHeight - boxHeight;
    }
    if (boxLeft < 0) {
        boxLeft = 0;
    }
    if (boxTop < 0) {
        boxTop = 0;
    }

    box.style.left = boxLeft + 'px';
    box.style.top = boxTop + 'px';
}

window.addEventListener('resize', () => {
    adjustBoxPosition();
});

requestAnimationFrame(animateBox);