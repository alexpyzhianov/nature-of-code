import P5 from "p5";

interface Bullet {
    position: P5.Vector;
    velocity: P5.Vector;
}

const sketch = (p: P5) => {
    const bulletsCount = 1000;
    const planesCount = 21;
    const bulletsPerPlane = bulletsCount / planesCount;

    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;

    const bullets: Bullet[] = Array(bulletsCount)
        .fill(undefined)
        .map((_, i) => {
            const angleA = (p.TWO_PI / bulletsPerPlane) * (i % bulletsPerPlane);
            const angleB =
                (p.TWO_PI / planesCount) * Math.floor(i / bulletsPerPlane);

            return {
                position: p
                    .createVector(
                        Math.cos(angleB) * Math.cos(angleA),
                        Math.sin(angleB) * Math.cos(angleA),
                        Math.sin(angleA),
                    )
                    .mult(100),
                velocity: p.createVector(0, 0),
            };
        });

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);

        p.background(0);
        p.fill(255, 100);
        p.noStroke();
    };

    p.draw = function () {
        p.background(0);

        p.camera(
            Math.cos(p.frameCount * 0.01) * 1500,
            Math.sin(-p.frameCount * 0.005) * 1500,
            Math.sin(p.frameCount * 0.01) * 1500,
            0,
            0,
            750,
            0,
            1,
            0,
        );

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
