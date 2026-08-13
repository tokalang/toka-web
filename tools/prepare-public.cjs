const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(path.join(root, 'LICENSE'), path.join(publicDir, 'LICENSE.txt'));
fs.copyFileSync(
    path.join(root, 'THIRD_PARTY_NOTICES.md'),
    path.join(publicDir, 'THIRD_PARTY_NOTICES.txt')
);

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
