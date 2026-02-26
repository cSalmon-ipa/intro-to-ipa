/// <reference types="./src/vite-env.d.ts" />
/// <reference types="vitest/config" />

import path from 'path';

import react from '@vitejs/plugin-react';

import { defineConfig, loadEnv } from 'vite';

const ReactCompilerConfig = { target: '18' };

const resolve = {
	alias: {
		actions: path.resolve(__dirname, './src/actions'),
		components: path.resolve(__dirname, './src/components'),
		containers: path.resolve(__dirname, './src/containers'),
		hooks: path.resolve(__dirname, './src/hooks'),
		pages: path.resolve(__dirname, './src/pages'),
		reducers: path.resolve(__dirname, './src/reducers'),
		style: path.resolve(__dirname, './src/style'),
		tests: path.resolve(__dirname, './src/tests'),
		utils: path.resolve(__dirname, './src/utils'),
		i18n: path.resolve(__dirname, './src/i18n'),
		validators: path.resolve(__dirname, './src/validators'),
	},
};

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const target = env.VITE_API_TARGET;
	let appUrl = target;

	if (mode === 'UAT') {
		appUrl = 'https://uat.platform.ipaglobal.com';
	} else if (mode === 'production') {
		appUrl = 'https://platform.ipaglobal.com';
	}
	return {
		define: {
			__APPLICATION_URL__: JSON.stringify(appUrl),
			__VERSION__: JSON.stringify(process.env.npm_package_version),
			__MODE__: JSON.stringify(mode),
		},
		plugins: [
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
				},
			}),
		],
		server: {
			proxy: {
				'/api': {
					target: target,
					changeOrigin: true,
				},
			},
		},
		resolve,
		test: {
			projects: [
				{
					resolve,
					test: {
						name: 'app',
						environment: 'happy-dom',
						css: true,
						setupFiles: './src/utils/TestSetup.ts',
					},
				},
			],
		},
	};
});
