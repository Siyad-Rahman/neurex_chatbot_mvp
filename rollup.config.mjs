import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig([
  // UMD/IIFE build (for <script> tags)
  {
    input: "src/chatbot.js",
    output: {
      file: "dist/chatbot.umd.js",
      format: "iife",
      name: "NeurexChatBot", // Global variable name for <script> usage
      sourcemap: true,
    },
    plugins: [terser()],
  },

  // ESM build (for import/export usage)
  {
    input: "src/chatbot.js",
    output: {
      file: "dist/chatbot.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [terser()],
  },
]);
