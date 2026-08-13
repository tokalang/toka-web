# Toka Web

Official website and browser playground for the Toka programming language.

## Repository boundary

This repository owns the presentation, browser playground, and deployment of
the Toka website. It does not define language semantics, compiler behavior, or
standard-library contracts. Those remain authoritative in
[`tokalang/toka`](https://github.com/tokalang/toka).

The repository is currently a migration scaffold. Website and playground
sources will move here in a reviewed change, together with their build and
deployment workflows. Browser compiler artifacts must be consumed from a
pinned Toka revision or release rather than rebuilt from an implicit checkout.

## License

Apache License 2.0. See [LICENSE](LICENSE).
Official Toka website and browser playground
