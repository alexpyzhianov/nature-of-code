import P5 from "p5";

const sketch = (p: P5) => {
    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;
    const initialBirdDirection = p.createVector(1, 1);

    p.angleMode("degrees");

    function createBird() {
        const cx = canvasWidth / 2;
        const cy = canvasHeight / 2;
        return {
            position: p.createVector(
                p.random(cx - 200, cx + 200),
                p.random(cy - 200, cy + 200),
            ),
            speed: p.createVector(0, 0),
            angle: 0,
            rotationSpeed: 0,
            flap: p.random(0, 180),
        };
    }

    function drawBird(
        size: number,
        x: number,
        y: number,
        angle: number,
        flap = 0,
    ) {
        const x3 = x + p.cos(angle + flap) * size;
        const y3 = y + p.sin(angle + flap) * size;
        const x4 = x + -p.sin(angle - flap) * size;
        const y4 = y + p.cos(angle - flap) * size;

        p.line(x, y, x3, y3);
        p.line(x, y, x4, y4);
    }

    const birds = new Array(200).fill(undefined).map(createBird);

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0);
        p.stroke(255);
        p.strokeWeight(2);
    };

    p.draw = function () {
        p.background(0, 200);
        const mousePosition = p.createVector(p.mouseX, p.mouseY);

        birds.forEach((bird) => {
            const delta = mousePosition.copy().sub(bird.position);
            const direction = delta.copy().normalize();
            const acceleration = direction.copy().mult(p.random(0, 0.02));
            const targetAngle = 180 - delta.angleBetween(initialBirdDirection);

            bird.position.add(bird.speed.add(acceleration));
            bird.angle += bird.angle < targetAngle ? 1 : -1;
            bird.flap = bird.flap + Math.min(10, 10 / bird.speed.mag() + 2);

            drawBird(
                12,
                bird.position.x,
                bird.position.y,
                bird.angle,
                bird.flap,
            );
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
