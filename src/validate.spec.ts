import { expect, it } from "vitest";
import { validate } from "./validate";

it("should not do anything if pass a valid lut", () => {
	expect(
		validate({
			type: "1D",
			size: 2,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[1, 1, 1],
			],
		}),
	).toBe(undefined);
});

it("should throw if invalid size", () => {
	expect(() =>
		validate({
			type: "1D",
			size: 3,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[1, 1, 1],
			],
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "1D",
			size: 2,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[0.5, 0.5, 0.5],
				[1, 1, 1],
			],
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "1D",
			size: 1,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [[0, 0, 0]],
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "1D",
			size: 65537,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: Array.from({ length: 65537 }, () => [0, 0, 0]),
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "3D",
			size: 2,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [
				[0, 0, 0],
				[1, 1, 1],
			],
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "3D",
			size: 1,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: [[0, 0, 0]],
		}),
	).toThrow("Invalid LUT size");
	expect(() =>
		validate({
			type: "3D",
			size: 257,
			domain: { min: [0, 0, 0], max: [1, 1, 1] },
			data: Array(257).fill([0, 0, 0]),
		}),
	).toThrow("Invalid LUT size");
});

it("should throw if invalid domain", () => {
	expect(() =>
		validate({
			type: "1D",
			size: 2,
			domain: { min: [1, 0, 0], max: [0, 1, 1] },
			data: [
				[0, 0, 0],
				[1, 1, 1],
			],
		}),
	).toThrow("Invalid domain min/max");
});
