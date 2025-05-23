#!/bin/sh
npx esbuild app.ts --bundle --outfile=app.js --format=iife --target=es6
npx serve .