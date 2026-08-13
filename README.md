# Toka Web

Official website and browser playground for the
[Toka programming language](https://github.com/tokalang/toka).

## Repository boundary

This repository owns the public website, browser playground UI, and website
deployment. It does not define language semantics, compiler behavior, or
standard-library contracts; those remain authoritative in `tokalang/toka`.

The browser checker is built from the exact Toka revision and Emscripten
version recorded in [compiler.lock.json](compiler.lock.json). This source-build
lock is a migration boundary: it will be replaced by a checksum-pinned Toka
release artifact once the compiler publishes browser assets.

## Development

Node.js 22 is used in CI.

```bash
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

The full browser-checker qualification also requires Emscripten 6.0.6. CI
checks out the locked Toka revision, builds `tokacheck.js` and
`tokacheck.wasm`, runs the playground self-test, and then assembles the static
site. Generated compiler and site artifacts are not committed.

## Migration provenance

Website and playground UI sources were migrated from `tokalang/toka` at
commit `30112d994e8db5e18c524e300cea0ee5f742b24e`. Compiler implementation and
qualification sources remain outside this repository.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Report language, compiler, and standard
library issues in `tokalang/toka`.

## License

Apache License 2.0. See [LICENSE](LICENSE) and
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
