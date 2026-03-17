const fs = require('fs/promises');
const path = require('path');

const UniversalBuilder = require('./UniversalBuilder');

const cliRun = async () => {
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
        logLevel === 'debug' && console.error('❌ Universal build failed:', error.message);
        process.exit(1);
    }
};

if (require.main === module) {
    cliRun();
}