import js from '@eslint/js';
import nodePlugin from 'eslint-plugin-node';
import prettierConfig from 'eslint-config-prettier';

export default [
    // Base JavaScript configuration
    js.configs.recommended,

    // Global settings
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            },
        },
    },

    // Configuration for JavaScript files
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        plugins: {
            node: nodePlugin,
        },
        rules: {
            // Node.js specific rules
            'node/no-unpublished-require': 'off',
            'node/no-missing-require': 'off',
            'node/no-extraneous-require': 'off',

            // General JavaScript rules
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'no-console': 'off', // Allow console in build tools
            'no-process-exit': 'off', // Allow process.exit in CLI tools
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-spacing': 'error',
            'comma-dangle': ['error', 'never'],
            quotes: ['error', 'single', { allowTemplateLiterals: true }],
            semi: ['error', 'always'],
        },
    },

    // Configuration for TypeScript files (if any)
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            // TypeScript specific rules would go here
        },
    },

    // Configuration for build and tool scripts
    {
        files: ['tools/**/*.js', 'scripts/**/*.js', 'build/**/*.js'],
        rules: {
            'no-console': 'off',
            'no-process-exit': 'off',
        },
    },

    // Configuration for test files
    {
        files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                jest: 'readonly',
            },
        },
        rules: {
            'no-unused-expressions': 'off',
        },
    },

    // Browser code: enable browser globals
    {
        files: ['frameworks/**/src/**/*.js'],
        languageOptions: {
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                location: 'readonly',
                HTMLElement: 'readonly',
                Event: 'readonly',
                Node: 'readonly',
            },
        },
        env: { browser: true },
    },

    // Prettier compatibility (must be last)
    prettierConfig,

    // Global ignores
    {
        ignores: [
            'node_modules/**',
            '**/node_modules/**',
            'dist/**',
            '**/dist/**',
            'build/**',
            '**/build/**',
            '_site/**',
            '**/_site/**',
            'public/**',
            '**/public/**',
            '.next/**',
            '**/.next/**',
            '.nuxt/**',
            '**/.nuxt/**',
            '.svelte-kit/**',
            '**/.svelte-kit/**',
            '.cache/**',
            '**/.cache/**',
            'coverage/**',
            '**/coverage/**',
            '.husky/**',
            '**/.husky/**',
            '_DEPRECATED/**',
            '_DEPRECATED--post-ssg/**',
            '*.min.js',
            '**/*.min.js',
            'vendor/**',
            '**/vendor/**',
        ],
    },
];
