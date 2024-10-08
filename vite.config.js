import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";

const BANNER = `/* eslint-disable */
// ==UserScript==
// @name              ${pkg.name}
// @name:zh-CN        ${pkg.name}
// @namespace         ${pkg.repository}
// @version           ${pkg.version}
// @license           ${pkg.license}
// @author            ${pkg.author}
// @updateURL         https://palmcivet.github.io/${pkg.repository}/main.js
// @description       ${pkg.name} is a versatile script designed to enhance your Figma experience by allowing you to reposition the toolbelt with ease.
// @description:zh-CN ${pkg.name} 是一个用于增强 Figma 体验的脚本，可以轻松地将工具栏调整到想要的位置。
// @match             https://www.figma.com/design/*
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_addStyle
// @grant             GM_registerMenuCommand
// @grant             GM_unregisterMenuCommand
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
