import commonjs from '@rollup/plugin-commonjs'
import resolve from "@rollup/plugin-node-resolve"
import fs from 'fs'
import del from 'rollup-plugin-delete'
import dts from "rollup-plugin-dts"
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import typescript from "rollup-plugin-typescript2"

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

export function getServerBuildConfig() {
    let cjsBuildPlugins = [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: process.cwd() + "/tsconfig.json",
            sourceMap: !production,
            inlineSources: !production
        }),
        production && terser(),
    ]
    if (clean) {
        cjsBuildPlugins.unshift(del({ targets: process.cwd() + '/dist/*' }))
    }

    return [{
        input: process.cwd() + "/src/server.index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
        ],
        plugins: cjsBuildPlugins
    },
    {
        input: process.cwd() + "/src/server.index.ts",
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
                tsconfig: process.cwd() + "/tsconfig.json",
                sourceMap: !production,
                inlineSources: !production
            }),
            production && terser(),
        ],
    },
    {
        input: process.cwd() + "/dist/esm/server.index.d.ts",
        output: [{
            file: process.cwd() + "/dist/server.index.d.ts",
            format: "esm"
        }],
        plugins: [
            // dts.default()
            dts()
        ],
    }]
}
