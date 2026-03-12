#!/bin/bash

emcc -O3 square.cpp -o public/square.js \
  -s "EXPORTED_RUNTIME_METHODS=['cwrap']" \
  -s "EXPORTED_FUNCTIONS=['_square']"
