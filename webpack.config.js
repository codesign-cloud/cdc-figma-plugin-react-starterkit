const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const path = require('path');

module.exports = (env, argv) => {

  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',

    // This is necessary because Figma's 'eval' behaves differently than the standard 'eval'
    devtool: isProduction ? false : 'inline-source-map',

    entry: {
      ui: './ui/index.tsx', // The entry point for your UI code
      code: './plugin/pluginController.ts', // The entry point for your plugin code
    },

    module: {
      rules: [
        // Converts TypeScript code to JavaScript
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        {
          test: /\.css$/,
          use: [
            'style-loader',   // Injects <style>s into the DOM
            'css-loader',     // Translates CSS into js-consumable format
            'postcss-loader', // Processes CSS with PostCSS
          ]
        },

        // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
        { test: /\.(png|jpg|gif|webp|svg)$/, use: 'url-loader' },
      ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
      new HtmlWebpackPlugin({
        template: './ui/index.html',
        filename: 'index.html',
        chunks: ['ui'],
        cache: false,
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
    ],
  };
};
