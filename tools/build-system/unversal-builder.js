class UniversalBuilder {
    constructor() {
        this.frameworks = [
            { name: 'custom-handlebars', type: 'node', buildCmd: 'node generate.js' },
            { name: 'custom-html-templates', type: 'node', buildCmd: 'node build.js' }
        ];

        this.setupEnvMapper = {
            node: this.setupNodeEnvironment,
            go: this.setupGoEnvironment,
            ruby: this.setupRubyEnvironment,
            python: this.setupPythonEnvironment
        }
    }

    async buildAll() {
        const results = await Promise.allSettled(
            this.frameworks.map(framework => this.buildFramework(framework))
        );

        return this.generateBuildReport(results);
    }

    async buildFramework(framework) {
        const startTime = Date.now();

        try {
            await this.setupEnvironment(framework);
            await this.syncSharedAssets(framework);
            await this.executeBuild(framework);

            const buildTime = Date.now() - startTime;
            return { framework: framework.name, status: 'success', buildTime };
        } catch (error) {
            return { framework: framework.name, status: 'error', error: error.message };
        }
    }



    async setupEnvironment(framework) {
        const setupFunction = this.setupEnvMapper[framework.type];
        if (!setupFunction) {
            throw new Error(`Unknown framework type: ${framework.type}`);
        }
        return setupFunction.call(this, framework);

    }
}