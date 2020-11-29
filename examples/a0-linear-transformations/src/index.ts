import P5 from "p5";

const sketch = (p: P5) => {
    let x = 100;
    let y = 100;

    p.setup = function () {
        p.createCanvas(800, 400);
    };

    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
