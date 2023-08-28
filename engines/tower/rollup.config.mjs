import { getLibBuildConfig } from '@airport/taxiway/rollup/lib-build.mjs'
import copy from 'rollup-plugin-copy'

export default getLibBuildConfig('tower', copy({
    targets: [{
        src: process.cwd() + '/artifacts/index.html',
        dest: 'dist'
    }]
}))
