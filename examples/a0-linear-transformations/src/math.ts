export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type AnyVec = Vec2 | Vec3;

export type Mat3 = [Vec3, Vec3, Vec3];

export function addVecToVec<Vec extends AnyVec>(a: Vec, b: Vec): Vec {
    return a.map((value, i) => value + b[i]) as Vec;
}

export function multiplyVecByScalar<Vec extends AnyVec>(
    scalar: number,
    vec: Vec,
): Vec {
    return vec.map((component) => component * scalar) as Vec;
}

export function multiplyVec3ByMat3(mat3: Mat3, vec3: Vec3): Vec3 {
    return mat3
        .map((matVec, i) => multiplyVecByScalar(vec3[i], matVec))
        .reduce(addVecToVec) as Vec3;
}
