import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from "rollup-plugin-typescript2";
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// const production = !process.env.ROLLUP_WATCH;
const production = false;

const packageJson = require("./package.json");

export default [
    {
        input: 'src/sqljs.index.ts',
        output: [
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve({
                browser: true
            }),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: !production,
                inlineSources: !production
            }),
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    }
];
