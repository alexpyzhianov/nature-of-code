const canvasWidth = 1080;
const canvasHeight = 1080;
const barsCount = 2000;

class Building {
    width: number;
    height: number;

    constructor() {
        this.width = randomGaussian(50, 15);
        this.height = randomGaussian(600, 100);
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);

    fill(255);
    noStroke();
}

function draw() {
    if (frameCount % 60 !== 0) return;

    background(0);

    const bars = new Array(barsCount).fill(undefined).map(() => new Building());

    bars.forEach((bar, i) => {
        rect(i * 10, canvasHeight - bar.height, bar.width, bar.height);
    });
}
