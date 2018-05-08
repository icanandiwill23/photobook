const gulp         = require("gulp"),
      watch        = require("gulp-watch"),
      postcss      = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssvars      = require("postcss-simple-vars"),
      cssimport    = require("postcss-import"),
      cssnested    = require("postcss-nested"),
      cssmixins    = require("postcss-mixins"),
      browserSync  = require("browser-sync").create();

gulp.task("styles", function(){
  return gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([cssimport, cssvars, cssmixins, autoprefixer, cssnested]))
    .on("error", function(errorInfo){
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", function(){
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch("./app/assets/styles/**/*.css", function(){
    gulp.start("cssInject");
  });

  watch("./app/index.html", function(){
    browserSync.reload();
  });
});

gulp.task("cssInject", ["styles"], function(){
  return gulp.src("./app/temp/styles/styles.css")
    .pipe(browserSync.stream());
});
