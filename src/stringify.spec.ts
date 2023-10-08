import { expect, it } from "vitest";
import { stringify } from "./stringify";

it("should stringify a 1D LUT", () => {
	expect(
		stringify({
			type: "1D",
			size: 3,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[1, 1, 1],
			],
		}),
	).toBe(`\
LUT_1D_SIZE 3
LUT_1D_INPUT_RANGE 0 1
DOMAIN_MIN 0 0 0
DOMAIN_MAX 1 1 1
0 0 0
1 1 1
`);
});

it("should stringify a 3D LUT", () => {
	expect(
		stringify({
			type: "3D",
			size: 2,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			],
		}),
	).toBe(`\
LUT_3D_SIZE 2
LUT_3D_INPUT_RANGE 0 1
DOMAIN_MIN 0 0 0
DOMAIN_MAX 1 1 1
0 0 0
0 0 0
0 0 0
0 0 0
1 1 1
1 1 1
1 1 1
1 1 1
`);
});
