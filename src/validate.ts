import type { Lut } from "./types";

/**
 * Validate a LUT object. Throws an error if invalid.
 * @param lut The LUT object to validate.
 * @throws {Error} If the LUT object is invalid.
 */
export const validate = (lut: Lut): void => {
	if (
		lut.type === "1D" &&
		(lut.size < 2 || lut.size > 65536 || lut.size !== lut.data.length)
	)
		throw new Error("Invalid LUT size");
	if (
		lut.type === "3D" &&
		(lut.size < 2 || lut.size > 256 || lut.size ** 3 !== lut.data.length)
	)
		throw new Error("Invalid LUT size");
	if (
		lut.domain.min[0] > lut.domain.max[0] ||
		lut.domain.min[1] > lut.domain.max[1] ||
		lut.domain.min[2] > lut.domain.max[2]
	)
		throw new Error("Invalid domain min/max");
};
