import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import fs from 'fs'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
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

export function getAppBuildConfig(
    appName = '',
    copyToDirectoryPath,
    appShortName = appName,
    makePeerDependenciesExternal = false
) {
    let runtimeBuildOutputFile = process.cwd() + '/' + packageJson.app
    let bundleDefinitionsInputFile = process.cwd() + `/dist/app/to_be_generated/${appShortName}.runtime-index.d.ts`
    let bundleDefinitionsOutputFile = process.cwd() + "/dist/app/bundle.d.ts"
    if (copyToDirectoryPath) {
        runtimeBuildOutputFile = copyToDirectoryPath + `/AIRport/apps/${appName}/bundle.mjs`
        bundleDefinitionsInputFile = copyToDirectoryPath + `/AIRport/apps/${appName}/to_be_generated/${appShortName}.runtime-index.d.ts`
        bundleDefinitionsOutputFile = copyToDirectoryPath + `/AIRport/apps/${appName}/bundle.d.ts`
    }

    let delPlugins = []
    if (clean) {
        delPlugins = [del({ targets: process.cwd() + '/dist/*' })]
    }

    let peerDepsExternalPlugins = []
    if (makePeerDependenciesExternal) {
        peerDepsExternalPlugins = [peerDepsExternal()]
    }

    const runtimeBuildPlugins = [
        ...delPlugins,
        ...peerDepsExternalPlugins,
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({
            tsconfig: process.cwd() + "/tsconfig.json",
            sourceMap: !production,
            inlineSources: !production
        }),
        production && terser()
    ]
    if (copyToDirectoryPath) {
        runtimeBuildPlugins.push(copy({
            targets: [{
                src: process.cwd() + '/node_modules/@airport/tower/dist/index.html',
                dest: copyToDirectoryPath + `/AIRport/apps/${appName}`
            }]
        }))
    }

    return [{
        input: process.cwd() + `/src/to_be_generated/${appShortName}.runtime-index.ts`,
        output: {
            file: runtimeBuildOutputFile,
            format: 'esm',
            sourcemap: true
        },
        plugins: runtimeBuildPlugins,
        watch: {
            clearScreen: false
        }
    },
    {
        input: process.cwd() + '/src/generated/application.ts',
        output: [{
            file: process.cwd() + "/dist/definition/application.mjs",
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfigDefaults: {
                    "files": [
                        process.cwd() + "/src/generated/application.ts"
                    ]
                }
            })
        ],
        watch: {
            clearScreen: false
        }
    },
    {
        input: process.cwd() + '/src/generated/mappedSuperclass.ts',
        output: [{
            file: process.cwd() + "/dist/definition/mappedSuperclass.mjs",
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfigDefaults: {
                    "files": [
                        process.cwd() + "/src/generated/mappedSuperclass.ts"
                    ]
                }
            })
        ],
        watch: {
            clearScreen: false
        }
    },
    {
        input: process.cwd() + `/src/to_be_generated/${appShortName}.api-index.ts`,
        output: [
            {
                file: process.cwd() + '/' + packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: process.cwd() + '/' + packageJson.module,
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: process.cwd() + "/tsconfig.json",
                tsconfigDefaults: {
                    "emitDecoratorMetadata": false
                },
                sourceMap: !production,
                inlineSources: !production
            }),
            production && terser()
        ],
        watch: {
            clearScreen: false
        }
    },
    {
        input: bundleDefinitionsInputFile,
        output: [{
            file: bundleDefinitionsOutputFile,
            format: "esm"
        }],
        plugins: [
            // dts.default()
            dts()
        ]
    },
    {
        input: process.cwd() + `/dist/esm/to_be_generated/${appShortName}.api-index.d.ts`,
        output: [{
            file: process.cwd() + `/dist/esm/${appShortName}.index.d.ts`,
            format: "esm"
        }],
        plugins: [
            // dts.default()
            dts()
        ]
    }]
}

export function internalNonApiBuildConfig(
    appName
) {
    const plugins = [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        typescript({
            tsconfig: process.cwd() + "/tsconfig.json",
            sourceMap: !production,
            inlineSources: !production
        }),
        production && terser()
    ]
    if (clean) {
        plugins.unshift(del({ targets: process.cwd() + '/dist/*' }))
    }

    return [
        {
            input: process.cwd() + `/src/${appName}.index.ts`,
            output: [
                {
                    file: process.cwd() + '/' + packageJson.module,
                    format: "esm",
                    sourcemap: true,
                },
            ],
            plugins,
            watch: {
                clearScreen: false
            }
        },
        {
            input: process.cwd() + '/src/generated/application.ts',
            output: [{
                file: process.cwd() + "/dist/definition/application.mjs",
                sourcemap: true,
            }],
            plugins: [
                typescript({
                    tsconfigDefaults: {
                        "files": [
                            process.cwd() + "/src/generated/application.ts"
                        ],
                    }
                })
            ],
            watch: {
                clearScreen: false
            }
        },
        {
            input: process.cwd() + '/src/generated/mappedSuperclass.ts',
            output: [{
                file: process.cwd() + "/dist/definition/mappedSuperclass.mjs",
                sourcemap: true,
            }],
            plugins: [
                typescript({
                    tsconfigDefaults: {
                        "files": [
                            process.cwd() + "/src/generated/mappedSuperclass.ts"
                        ],
                    }
                })
            ],
            watch: {
                clearScreen: false
            }
        }
    ]
}
