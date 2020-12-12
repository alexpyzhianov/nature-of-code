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
            flap: p.random(1, 10),
            flapDirection: 1,
        };
    }

    function drawBird(
        x: number,
        y: number,
        size: number,
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

    const birds = new Array(150).fill(undefined).map(createBird);

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0);
        p.stroke(255);
        p.strokeWeight(2);
    };

    p.draw = function () {
        p.background(0, 150);
        const mousePosition = p.createVector(p.mouseX, p.mouseY);

        birds.forEach((bird, i) => {
            const delta = mousePosition.copy().sub(bird.position);
            const direction = delta.copy().normalize();
            const acceleration = direction.copy().mult(p.random(0, 0.04));
            const angle = 180 - delta.angleBetween(initialBirdDirection);

            bird.position.add(bird.speed.add(acceleration));

            // weird but beautiful
            // bird.flap += 10;
            bird.flap += (p.noise(i, p.millis()) * 10 + 5) * bird.flapDirection;
            bird.flapDirection *= bird.flap <= -45 || bird.flap >= 45 ? -1 : 1;

            // weird but beautiful
            // drawBird(bird.position.x, bird.position.y, 12, p.random(0, 360));

            drawBird(bird.position.x, bird.position.y, 12, angle, bird.flap);
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
