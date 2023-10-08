export type RGB = [R: number, G: number, B: number];
export type Lut = {
	title?: string;
	type: "1D" | "3D";
	size: number;
	domain: { min: RGB; max: RGB };
	data: RGB[];
};
