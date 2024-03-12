#!/usr/bin/env zx

const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));

let [a, b, c] = pkg.version.split('.');
c = Number(c) + 1 + '';
pkg.version = `${a}.${b}.${c}`;
await fs.writeFile('package.json', JSON.stringify(pkg, null, 2));

const v = pkg.version;

await $`yarn build`;
await $`git add . && git commit -m "Release ${v}"`;
await $`npm publish --access public`;
await $`git push`;
