# Third-party notices

The website build uses Astro, Astro Starlight, and Sharp under their respective
MIT and Apache-2.0 licenses. Sharp's prebuilt binary packages may include
libvips, licensed under LGPL-3.0-or-later. Exact package versions, declared
licenses, and transitive dependency metadata are recorded in
`package-lock.json`; the build emits a machine-readable inventory into the
published site.

The browser playground packages these runtime dependencies into the site:

- CodeMirror 5.65.13 — MIT License.
- `@bjorn3/browser_wasi_shim` 0.2.17 — MIT OR Apache-2.0.

Their license texts are copied from the exact locked npm packages into the
published site's `/licenses/` directory. The generated runtime copies are not
committed to this repository.
