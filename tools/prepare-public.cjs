const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const playgroundDir = path.join(publicDir, 'playground');
const playgroundVendorDir = path.join(publicDir, 'playground', 'vendor');
const licenseDir = path.join(publicDir, 'licenses');

function copyDependencyFile(packageName, relativePath, destination) {
    const packageRoot = path.join(root, 'node_modules', packageName);
    fs.copyFileSync(path.join(packageRoot, relativePath), destination);
}

fs.mkdirSync(publicDir, { recursive: true });
fs.rmSync(playgroundDir, { recursive: true, force: true });
fs.mkdirSync(playgroundDir, { recursive: true });
fs.mkdirSync(playgroundVendorDir, { recursive: true });
fs.rmSync(licenseDir, { recursive: true, force: true });
fs.mkdirSync(licenseDir, { recursive: true });
fs.copyFileSync(path.join(root, 'LICENSE'), path.join(publicDir, 'LICENSE.txt'));
fs.copyFileSync(
    path.join(root, 'THIRD_PARTY_NOTICES.md'),
    path.join(publicDir, 'THIRD_PARTY_NOTICES.txt')
);

for (const runtimeFile of [
    'app.js',
    'index.html',
    'style.css',
    'toka_mode.js',
    'tokacheck.js',
    'tokacheck.wasm'
]) {
    fs.copyFileSync(
        path.join(root, 'playground', runtimeFile),
        path.join(playgroundDir, runtimeFile)
    );
}

for (const [source, destination] of [
    ['lib/codemirror.css', 'codemirror.css'],
    ['lib/codemirror.js', 'codemirror.js'],
    ['theme/material-darker.css', 'material-darker.css'],
    ['addon/lint/lint.css', 'lint.css'],
    ['addon/lint/lint.js', 'lint.js'],
    ['addon/mode/simple.js', 'simple.js']
]) {
    copyDependencyFile(
        'codemirror',
        source,
        path.join(playgroundVendorDir, destination)
    );
}

copyDependencyFile('codemirror', 'LICENSE', path.join(licenseDir, 'CodeMirror-MIT.txt'));
copyDependencyFile(
    '@bjorn3/browser_wasi_shim',
    'LICENSE-MIT',
    path.join(licenseDir, 'browser_wasi_shim-MIT.txt')
);
copyDependencyFile(
    '@bjorn3/browser_wasi_shim',
    'LICENSE-APACHE',
    path.join(licenseDir, 'browser_wasi_shim-Apache-2.0.txt')
);

esbuild.buildSync({
    entryPoints: [path.join(root, 'node_modules', '@bjorn3', 'browser_wasi_shim', 'dist', 'index.js')],
    outfile: path.join(playgroundVendorDir, 'browser_wasi_shim.js'),
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    legalComments: 'none'
});

const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
const inventory = Object.entries(lock.packages)
    .filter(([location, metadata]) => location.startsWith('node_modules/') && metadata.version)
    .map(([location, metadata]) => ({
        name: location.slice('node_modules/'.length),
        version: metadata.version,
        license: metadata.license || 'UNKNOWN'
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

fs.writeFileSync(
    path.join(publicDir, 'THIRD_PARTY_LICENSES.json'),
    `${JSON.stringify({ schema: 'toka.web-third-party-licenses', version: 1, packages: inventory }, null, 2)}\n`
);
