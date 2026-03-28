// copy files from ../src to ./dist
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

fs.mkdirSync(distDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const distFile = path.join(distDir, file);
    fs.copyFileSync(srcFile, distFile);
});
