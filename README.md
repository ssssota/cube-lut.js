# cube-lut.js

A Cube LUT parser/generator for JavaScript.

## Installation

```sh
npm install cube-lut.js
```

## Usage

```ts
import * as fs from 'node:fs';
import { parse, stringify } from 'cube-lut.js';
const cube = fs.readFileSync('path/to/cube/file.cube', 'utf8');
const lut = parse(cube);
console.log(lut);
// {
//   title: 'Hello',
//   type: '1D', // or '3D'
//   domain: { min: [0, 0, 0], max: [1, 1, 1] },
//   size: 2,
//   data: [ [ 0, 0, 0 ], [ 1, 1, 1 ] ]
// }
console.log(stringify(lut));
// TITLE "Hello"
// LUT_1D_SIZE 2
// DOMAIN_MIN 0 0 0
// DOMAIN_MAX 1 1 1
// 0 0 0
// 1 1 1
```

## Contributing

Welcome!
