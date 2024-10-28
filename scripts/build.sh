#!/bin/bash

bun build \
	--compile \
	--outfile server \
	--target node \
	--minify-whitespace \
	--minify-syntax \
	--external "@mysten/sui" \
	--entrypoint ./src/index.ts
