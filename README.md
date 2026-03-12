# C++ / WebAssembly Demo

This repo demonstrates compiling a C++ source file for execution in a web browser.

We use [Emscripten](https://emscripten.org) to compile the source and generate a WebAssembly file (`.wasm`) that can be loaded via JavaScript in most modern browsers.

Run `make` to build and run the demo on http://localhost (this uses the [emscripten/emsdk](https://hub.docker.com/r/emscripten/emsdk) and [nginx](https://hub.docker.com/_/nginx) Docker images).

See the demo live on GitHub Pages at https://tomcant.dev/cpp-wasm-demo.
