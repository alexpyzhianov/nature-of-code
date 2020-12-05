import P5 from "p5";
import {
    addVecToVec,
    multiplyVec3ByMat3,
    multiplyVecByScalar,
    Vec3,
    Mat3,
} from "./math";
import { compose } from "./utils";

function getGeometry(): Vec3[] {
    const geometry = [];

    for (let x = -1; x < 1; x += 0.2) {
        for (let y = -1; y < 1; y += 0.2) {
            for (let z = -1; z < 1; z += 0.2) {
                geometry.push([x, y, z] as Vec3);
            }
        }
    }

    return geometry;
}

const sketch = (p: P5) => {
    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;
    const geometry = getGeometry();

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0);
        p.fill(255);
    };

    p.draw = function () {
        p.background(0);

        const t = ((2 * Math.PI) / 200) * (p.frameCount % 200);
        const view = [
            [Math.cos(t), 0, 0],
            [0, 1, 0],
            [0, 0, Math.cos(2 * Math.PI - t)],
        ] as Mat3;

        geometry.forEach((vertex) => {
            const [x, y] = compose(
                multiplyVecByScalar.bind(null, canvasHeight / 20),
                addVecToVec.bind(null, [4, 4, 0]),
                (v: Vec3) => multiplyVecByScalar(1 / v[2], [v[0], v[1]]),
                multiplyVec3ByMat3.bind(null, view),
            )(vertex);

            p.circle(x, y, 4);
        });
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
