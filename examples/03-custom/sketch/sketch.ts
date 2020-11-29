const samplesCount = 1000;

function customNumbers(): number {
    const randomA = random(0, windowHeight);
    const randomB = random(0, windowHeight);

    if (randomA < randomB) {
        return randomA;
    } else {
        return customNumbers();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    stroke(255);
    noFill();
}

function draw() {
    if (frameCount % 5 !== 0) return;

    background(0, 100);

    const samples = Array(samplesCount)
        .fill(undefined)
        .map(() => customNumbers())
        .sort((a, b) => a - b);

    beginShape();

    samples.forEach((s, i) => {
        vertex((windowWidth / samplesCount) * i, windowHeight - s);
    });

    endShape();
}
