import p5 from "p5";
import P5 from "p5";

interface Planet {
    position: P5.Vector;
    mass: number;
    speed: P5.Vector;
}

const sketch = (p: P5) => {
    const planetsCount = 200;
    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;

    const GRAVITY_CONSTANT = 1 / planetsCount;

    const minBounds = p.createVector(-canvasWidth / 2, -canvasHeight / 2);
    const maxBounds = p.createVector(canvasWidth / 2, canvasWidth / 2);

    function outOfBoundsX(position: p5.Vector) {
        return position.x < minBounds.x || position.x > maxBounds.x;
    }

    function outOfBoundsY(position: p5.Vector) {
        return position.y < minBounds.y || position.y > maxBounds.y;
    }

    function gravity(p1: Planet, p2: Planet): p5.Vector {
        const diff = p2.position.copy().sub(p1.position);
        const distance = Math.max(p1.mass / 2 + p2.mass / 2, diff.mag());
        const magnitude =
            (GRAVITY_CONSTANT * p1.mass * p2.mass) / Math.pow(distance, 2);

        return diff.normalize().mult(magnitude);
    }

    const planets: Planet[] = Array(planetsCount)
        .fill(undefined)
        .map((_, i) => ({
            position: p
                .createVector(canvasWidth / 5, 0)
                .rotate((p.TWO_PI / planetsCount) * i),
            mass: p.random(10, i % 33 === 0 ? 200 : 30),
            speed: p.createVector(0, 0),
        }));

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);

        p.background(0);
        p.fill(255, 100);
        p.noStroke();
    };

    p.draw = function () {
        p.background(0);
        p.translate(canvasWidth / 2, canvasHeight / 2);

        planets.forEach((planet) => {
            const force = planets.reduce((acc, next) => {
                if (next === planet) return acc;
                return acc.add(gravity(planet, next));
            }, p.createVector(0, 0));

            const acceleration = force.mult(1);

            planet.speed.add(acceleration);
            planet.position.add(planet.speed);

            if (outOfBoundsX(planet.position)) {
                planet.speed.x *= -0.95;
            }

            if (outOfBoundsY(planet.position)) {
                planet.speed.y *= -0.95;
            }

            p.fill(255, 255 - planet.mass - 30, 30, 100);

            p.circle(planet.position.x, planet.position.y, planet.mass);
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
