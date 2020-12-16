import P5 from "p5";

interface Bullet {
    position: P5.Vector;
    velocity: P5.Vector;
}

const sketch = (p: P5) => {
    const bulletsPerPlane = 20;
    const planesCount = 20;
    const bulletsCount = planesCount * bulletsPerPlane;

    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;

    const bullets: Bullet[] = Array(bulletsCount)
        .fill(undefined)
        .map((_, i) => {
            const angleA = (p.TWO_PI / bulletsPerPlane) * (i % bulletsPerPlane);
            const angleB =
                (p.PI / planesCount) * Math.floor(i / bulletsPerPlane);

            return {
                position: p.createVector(0, 0).mult(100),
                velocity: p.createVector(0, 0),
            };
        });

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);

        p.stroke(150);
        p.debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);
        p.noStroke();

        p.camera(
            Math.cos(p.frameCount * 0.01) * 100,
            Math.sin(-p.frameCount * 0.005) * 1000,
            Math.sin(p.frameCount * 0.01) * 1000,
            0,
            0,
            0,
            0,
            1,
            0,
        );

        p.background(0);
        p.fill(255, 100);
        p.noStroke();
    };

    p.draw = function () {
        p.background(0);
        p.orbitControl();

        bullets.forEach((bullet) => {
            p.sphere(10, 10, 10).translate(
                bullet.position.x,
                bullet.position.y,
                bullet.position.z,
            );
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
