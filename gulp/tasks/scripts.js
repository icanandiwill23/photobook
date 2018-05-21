const gulp = require("gulp"),
      webpack = require("webpack");

gulp.task("scripts", function(){
  webpack({
    mode: "development",
    entry: {
      App: __dirname + "/../../app/assets/scripts/App.js",
      Vendor: __dirname + "/../../app/assets/scripts/Vendor.js"
    },
    output: {
      path: __dirname + "/../../app/temp/scripts",
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        }
      ]
    }
  }, (err, stats) => {
    if(err){
      console.log(err.toString());
    }
    console.log(stats.toString());
  });
});
