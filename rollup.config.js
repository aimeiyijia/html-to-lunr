import babel from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
export default {
  input: "src/html-to-lunr.ts",
  output: {
    name: "@ame/html-to-lunr",
    file: "dist/html-to-lunr.js",
    format: "umd",
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".es6", ".es", ".mjs"],
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    commonjs(),
    typescript(),
  ],
}
