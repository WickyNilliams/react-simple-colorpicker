var webpack = require("webpack")

module.exports = {

  output: {
    library: "ColorPicker",
    libraryTarget: "umd"
  },

  externals: [{
    "react": {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom"
    }
  }],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]

};