const gulp     = require("gulp"),
      imagemin = require("gulp-imagemin"),
      del      = require("del"),
      usemin   = require("gulp-usemin"),
      rev      = require("gulp-rev"),
      cssnano  = require("gulp-cssnano"),
      uglify   = require("gulp-uglify"),
      htmlmin  = require("gulp-htmlmin"),
      browserSync  = require("browser-sync").create();

gulp.task("previewDist", function(){
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task("deleteDist", ["icons"], function(){
  return del("./dist");
});

gulp.task("generalFiles", ["deleteDist"], function(){
  let pathsToCopy = [
    "./app/**/*",
    "!./app/assets/images/**/*",
    "!./app/assets/styles/**/*",
    "!./app/assets/scripts/**/*",
    "!./app/temp",
    "!./app/temp/**/*"
  ]
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./dist"));
});

gulp.task("optimizeImages", ["deleteDist"], function(){
  return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons/**/*"])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("dashed", ["optimizeImages"], function(){
  return gulp.src("./app/assets/images/icons/dashed.svg")
    .pipe(gulp.dest("./dist/assets/images/icons"));
});

gulp.task("useminTrigger", ["deleteDist"], function(){
  gulp.start("usemin");
});

gulp.task("usemin", ["styles", "scripts"], function(){
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function(){ return cssnano() }, function(){ return rev() }],
      html: [function(){ return htmlmin({collapseWhitespace: true}) }],
      js: [function(){ return uglify() }, function(){ return rev()  }]
    }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["deleteDist", "generalFiles", "optimizeImages", "dashed", "useminTrigger"]);
