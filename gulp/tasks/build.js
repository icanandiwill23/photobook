const gulp     = require("gulp"),
      imagemin = require("gulp-imagemin"),
      del      = require("del"),
      usemin   = require("gulp-usemin"),
      rev      = require("gulp-rev"),
      cssnano  = require("gulp-cssnano"),
      uglify   = require("gulp-uglify"),
      htmlmin  = require("gulp-htmlmin"),
      browserSync  = require("browser-sync").create();

gulp.task("previewDocs", function(){
  browserSync.init({
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task("deleteDocs", ["icons"], function(){
  return del("./docs");
});

gulp.task("generalFiles", ["deleteDocs"], function(){
  let pathsToCopy = [
    "./app/**/*",
    "!./app/assets/images/**/*",
    "!./app/assets/styles/**/*",
    "!./app/assets/scripts/**/*",
    "!./app/temp",
    "!./app/temp/**/*"
  ]
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", ["deleteDocs"], function(){
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
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("dashed", ["optimizeImages"], function(){
  return gulp.src("./app/assets/images/icons/dashed.svg")
    .pipe(gulp.dest("./docs/assets/images/icons"));
});

gulp.task("useminTrigger", ["deleteDocs"], function(){
  gulp.start("usemin");
});

gulp.task("usemin", ["styles", "scripts"], function(){
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function(){ return cssnano() }, function(){ return rev() }],
      html: [function(){ return htmlmin({collapseWhitespace: true}) }],
      js: [function(){ return uglify() }, function(){ return rev()  }]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task("build", ["deleteDocs", "generalFiles", "optimizeImages", "dashed", "useminTrigger"]);
