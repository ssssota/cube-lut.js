import { expect, it } from "vitest";
import { parse } from "./parse";

it("should return an default object", () => {
	expect(parse("")).toStrictEqual({
		type: "1D",
		size: 0,
		domain: { min: [0, 0, 0], max: [1, 1, 1] },
		data: [],
	});
});

it("should throw an error when strict and invalid line", () => {
	expect(() => parse("INVALID", { strict: true })).toThrow(
		"Invalid line: INVALID",
	);
});

it("should parse a title", () => {
	const { title } = parse('TITLE "Hello"');
	expect(title).toBe("Hello");
});

it("should parse LUT(1D) size", () => {
	const { size, type } = parse("LUT_1D_SIZE 17");
	expect(type).toBe("1D");
	expect(size).toBe(17);
});

it("should parse LUT(3D) size", () => {
	const { size, type } = parse("LUT_3D_SIZE 17");
	expect(type).toBe("3D");
	expect(size).toBe(17);
});

it("should parse domain min", () => {
	const { domain } = parse("DOMAIN_MIN 0 1 2");
	expect(domain.min).toStrictEqual([0, 1, 2]);
});

it("should parse domain max", () => {
	const { domain } = parse("DOMAIN_MAX 0 1 2");
	expect(domain.max).toStrictEqual([0, 1, 2]);
});

it("should parse a color", () => {
	const { data } = parse("0.1 0.2 0.3");
	expect(data).toStrictEqual([[0.1, 0.2, 0.3]]);
});

it("should parse multiple colors", () => {
	const { data } = parse("0.1 0.2 0.3\n1\t1\t1\n0.25 0.5 0.75");
	expect(data).toStrictEqual([
		[0.1, 0.2, 0.3],
		[1, 1, 1],
		[0.25, 0.5, 0.75],
	]);
});

it("should parse a LUT(1D)", () => {
	const { size, type, domain, data } = parse(`\
TITLE "Hello"
LUT_1D_SIZE 2
DOMAIN_MIN 0 0 0
DOMAIN_MAX 1 1 1
# Comment
0 0 0
1 1 1
`);
	expect(type).toBe("1D");
	expect(size).toBe(2);
	expect(domain.min).toStrictEqual([0, 0, 0]);
	expect(domain.max).toStrictEqual([1, 1, 1]);
	expect(data).toStrictEqual([
		[0, 0, 0],
		[1, 1, 1],
	]);
});

it("should parse a LUT(3D)", () => {
	const { size, type, domain, data } = parse(`\
TITLE "Hello"
LUT_3D_SIZE 2
DOMAIN_MIN 0 0 0
DOMAIN_MAX 1 1 1
# Comment
0 0 0
1 0 0
0 .75 0
1 .75 0
0 .25 1
1 .25 1
0 1 1
1 1 1
`);
	expect(type).toBe("3D");
	expect(size).toBe(2);
	expect(domain.min).toStrictEqual([0, 0, 0]);
	expect(domain.max).toStrictEqual([1, 1, 1]);
	expect(data).toStrictEqual([
		[0, 0, 0],
		[1, 0, 0],
		[0, 0.75, 0],
		[1, 0.75, 0],
		[0, 0.25, 1],
		[1, 0.25, 1],
		[0, 1, 1],
		[1, 1, 1],
	]);
});
