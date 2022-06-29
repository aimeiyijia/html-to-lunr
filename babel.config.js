// the file is used for jest testing & site building
// > 2%, make template string not compiled to concat, since it's not fast
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: ">2%, not IE 11",
        modules: false,
      },
      "@babel/preset-typescript"
    ],
  ],
  plugins: [
    "@babel/plugin-external-helpers",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: { version: 3, proposals: true },
        useESModules: true,
      },
    ],
  ],
}
