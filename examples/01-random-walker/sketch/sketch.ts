const canvasWidth = 1080;
const canvasHeight = 1080;

class Walker {
    x: number;
    y: number;

    constructor(maxWidth: number, maxHeight: number) {
        this.x = random(maxWidth);
        this.y = random(maxHeight);
    }
}

let walkers: Walker[] = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    noStroke();

    walkers = new Array(2000)
        .fill(undefined)
        .map(() => new Walker(canvasWidth, canvasHeight));
}

function draw() {
    fill(255);

    walkers.forEach((walker) => {
        rect(walker.x, walker.y, 2, 2);

        walker.x += random(-2, 2);
        walker.y += random(-2, 2);
    });

    background(0, 10);
}
