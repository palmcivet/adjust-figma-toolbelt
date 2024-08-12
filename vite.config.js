import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";

const BANNER = `/* eslint-disable */
// ==UserScript==
// @name        ${pkg.name}
// @namespace   ${pkg.repository}
// @version     ${pkg.version}
// @license     ${pkg.license}
// @author      ${pkg.author}
// @updateURL   ${pkg.homepage}/index.js
// @description ${pkg.name} is a versatile script designed to enhance your Figma experience by allowing you to reposition the toolbelt with ease.
// @match       https://www.figma.com/design/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// ==/UserScript==`;

export default defineConfig({
  esbuild: {
    banner: BANNER,
  },
  build: {
    minify: false,
    lib: {
      name: "adjust",
      formats: ["iife"],
      fileName: () => `main.js`,
      entry: path.resolve(__dirname, "src/main.ts"),
    },
  },
});
