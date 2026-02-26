import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tsParser from '@typescript-eslint/parser';

import eslintconfigprettier from 'eslint-config-prettier/flat';
import oxlint from 'eslint-plugin-oxlint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwind from 'eslint-plugin-tailwindcss';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line no-default-export
export default defineConfig([
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	reactHooks.configs.flat['recommended-latest'],
	...tailwind.configs['flat/recommended'],
	...pluginQuery.configs['flat/recommended'],
	{
		ignores: [
			'eslint.config.js',
			'tailwind.config.js',
			'postcss.config.js',
			'./**/i18n/**',
			'vite.config.ts',
			'dist',
			'node_modules',
			'public',
		],
	},
	{
		name: 'general',
		files: ['./**/*.(js|ts|jsx|tsx)'],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.vitest,
				...globals.builtin,
				NodeJS: true,
				__VERSION__: true,
			},
			ecmaVersion: 2018,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		name: 'react',
		settings: {
			react: {
				version: 'detect',
			},
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			react,
		},
		rules: {
			'react/jsx-pascal-case': 'error',
			'react/jsx-no-leaked-render': [
				'error',
				{
					validStrategies: ['ternary'],
				},
			],
			'react/jsx-max-depth': [
				'error',
				{
					max: 7,
				},
			],
			'react/jsx-fragments': 'error',
			'react/jsx-sort-props': 'error',
			'react/jsx-one-expression-per-line': 'off',
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
				},
			],
			'react/destructuring-assignment': [
				'error',
				'always',
				{
					destructureInSignature: 'always',
				},
			],
			'react/prefer-stateless-function': 'error',
			'react/no-unused-prop-types': 'error',
			'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
			'react/display-name': 'warn',
		},
	},
	{
		name: 'react-extra',
		plugins: {
			'react-refresh': reactRefresh,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	{
		name: 'tailwind',
		rules: {
			'tailwindcss/no-custom-classname': 'off',
		},
	},
	{
		name: 'query',
		rules: {
			'@tanstack/query/exhaustive-deps': 'warn',
		},
	},
	{
		name: 'typescript',
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.vitest,
				NodeJS: true,
				__VERSION__: true,
			},
			ecmaVersion: 2018,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
	eslintconfigprettier,
]);
