import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dashboardDir = path.join(__dirname, '..');
const includedDirectories = [path.join(dashboardDir, 'core'), path.join(dashboardDir, 'scripts')];

const rules = [
    {
        id: 'no-inline-dom-handlers',
        message: 'Avoid inline DOM event handlers in generated markup; use delegated listeners instead.',
        test: /\son[a-z]+\s*=/i,
    },
    {
        id: 'no-javascript-urls',
        message: 'Avoid javascript: URLs in dashboard markup or runtime code.',
        test: /javascript\s*:/i,
    },
    {
        id: 'no-dom-on-properties',
        message: 'Avoid assigning DOM on* properties; use addEventListener instead.',
        test: /\.(?:onabort|onblur|onchange|onclick|onerror|onfocus|oninput|onkeydown|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onreset|onresize|onscroll|onsubmit)\s*=/i,
    },
];

async function getJavaScriptFiles(dirPath) {
    const directoryEntries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(
        directoryEntries.map(async (entry) => {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                return getJavaScriptFiles(fullPath);
            }

            if (entry.isFile() && entry.name.endsWith('.js')) {
                return [fullPath];
            }

            return [];
        })
    );

    return files.flat();
}

function findViolations(content, filePath) {
    const violations = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        rules.forEach((rule) => {
            if (rule.test.test(line)) {
                violations.push({
                    filePath,
                    lineNumber: index + 1,
                    ruleId: rule.id,
                    message: rule.message,
                });
            }
        });
    });

    return violations;
}

async function runDashboardLint() {
    const nestedFiles = await Promise.all(includedDirectories.map((dirPath) => getJavaScriptFiles(dirPath)));
    const files = nestedFiles.flat().filter((filePath) => !filePath.endsWith('.test.js'));
    const results = await Promise.all(
        files.map(async (filePath) => {
            const content = await fs.promises.readFile(filePath, 'utf-8');
            return findViolations(content, filePath);
        })
    );

    const violations = results.flat();

    if (violations.length > 0) {
        const formatted = violations
            .map(
                (violation) =>
                    `${path.relative(process.cwd(), violation.filePath)}:${violation.lineNumber} [${violation.ruleId}] ${violation.message}`
            )
            .join('\n');
        throw new Error(`Dashboard lint failed:\n${formatted}`);
    }

    console.log(`Dashboard lint passed for ${files.length} files.`);
}

runDashboardLint().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
