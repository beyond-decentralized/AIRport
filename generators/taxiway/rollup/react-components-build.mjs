import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import fs from 'fs'
import del from 'rollup-plugin-delete'
import dts from "rollup-plugin-dts"
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"

const packageJsonString = fs.readFileSync(process.cwd() + "/package.json")
const packageJson = JSON.parse(packageJsonString)

// const production = !process.env.ROLLUP_WATCH
const production = false

let clean = false
if (process.argv.length >= 5) {
    if (process.argv[4] === '--config-clean') {
        clean = true
    }
}

export function getReactComponentsBuildConfig() {
    const plugins = [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: process.cwd() + "/tsconfig.json"
        }),
        postcss(),
        production && terser(),
    ]
    if (clean) {
        plugins.unshift(del({ targets: process.cwd() + '/dist/*' }))
    }
    return [{
        input: process.cwd() + "/src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins
    },
    {
        input: process.cwd() + "/dist/esm/types/index.d.ts",
        output: [{
            file: process.cwd() + "/dist/index.d.ts",
            format: "esm"
        }],
        plugins: [dts()],
        external: [/\.css$/]
    }]
}
