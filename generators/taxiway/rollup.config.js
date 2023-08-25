import resolve from '@rollup/plugin-node-resolve'
import typescript from "rollup-plugin-typescript2"
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'

// const production = !process.env.ROLLUP_WATCH
const production = false

const packageJson = require("./package.json")

export default [
    {
        input: 'src/taxiway.index.ts',
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            peerDepsExternal(),
            resolve(),
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
]
