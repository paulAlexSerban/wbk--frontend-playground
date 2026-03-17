const { get } = require('http');

const config = {
    frameworks: [
        // JavaScript/TypeScript Ecosystem
        // {
        //     name: 'nextjs',
        //     type: 'node',
        //     path: 'frameworks/javascript/nextjs',
        //     buildCmd: 'yarn build',
        //     priority: 'P0',
        // },
        // {
        //     name: 'nuxtjs',
        //     type: 'node',
        //     path: 'frameworks/javascript/nuxtjs',
        //     buildCmd: 'yarn build',
        //     priority: 'P0',
        // },
        // {
        //     name: 'sveltekit',
        //     type: 'node',
        //     path: 'frameworks/javascript/sveltekit',
        //     buildCmd: 'yarn build',
        //     priority: 'P0',
        // },
        // {
        //     name: 'astro',
        //     type: 'node',
        //     path: 'frameworks/javascript/astro',
        //     buildCmd: 'yarn build',
        //     priority: 'P0',
        // },
        // {
        //     name: 'gatsby',
        //     type: 'node',
        //     path: 'frameworks/javascript/gatsby',
        //     buildCmd: 'yarn build',
        //     priority: 'P1',
        // },
        // {
        //     name: 'remix',
        //     type: 'node',
        //     path: 'frameworks/javascript/remix',
        //     buildCmd: 'yarn build',
        //     priority: 'P1',
        // },
        // {
        //     name: '11ty',
        //     type: 'node',
        //     path: 'frameworks/javascript/11ty',
        //     buildCmd: 'npx @11ty/eleventy',
        //     priority: 'P1',
        // },
        // {
        //     name: 'vitepress',
        //     type: 'node',
        //     path: 'frameworks/javascript/vitepress',
        //     buildCmd: 'yarn build',
        //     priority: 'P2',
        // },

        // Go Ecosystem
        // { name: 'hugo', type: 'go', path: 'frameworks/go/hugo', buildCmd: 'hugo --minify', priority: 'P0' },

        // Ruby Ecosystem
        // {
        //     name: 'jekyll',
        //     type: 'ruby',
        //     path: 'frameworks/ruby/jekyll',
        //     buildCmd: 'bundle exec jekyll build',
        //     priority: 'P1',
        // },

        // Python Ecosystem
        // {
        //     name: 'pelican',
        //     type: 'python',
        //     path: 'frameworks/python/pelican',
        //     buildCmd: 'pelican content',
        //     priority: 'P1',
        // },
        // {
        //     name: 'sphinx',
        //     type: 'python',
        //     path: 'frameworks/python/sphinx',
        //     buildCmd: 'sphinx-build -b html source build',
        //     priority: 'P2',
        // },
        // {
        //     name: 'custom-python',
        //     type: 'python',
        //     path: 'frameworks/custom/python-custom',
        //     buildCmd: 'python generator.py',
        //     priority: 'P1',
        // },

        // PHP Ecosystem
        // { name: 'jigsaw', type: 'php', path: 'frameworks/php/jigsaw', buildCmd: 'jigsaw build', priority: 'P2' },
        // {
        //     name: 'wp2static',
        //     type: 'php',
        //     path: 'frameworks/php/wp2static',
        //     buildCmd: 'wp wp2static generate',
        //     priority: 'P2',
        // },

        // Specialized/Niche
        // {
        //     name: 'squido',
        //     type: 'node',
        //     path: 'frameworks/specialized/squido',
        //     buildCmd: 'npx squido build',
        //     priority: 'P2',
        // },

        // Custom Solutions
        {
            name: 'custom-handlebars',
            type: 'node',
            path: 'frameworks/custom/handlebars',
            buildCmd: 'yarn build',
            priority: 'P0',
        },
        // {
        //     name: 'custom-html-templates',
        //     type: 'node',
        //     path: 'frameworks/custom/html-templates',
        //     // buildCmd: 'node build.js',
        //     buildCmd: 'echo "Error: no build command specified in custom-html-templates"',
        //     priority: 'P0',
        // },
    ],
};

module.exports = {
    getFrameworksByPriority(priority) {
        return config.frameworks.filter((fw) => fw.priority === priority);
    },
    getAllFrameworks() {
        return config.frameworks;
    },
};
