# Contributing

This repository owns the Toka website, browser playground UI, and deployment.
Language, compiler, and standard-library changes belong in
[`tokalang/toka`](https://github.com/tokalang/toka).

Keep changes narrow and do not copy compiler design plans, qualification
probes, generated site output, browser compiler binaries, or credentials into
this repository. Before opening a pull request, run:

```bash
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Changes to `compiler.lock.json` must identify an exact 40-character Toka commit
and remain compatible with the Emscripten version recorded in that file.
