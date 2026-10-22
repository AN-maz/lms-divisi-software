import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // `node` di-pattern destructuring komponen react-markdown memang dibuang
      // dengan sengaja agar tidak ikut di-spread ke elemen DOM.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^node$', argsIgnorePattern: '^node$' },
      ],
    },
  },
])
