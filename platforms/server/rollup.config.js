import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import dts from "rollup-plugin-dts"
import { terser } from "rollup-plugin-terser"
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'

const packageJson = require("./package.json")

// const production = !process.env.ROLLUP_WATCH
const production = false

export default [
    {
        input: "src/server.index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: !production,
                inlineSources: !production
            }),
            production && terser(),
        ],
    },
    {
        input: "src/server.index.ts",
        output: [
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: !production,
                inlineSources: !production
            }),
            production && terser(),
        ],
    },
    {
        input: "dist/esm/server.index.d.ts",
        output: [{ file: "dist/server.index.d.ts", format: "esm" }],
        plugins: [dts.default()],
    },
]
