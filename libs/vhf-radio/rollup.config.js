import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'

// const production = !process.env.ROLLUP_WATCH
const production = false

export default {
	input: 'src/vhf-radio.index.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: '../../../AIRbridge/UI/react/main/public/client/build/bundle.js'
	},
	plugins: [
		del({ targets: 'dist/*' }),
		peerDepsExternal(),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}
