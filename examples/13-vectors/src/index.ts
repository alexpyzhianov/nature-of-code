import P5 from "p5";
import pigOneUrl from "../assets/pig-one.png";
import pigTwoUrl from "../assets/pig-two.png";

const sketch = (p: P5) => {
    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;
    const pigAnimation: P5.Image[] = [];
    const pigPosition = p.createVector(p.mouseX, p.mouseY);
    const pigWidth = 160;
    let frame = 0;

    p.preload = function () {
        pigAnimation.push(p.loadImage(pigOneUrl), p.loadImage(pigTwoUrl));
    };

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(255);
        p.fill(0);

        pigAnimation.map((frame) => frame.resize(pigWidth, 0));
    };

    p.draw = function () {
        p.background(255);

        const mousePosition = p
            .createVector(p.mouseX, p.mouseY)
            .sub(pigWidth / 2, pigWidth / 2);

        const delta = mousePosition.copy().sub(pigPosition).div(50);

        if (delta.mag() < 0.75) {
            pigPosition.set(mousePosition.copy());
            frame = 0;
        } else {
            pigPosition.add(delta);
            frame = Math.floor(p.millis() / 100);
        }

        p.textSize(32);
        p.text("This sketch is putting your money where your mouse is", 24, 48);

        p.image(
            pigAnimation[frame % pigAnimation.length],
            pigPosition.x,
            pigPosition.y,
        );
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
