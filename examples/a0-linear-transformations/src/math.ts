import { mat3, mat4, vec3 } from "gl-matrix";

export function getTranslationMatrix(x: number, y: number) {
    return mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1);
}

export function getScaleMatrix(scale: number) {
    return mat3.fromValues(scale, 0, 0, 0, scale, 0, 0, 0, scale);
}

export function getXRotationMatrix(rad: number) {
    return mat3.fromValues(
        1,
        0,
        0,
        0,
        Math.cos(rad),
        Math.sin(rad),
        0,
        -Math.sin(rad),
        Math.cos(rad),
    );
}

export function getYRotationMatrix(rad: number) {
    return mat3.fromValues(
        Math.cos(rad),
        0,
        -Math.sin(rad),
        0,
        1,
        0,
        Math.sin(rad),
        0,
        Math.cos(rad),
    );
}

export function getZRotationMatrix(rad: number) {
    return mat3.fromValues(
        Math.cos(rad),
        Math.sin(rad),
        0,
        -Math.sin(rad),
        Math.cos(rad),
        0,
        0,
        0,
        1,
    );
}

export function getCubeGeometry(extent: number, density: number) {
    const geometry = [];

    for (let x = -extent; x < extent; x += density) {
        for (let y = -extent; y < extent; y += density) {
            for (let z = -extent; z < extent; z += density) {
                geometry.push(vec3.fromValues(x, y, z));
            }
        }
    }

    return geometry;
}
