import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as figmaPlugin from '@figma/eslint-plugin-figma-plugins';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  // CommonJS config files (webpack, postcss, tailwind)
  {
    files: ['*.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      },
    },
  },
  // TypeScript/TSX source files
  {
    files: ['ui/**/*.ts', 'ui/**/*.tsx', 'plugin/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@figma/figma-plugins': figmaPlugin,
    },
    rules: {
      ...figmaPlugin.flatConfigs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
);
