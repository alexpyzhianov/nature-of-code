let time = 0;
let time2 = 0;
let walkerX: number;
let walkerY: number;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    walkerX = windowWidth / 2;
    walkerY = windowHeight / 2;

    fill(255);
    noStroke();
}

function draw() {
    time += 0.05;
    time2 += 0.02;

    rect(walkerX, walkerY, 10, 10);

    walkerX += (noise(time) - 0.5) * 8;
    walkerY += (noise(time2) - 0.5) * 4;

    background(0, 15);
}
