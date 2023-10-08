import type { Lut } from "./types";
import { validate } from "./validate";

export type ParseOptions = {
	/**
	 * If true, the parser will throw an error if the LUT is not valid.
	 * If false, the parser will try to parse the LUT as much as possible.
	 * @default false
	 */
	strict?: boolean;
};

const SP0 = "[\t ]*";
const SP = "[\t ]+";
const NUM = "[-+]?\\d*\\.?\\d+(?:[eE][-+]?\\d+)?";
const titleRegex = new RegExp(`^${SP0}TITLE${SP}"(.*)"${SP0}$`);
const domainMinRegex = new RegExp(
	`^${SP0}DOMAIN_MIN${SP}(${NUM})${SP}(${NUM})${SP}(${NUM})${SP0}$`,
);
const domainMaxRegex = new RegExp(
	`^${SP0}DOMAIN_MAX${SP}(${NUM})${SP}(${NUM})${SP}(${NUM})${SP0}$`,
);
const rgbRegex = new RegExp(`^${SP0}(${NUM})${SP}(${NUM})${SP}(${NUM})${SP0}$`);
const lut1dRegex = new RegExp(`^${SP0}LUT_1D_SIZE${SP}(\\d+)${SP0}$`);
const lut3dRegex = new RegExp(`^${SP0}LUT_3D_SIZE${SP}(\\d+)${SP0}$`);

/**
 * @param text LUT text
 * @param options Options for parsing
 * @returns LUT object
 * @throws {Error} If the LUT is invalid and `options.strict` is true.
 */
export const parse = (
	text: string,
	{ strict = false }: ParseOptions = {},
): Lut => {
	const flags = {
		title: false,
		domainMin: false,
		domainMax: false,
		type: false,
	};
	const parsed = text
		.split(/\r?\n/)
		.filter((ln) => ln.trim().length > 0)
		.reduce<Lut>(
			(lut, ln) => {
				if (ln.startsWith("#")) {
					return lut; // ignore comments
				}
				const titleMatch = ln.match(titleRegex);
				if (titleMatch) {
					if (flags.title && strict) throw new Error("Multiple titles found");
					flags.title = true;
					lut.title = titleMatch[1];
					return lut;
				}
				const lut1dMatch = ln.match(lut1dRegex);
				if (lut1dMatch) {
					if (flags.type && strict) throw new Error("Multiple LUT types found");
					flags.type = true;
					lut.type = "1D";
					lut.size = Number(lut1dMatch[1]);
					return lut;
				}
				const lut3dMatch = ln.match(lut3dRegex);
				if (lut3dMatch) {
					if (flags.type && strict) throw new Error("Multiple LUT types found");
					flags.type = true;
					lut.type = "3D";
					lut.size = Number(lut3dMatch[1]);
					return lut;
				}
				const domainMinMatch = ln.match(domainMinRegex);
				if (domainMinMatch) {
					if (flags.domainMin && strict)
						throw new Error("Multiple domain min found");
					flags.domainMin = true;
					lut.domain.min = [
						Number(domainMinMatch[1]),
						Number(domainMinMatch[2]),
						Number(domainMinMatch[3]),
					];
					return lut;
				}
				const domainMaxMatch = ln.match(domainMaxRegex);
				if (domainMaxMatch) {
					if (flags.domainMax && strict)
						throw new Error("Multiple domain max found");
					flags.domainMax = true;
					lut.domain.max = [
						Number(domainMaxMatch[1]),
						Number(domainMaxMatch[2]),
						Number(domainMaxMatch[3]),
					];
					return lut;
				}
				const rgbMatch = ln.match(rgbRegex);
				if (rgbMatch) {
					lut.data.push([
						Number(rgbMatch[1]),
						Number(rgbMatch[2]),
						Number(rgbMatch[3]),
					]);
					return lut;
				}
				if (strict) throw new Error(`Invalid line: ${ln}`);
				return lut;
			},
			{
				type: "1D",
				size: 0,
				domain: { min: [0, 0, 0], max: [1, 1, 1] },
				data: [],
			},
		);
	if (strict) {
		if (flags.type === false) throw new Error("LUT type not found");
		validate(parsed);
	}
	return parsed;
};
