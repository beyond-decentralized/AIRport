import resolve from '@rollup/plugin-node-resolve'
import fs from 'fs'
import del from 'rollup-plugin-delete'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import typescript from "rollup-plugin-typescript2"

// const production = !process.env.ROLLUP_WATCH
const production = false

const packageJsonString = fs.readFileSync(process.cwd() + "/package.json")
const packageJson = JSON.parse(packageJsonString)

const plugins = [
    peerDepsExternal(),
    resolve({
        browser: true
    }),
    typescript({
        inlineSources: !production,
        sourceMap: !production,
        tsconfig: "./tsconfig.json"
    }),
    production && terser()
]

let clean = false
if (process.argv.length >= 5) {
    if (process.argv[4] === '--config-clean') {
        clean = true
    }
}
if (clean) {
    plugins.unshift(del({ targets: 'dist/*' }))
}

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
        plugins,
        watch: {
            clearScreen: false
        }
    }
]
