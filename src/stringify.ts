import type { Lut } from "./types";

export const stringify = (lut: Lut): string => {
	const lines: string[] = [];
	if (lut.title) {
		lines.push(`TITLE "${lut.title}"`);
	}
	if (lut.type === "1D") {
		lines.push(`LUT_1D_SIZE ${lut.size}`);
	}
	if (lut.type === "3D") {
		lines.push(`LUT_3D_SIZE ${lut.size}`);
	}
	if (
		lut.domain.min[0] === lut.domain.min[1] &&
		lut.domain.min[0] === lut.domain.min[2] &&
		lut.domain.max[0] === lut.domain.max[1] &&
		lut.domain.max[0] === lut.domain.max[2]
	) {
		lines.push(
			`LUT_${lut.type}_INPUT_RANGE ${lut.domain.min[0]} ${lut.domain.max[0]}`,
		);
	}
	lines.push(
		`DOMAIN_MIN ${lut.domain.min[0]} ${lut.domain.min[1]} ${lut.domain.min[2]}`,
	);
	lines.push(
		`DOMAIN_MAX ${lut.domain.max[0]} ${lut.domain.max[1]} ${lut.domain.max[2]}`,
	);
	lines.push(...lut.data.map(([r, g, b]) => `${r} ${g} ${b}`));
	return `${lines.join("\n")}\n`;
};
