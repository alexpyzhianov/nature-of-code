import P5 from "p5";

interface Bullet {
    position: P5.Vector;
    velocity: P5.Vector;
    mass: number;
}

const sketch = (p: P5) => {
    const side = 10;
    const bulletsCount = p.pow(side, 3);

    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;
    let bullets: Bullet[];

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);

        bullets = Array(bulletsCount)
            .fill(undefined)
            .map((_, i) => {
                const slice = Math.floor(i / p.pow(side, 2));
                const iter = i % p.pow(side, 2);
                const row = iter % side;
                const col = Math.floor(iter / side);

                const orientation = p.createVector(
                    row - side / 2,
                    col - side / 2,
                    slice - side / 2,
                );

                return {
                    position: orientation.copy().mult(10),
                    velocity: orientation.copy().mult(2),
                    mass: p.randomGaussian(5, 5),
                };
            });

        console.log(bullets);

        p.noStroke();
        p.background(0);
    };

    p.draw = function () {
        p.background(0);
        p.camera(
            Math.cos(p.frameCount / 100) * 500,
            Math.sin(p.frameCount / 400) * 500,
            Math.sin(p.frameCount / 200) * 500,
            0,
            0,
            0,
            0,
            1,
            0,
        );

        bullets.forEach((bullet) => {
            p.push();
            p.translate(
                bullet.position.x,
                bullet.position.y,
                bullet.position.z,
            );
            p.fill(bullet.mass * 100, 0, 0, 120);
            p.sphere(3);
            p.pop();

            bullet.position.add(bullet.velocity);

            if (bullet.velocity.mag() > 0.001) {
                const friction = bullet.velocity.copy().div(bullet.mass);

                bullet.velocity.sub(friction);
            }
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
