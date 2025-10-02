const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class UniversalBuilder {
    constructor() {
        this.frameworks = [
            // JavaScript/TypeScript Ecosystem
            {
                name: 'nextjs',
                type: 'node',
                path: 'frameworks/javascript/nextjs',
                buildCmd: 'npm run build',
                priority: 'P0',
            },
            {
                name: 'nuxtjs',
                type: 'node',
                path: 'frameworks/javascript/nuxtjs',
                buildCmd: 'npm run build',
                priority: 'P0',
            },
            {
                name: 'sveltekit',
                type: 'node',
                path: 'frameworks/javascript/sveltekit',
                buildCmd: 'npm run build',
                priority: 'P0',
            },
            {
                name: 'astro',
                type: 'node',
                path: 'frameworks/javascript/astro',
                buildCmd: 'npm run build',
                priority: 'P0',
            },
            {
                name: 'gatsby',
                type: 'node',
                path: 'frameworks/javascript/gatsby',
                buildCmd: 'npm run build',
                priority: 'P1',
            },
            {
                name: 'remix',
                type: 'node',
                path: 'frameworks/javascript/remix',
                buildCmd: 'npm run build',
                priority: 'P1',
            },
            {
                name: '11ty',
                type: 'node',
                path: 'frameworks/javascript/11ty',
                buildCmd: 'npx @11ty/eleventy',
                priority: 'P1',
            },
            {
                name: 'vitepress',
                type: 'node',
                path: 'frameworks/javascript/vitepress',
                buildCmd: 'npm run build',
                priority: 'P2',
            },

            // Go Ecosystem
            { name: 'hugo', type: 'go', path: 'frameworks/go/hugo', buildCmd: 'hugo --minify', priority: 'P0' },

            // Ruby Ecosystem
            {
                name: 'jekyll',
                type: 'ruby',
                path: 'frameworks/ruby/jekyll',
                buildCmd: 'bundle exec jekyll build',
                priority: 'P1',
            },

            // Python Ecosystem
            {
                name: 'pelican',
                type: 'python',
                path: 'frameworks/python/pelican',
                buildCmd: 'pelican content',
                priority: 'P1',
            },
            {
                name: 'sphinx',
                type: 'python',
                path: 'frameworks/python/sphinx',
                buildCmd: 'sphinx-build -b html source build',
                priority: 'P2',
            },
            {
                name: 'custom-python',
                type: 'python',
                path: 'frameworks/custom/python-custom',
                buildCmd: 'python generator.py',
                priority: 'P1',
            },

            // PHP Ecosystem
            { name: 'jigsaw', type: 'php', path: 'frameworks/php/jigsaw', buildCmd: 'jigsaw build', priority: 'P2' },
            {
                name: 'wp2static',
                type: 'php',
                path: 'frameworks/php/wp2static',
                buildCmd: 'wp wp2static generate',
                priority: 'P2',
            },

            // Specialized/Niche
            {
                name: 'squido',
                type: 'node',
                path: 'frameworks/specialized/squido',
                buildCmd: 'npx squido build',
                priority: 'P2',
            },

            // Custom Solutions
            {
                name: 'custom-handlebars',
                type: 'node',
                path: 'frameworks/custom/handlebars',
                buildCmd: 'node generate.js',
                priority: 'P0',
            },
            {
                name: 'custom-html-templates',
                type: 'node',
                path: 'frameworks/custom/html-templates',
                buildCmd: 'node build.js',
                priority: 'P0',
            },
        ];

        this.setupEnvMapper = {
            node: this.setupNodeEnvironment,
            go: this.setupGoEnvironment,
            ruby: this.setupRubyEnvironment,
            python: this.setupPythonEnvironment,
            php: this.setupPhpEnvironment,
        };

        this.buildMetrics = {
            total: 0,
            successful: 0,
            failed: 0,
            startTime: null,
            endTime: null,
            frameworks: [],
        };

        this.rootPath = process.cwd();
    }

    async buildAll(options = {}) {
        const {
            priority = null, // P0, P1, P2 or null for all
            parallel = true,
            maxConcurrency = 4,
            skipSetup = false,
        } = options;

        console.log('🚀 Starting Universal Multi-SSG Build Process...');
        this.buildMetrics.startTime = Date.now();

        // Filter frameworks by priority if specified
        const frameworksToBuild = priority ? this.frameworks.filter((fw) => fw.priority === priority) : this.frameworks;

        console.log(`📋 Building ${frameworksToBuild.length} frameworks${priority ? ` (Priority: ${priority})` : ''}`);

        let results;
        if (parallel) {
            results = await this.buildFrameworksParallel(frameworksToBuild, maxConcurrency, skipSetup);
        } else {
            results = await this.buildFrameworksSequential(frameworksToBuild, skipSetup);
        }

        this.buildMetrics.endTime = Date.now();
        this.buildMetrics.total = frameworksToBuild.length;

        return this.generateBuildReport(results);
    }

    async buildFrameworksParallel(frameworks, maxConcurrency, skipSetup) {
        const chunks = this.chunkArray(frameworks, maxConcurrency);
        const allResults = [];

        for (const chunk of chunks) {
            console.log(`⚡ Building batch of ${chunk.length} frameworks in parallel...`);
            const chunkResults = await Promise.allSettled(
                chunk.map((framework) => this.buildFramework(framework, skipSetup))
            );
            allResults.push(...chunkResults);
        }

        return allResults;
    }

    async buildFrameworksSequential(frameworks, skipSetup) {
        const results = [];

        for (const framework of frameworks) {
            console.log(`🔨 Building ${framework.name} (${framework.type})...`);
            const result = await this.buildFramework(framework, skipSetup);
            results.push({ status: 'fulfilled', value: result });
        }

        return results;
    }

    async buildFramework(framework, skipSetup = false) {
        const startTime = Date.now();
        const frameworkPath = path.join(this.rootPath, framework.path);

        try {
            // Check if framework directory exists
            await this.ensureFrameworkExists(frameworkPath, framework);

            if (!skipSetup) {
                await this.setupEnvironment(framework, frameworkPath);
                await this.syncSharedAssets(framework, frameworkPath);
            }

            const buildResult = await this.executeBuild(framework, frameworkPath);
            const buildMetrics = await this.collectBuildMetrics(framework, frameworkPath);

            const buildTime = Date.now() - startTime;
            const result = {
                framework: framework.name,
                type: framework.type,
                priority: framework.priority,
                status: 'success',
                buildTime,
                metrics: buildMetrics,
                output: buildResult,
            };

            this.buildMetrics.successful++;
            this.buildMetrics.frameworks.push(result);

            console.log(`✅ ${framework.name} built successfully in ${buildTime}ms`);
            return result;
        } catch (error) {
            const buildTime = Date.now() - startTime;
            const result = {
                framework: framework.name,
                type: framework.type,
                priority: framework.priority,
                status: 'error',
                buildTime,
                error: error.message,
                stack: error.stack,
            };

            this.buildMetrics.failed++;
            this.buildMetrics.frameworks.push(result);

            console.error(`❌ ${framework.name} build failed: ${error.message}`);
            return result;
        }
    }

    async ensureFrameworkExists(frameworkPath, framework) {
        try {
            await fs.access(frameworkPath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  Framework directory not found: ${framework.path}`);
                console.log(`📁 Creating scaffold for ${framework.name}...`);
                await this.createFrameworkScaffold(framework, frameworkPath);
            } else {
                throw error;
            }
        }
    }

    async createFrameworkScaffold(framework, frameworkPath) {
        await fs.mkdir(frameworkPath, { recursive: true });

        // Create basic structure based on framework type
        switch (framework.type) {
            case 'node':
                await this.createNodeScaffold(framework, frameworkPath);
                break;
            case 'go':
                await this.createGoScaffold(framework, frameworkPath);
                break;
            case 'ruby':
                await this.createRubyScaffold(framework, frameworkPath);
                break;
            case 'python':
                await this.createPythonScaffold(framework, frameworkPath);
                break;
            case 'php':
                await this.createPhpScaffold(framework, frameworkPath);
                break;
        }
    }

    async createNodeScaffold(framework, frameworkPath) {
        const packageJson = {
            name: `frontend-playground-${framework.name}`,
            version: '1.0.0',
            private: true,
            scripts: {
                build: framework.buildCmd.replace('npm run ', ''),
                dev: "echo 'Development server not configured'",
                start: "echo 'Start command not configured'",
            },
            dependencies: {},
            devDependencies: {},
        };

        await fs.writeFile(path.join(frameworkPath, 'package.json'), JSON.stringify(packageJson, null, 2));

        // Create basic README
        const readme = `# ${framework.name} Implementation\n\nThis is a ${framework.name} implementation of the Frontend Playground components.\n\n## Getting Started\n\n\`\`\`bash\nnpm install\nnpm run build\n\`\`\`\n`;
        await fs.writeFile(path.join(frameworkPath, 'README.md'), readme);
    }

    async createGoScaffold(framework, frameworkPath) {
        // Create Hugo config
        const hugoConfig = `baseURL = "https://frontend-playground.dev"\nlanguageCode = "en-us"\ntitle = "Frontend Playground - Hugo"\ntheme = "custom"\n`;
        await fs.writeFile(path.join(frameworkPath, 'config.toml'), hugoConfig);

        // Create content and themes directories
        await fs.mkdir(path.join(frameworkPath, 'content'), { recursive: true });
        await fs.mkdir(path.join(frameworkPath, 'themes/custom/layouts'), { recursive: true });
    }

    async createRubyScaffold(framework, frameworkPath) {
        // Create Jekyll config
        const jekyllConfig = `title: Frontend Playground - Jekyll\ndescription: Jekyll implementation of frontend components\nbaseurl: ""\nurl: ""\nmarkdown: kramdown\n`;
        await fs.writeFile(path.join(frameworkPath, '_config.yml'), jekyllConfig);

        // Create Gemfile
        const gemfile = `source "https://rubygems.org"\ngem "jekyll", "~> 4.2"\n`;
        await fs.writeFile(path.join(frameworkPath, 'Gemfile'), gemfile);
    }

    async createPythonScaffold(framework, frameworkPath) {
        if (framework.name === 'pelican') {
            // Create Pelican config
            const pelicanConfig = `AUTHOR = 'Frontend Playground'\nSITENAME = 'Frontend Playground - Pelican'\nSITEURL = ''\nPATH = 'content'\nTIMEZONE = 'UTC'\n`;
            await fs.writeFile(path.join(frameworkPath, 'pelicanconf.py'), pelicanConfig);
        }

        // Create requirements.txt
        const requirements = framework.name === 'pelican' ? 'pelican\nmarkdown\n' : 'jinja2\n';
        await fs.writeFile(path.join(frameworkPath, 'requirements.txt'), requirements);
    }

    async createPhpScaffold(framework, frameworkPath) {
        // Create composer.json
        const composerJson = {
            name: `frontend-playground/${framework.name}`,
            description: `${framework.name} implementation`,
            require: {},
            'require-dev': {},
        };

        await fs.writeFile(path.join(frameworkPath, 'composer.json'), JSON.stringify(composerJson, null, 2));
    }

    async setupEnvironment(framework, frameworkPath) {
        const setupFunction = this.setupEnvMapper[framework.type];
        if (!setupFunction) {
            throw new Error(`Unknown framework type: ${framework.type}`);
        }
        return setupFunction.call(this, framework, frameworkPath);
    }

    async setupNodeEnvironment(framework, frameworkPath) {
        try {
            // Check if package.json exists
            await fs.access(path.join(frameworkPath, 'package.json'));

            // Install dependencies
            console.log(`📦 Installing Node.js dependencies for ${framework.name}...`);
            await execAsync('npm install', { cwd: frameworkPath });
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  No package.json found for ${framework.name}, skipping npm install`);
            } else {
                throw error;
            }
        }
    }

    async setupGoEnvironment(framework, frameworkPath) {
        // Check if Hugo is installed
        console.log(`🔍 Checking for Hugo installation in ${frameworkPath}...`);
        try {
            await execAsync('hugo version');
            console.log(`✅ Hugo is available for ${framework.name}`);
        } catch (error) {
            throw new Error(
                'Hugo is not installed. Please install Hugo: https://gohugo.io/getting-started/installing/',
                error
            );
        }
    }

    async setupRubyEnvironment(framework, frameworkPath) {
        try {
            // Check if Gemfile exists
            await fs.access(path.join(frameworkPath, 'Gemfile'));

            // Install gems
            console.log(`💎 Installing Ruby gems for ${framework.name}...`);
            await execAsync('bundle install', { cwd: frameworkPath });
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  No Gemfile found for ${framework.name}, skipping bundle install`);
            } else {
                throw error;
            }
        }
    }

    async setupPythonEnvironment(framework, frameworkPath) {
        try {
            // Check if requirements.txt exists
            await fs.access(path.join(frameworkPath, 'requirements.txt'));

            // Install requirements
            console.log(`🐍 Installing Python requirements for ${framework.name}...`);
            await execAsync('pip install -r requirements.txt', { cwd: frameworkPath });
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  No requirements.txt found for ${framework.name}, skipping pip install`);
            } else {
                throw error;
            }
        }
    }

    async setupPhpEnvironment(framework, frameworkPath) {
        try {
            // Check if composer.json exists
            await fs.access(path.join(frameworkPath, 'composer.json'));

            // Install dependencies
            console.log(`🎼 Installing PHP dependencies for ${framework.name}...`);
            await execAsync('composer install', { cwd: frameworkPath });
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  No composer.json found for ${framework.name}, skipping composer install`);
            } else {
                throw error;
            }
        }
    }

    async syncSharedAssets(framework, frameworkPath) {
        const sharedPath = path.join(this.rootPath, 'shared');
        const targetAssetsPath = path.join(frameworkPath, 'assets');

        try {
            await fs.access(sharedPath);
            console.log(`🔄 Syncing shared assets for ${framework.name}...`);

            // Create assets directory if it doesn't exist
            await fs.mkdir(targetAssetsPath, { recursive: true });

            // Copy shared assets (simplified version)
            // In a real implementation, you might use rsync or a more sophisticated copying mechanism
            await this.copyDirectory(path.join(sharedPath, 'core/assets'), targetAssetsPath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`⚠️  No shared assets found, skipping sync for ${framework.name}`);
            } else {
                throw error;
            }
        }
    }

    async copyDirectory(src, dest) {
        try {
            await fs.access(src);
            await fs.mkdir(dest, { recursive: true });

            const entries = await fs.readdir(src, { withFileTypes: true });

            for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);

                if (entry.isDirectory()) {
                    await this.copyDirectory(srcPath, destPath);
                } else {
                    await fs.copyFile(srcPath, destPath);
                }
            }
        } catch (error) {
            // Ignore if source doesn't exist
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    }

    async executeBuild(framework, frameworkPath) {
        console.log(`🔨 Executing build for ${framework.name}: ${framework.buildCmd}`);

        const { stdout, stderr } = await execAsync(framework.buildCmd, {
            cwd: frameworkPath,
            timeout: 300000, // 5 minutes timeout
        });

        return { stdout, stderr };
    }

    async collectBuildMetrics(framework, frameworkPath) {
        const metrics = {
            bundleSize: 0,
            outputFiles: 0,
            buildTime: 0,
        };

        try {
            // Common output directories to check
            const outputDirs = ['dist', 'build', '_site', 'public', 'output'];

            for (const dir of outputDirs) {
                const outputPath = path.join(frameworkPath, dir);
                try {
                    await fs.access(outputPath);
                    const size = await this.getDirectorySize(outputPath);
                    const fileCount = await this.getFileCount(outputPath);

                    metrics.bundleSize = size;
                    metrics.outputFiles = fileCount;
                    break;
                } catch (error) {
                    // Directory doesn't exist, try next
                    console.log(
                        `⚠️  No output directory found for ${framework.name}, skipping metric collection`,
                        error.message
                    );
                    continue;
                }
            }
        } catch (error) {
            console.log(`⚠️  Could not collect metrics for ${framework.name}: ${error.message}`);
        }

        return metrics;
    }

    async getDirectorySize(dirPath) {
        let totalSize = 0;

        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                if (entry.isDirectory()) {
                    totalSize += await this.getDirectorySize(fullPath);
                } else {
                    const stats = await fs.stat(fullPath);
                    totalSize += stats.size;
                }
            }
        } catch (error) {
            console.log(`⚠️  Error reading directory ${dirPath}: ${error.message}`);
            // Ignore errors
        }

        return totalSize;
    }

    async getFileCount(dirPath) {
        let fileCount = 0;

        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                if (entry.isDirectory()) {
                    fileCount += await this.getFileCount(path.join(dirPath, entry.name));
                } else {
                    fileCount++;
                }
            }
        } catch (error) {
            console.log(`⚠️  Error reading directory ${dirPath}: ${error.message}`);
            // Ignore errors
        }

        return fileCount;
    }

    chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    generateBuildReport(results) {
        const totalTime = this.buildMetrics.endTime - this.buildMetrics.startTime;
        const successful = results.filter((r) => r.status === 'fulfilled' && r.value.status === 'success');
        const failed = results.filter(
            (r) => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.status === 'error')
        );

        const report = {
            summary: {
                total: this.buildMetrics.total,
                successful: successful.length,
                failed: failed.length,
                totalTime: `${(totalTime / 1000).toFixed(2)}s`,
                successRate: `${((successful.length / this.buildMetrics.total) * 100).toFixed(1)}%`,
            },
            frameworks: this.buildMetrics.frameworks,
            failedBuilds: failed.map((f) => ({
                framework: f.status === 'fulfilled' ? f.value.framework : 'unknown',
                error: f.status === 'fulfilled' ? f.value.error : f.reason?.message || 'Unknown error',
            })),
        };

        // Console output
        console.log('\n📊 Build Report:');
        console.log(`✅ Successful: ${successful.length}/${this.buildMetrics.total}`);
        console.log(`❌ Failed: ${failed.length}/${this.buildMetrics.total}`);
        console.log(`⏱️  Total Time: ${report.summary.totalTime}`);
        console.log(`📈 Success Rate: ${report.summary.successRate}`);

        if (failed.length > 0) {
            console.log('\n❌ Failed Builds:');
            failed.forEach((f) => {
                const framework = f.status === 'fulfilled' ? f.value.framework : 'unknown';
                const error = f.status === 'fulfilled' ? f.value.error : f.reason?.message || 'Unknown error';
                console.log(`   - ${framework}: ${error}`);
            });
        }

        return report;
    }

    // CLI Interface
    static async run() {
        const args = process.argv.slice(2);
        const builder = new UniversalBuilder();

        const options = {
            priority: null,
            parallel: true,
            maxConcurrency: 4,
            skipSetup: false,
        };

        // Parse command line arguments
        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case '--priority':
                    options.priority = args[++i];
                    break;
                case '--sequential':
                    options.parallel = false;
                    break;
                case '--concurrency':
                    options.maxConcurrency = parseInt(args[++i]) || 4;
                    break;
                case '--skip-setup':
                    options.skipSetup = true;
                    break;
                case '--help':
                    console.log(`
Universal SSG Builder

Usage: node universal-builder.js [options]

Options:
  --priority P0|P1|P2    Build only frameworks with specified priority
  --sequential           Build frameworks sequentially instead of parallel
  --concurrency N        Maximum number of parallel builds (default: 4)
  --skip-setup          Skip environment setup and dependency installation
  --help                Show this help message

Examples:
  node universal-builder.js                    # Build all frameworks
  node universal-builder.js --priority P0      # Build only P0 frameworks
  node universal-builder.js --sequential       # Build sequentially
  node universal-builder.js --concurrency 2    # Max 2 parallel builds
                    `);
                    process.exit(0);
                    break;
            }
        }

        try {
            const report = await builder.buildAll(options);

            // Write report to file
            await fs.writeFile(path.join(process.cwd(), 'build-report.json'), JSON.stringify(report, null, 2));

            process.exit(report.summary.failed > 0 ? 1 : 0);
        } catch (error) {
            console.error('❌ Universal build failed:', error.message);
            process.exit(1);
        }
    }
}

// Run if called directly
if (require.main === module) {
    UniversalBuilder.run();
}

module.exports = UniversalBuilder;
