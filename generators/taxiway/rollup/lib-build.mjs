import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import fs from 'fs'
import del from 'rollup-plugin-delete'
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

export function getLibBuildConfig(
    libName
) {
    let inputFileName = 'index'
    if (libName) {
        inputFileName = libName + '.index'
    }
    const plugins = [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({
            inlineSources: !production,
            sourceMap: !production,
            tsconfig: "./tsconfig.json"
        }),
        production && terser()
    ]
    if (clean) {
        plugins.unshift(del({ targets: './dist/*' }))
    }

    return [{
        input: `./src/${inputFileName}.ts`,
        output: [
            {
                file: './' + packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins,
        watch: {
            clearScreen: false
        }
    }]
}
