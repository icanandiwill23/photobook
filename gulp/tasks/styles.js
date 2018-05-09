const gulp         = require("gulp"),
      postcss      = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssvars      = require("postcss-simple-vars"),
      cssimport    = require("postcss-import"),
      cssnested    = require("postcss-nested"),
      cssmixins    = require("postcss-mixins");

gulp.task("styles", function(){
  return gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([cssimport, cssvars, cssmixins, autoprefixer, cssnested]))
    .on("error", function(errorInfo){
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
});
