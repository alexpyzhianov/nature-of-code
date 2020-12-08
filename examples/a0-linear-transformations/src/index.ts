import P5 from "p5";
import { vec3, glMatrix } from "gl-matrix";
import Simplex from "simplex-noise";
import {
    getCubeGeometry,
    getScaleMatrix,
    getTranslationMatrix,
    getXRotationMatrix,
    getYRotationMatrix,
    getZRotationMatrix,
} from "./math";

glMatrix.setMatrixArrayType(Array);
const noise = new Simplex();

const sketch = (p: P5) => {
    const canvasWidth = p.windowWidth;
    const canvasHeight = p.windowHeight;
    let time = 0.5;

    p.setup = function () {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0);
        p.fill(255);
        p.colorMode(p.HSB, 255);
    };

    p.draw = function () {
        time += 0.01;
        const geometry = getCubeGeometry(0.5, 0.1);

        p.background(0);

        geometry.forEach((v) => {
            const noiseValue = noise.noise4D(
                v[0] * 0.8,
                v[1] * 0.8,
                v[2] * 0.8,
                time * 1.5,
            );

            vec3.transformMat3(v, v, getXRotationMatrix(0.5));
            vec3.transformMat3(v, v, getYRotationMatrix(time / 6));
            vec3.transformMat3(v, v, getZRotationMatrix(0.5));
            vec3.transformMat3(v, v, getScaleMatrix(500));
            vec3.transformMat4(
                v,
                v,
                getTranslationMatrix(canvasWidth / 2, canvasHeight / 2),
            );

            p.fill(0, 0, 255, noiseValue * 255 + 40);

            p.circle(v[0], v[1], 8);
        });

        p.fill(255);
    };
};

const containerElement = document.getElementById("p5");

if (!containerElement) {
    throw new Error("No container found");
}

new P5(sketch, containerElement);
