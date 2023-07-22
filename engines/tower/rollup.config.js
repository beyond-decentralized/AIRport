import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from "rollup-plugin-typescript2"
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

// const production = !process.env.ROLLUP_WATCH
const production = false

const packageJson = require("./package.json")

export default [
    {
        input: 'src/tower.index.ts',
        output: [
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
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
            production && terser(),
            copy({
                targets: [
                    { src: 'artifacts/index.html', dest: 'dist' }
                ]
            })
        ],
        watch: {
            clearScreen: false
        }
    }
]
