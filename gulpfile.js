// import gulp from "gulp";
// import ts from 'gulp-typescript';
// import tsProject from ts.createProject("tsconfig.json");

// var gulp = require("gulp");
// var ts = require('gulp-typescript');
// var tsProject = ts.createProject("tsconfig.json");
// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist"));
// });


// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require("vinyl-source-stream");
// var tsify = require("tsify");
// var paths = {
//     pages: [
//         "src/*.html"
//     ]
// }

// gulp.task("copy-html", function () {
//     return gulp.src(paths.pages)
//     .pipe(gulp.dest("dist"));
// });

// gulp.task("default", ["copy-html"], function () {
//     return browserify({
//         basedir: ".", debug: true, entries: ["src/main.ts"], cache: {}, packageCache: {}
//     })
//     .plugin(tsify)
//     .bundle()
//     .pipe(source("bundle.js"))
//     .pipe(gulp.dest("dist"))
// });

// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require("vinyl-source-stream");
// var watchify = require("watchify");
// var tsify = require("tsify");
// var gutil = require("gulp-util");
// var paths = {
//     pages: [
//         "src/*.html"
//     ]
// }

// var watchedBrowserify = watchify(browserify({
//     basedir: ".",
//     debug: true,
//     entries: ["src/main.ts"],
//     cache: {},
//     packageCache: {}
// }).plugin(tsify));

// gulp.task("copy-html", function () {
//     return gulp.src(paths.pages)
//         .pipe(gulp.dest("dist"));
// });

// function bundle() {
//     return watchedBrowserify
//         .bundle()
//         .pipe(source("bundle.js"))
//         .pipe(gulp.dest("dist"))
// }

// gulp.task("default", ["copy-html"], bundle);
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", gutil.log);

// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require("vinyl-source-stream");
// var watchify = require("watchify");
// var tsify = require("tsify");
// var uglify = require("gulp-uglify");
// var sourceMaps = require("gulp-sourcemaps");
// var buffer = require("vinyl-buffer");
// var gutil = require("gulp-util");
// var paths = {
//     pages: [
//         "src/*.html"
//     ]
// }

// var watchedBrowserify = watchify(browserify({
//     basedir: ".",
//     debug: true,
//     entries: ["src/main.ts"],
//     cache: {},
//     packageCache: {}
// }).plugin(tsify));

// gulp.task("copy-html", function () {
//     return gulp.src(paths.pages)
//         .pipe(gulp.dest("dist"));
// });

// function bundle() {
//     return watchedBrowserify
//         .bundle()
//         .pipe(source("bundle.js"))
//         .pipe(buffer())
//         .pipe(sourceMaps.init({loadMaps: true}))
//         .pipe(uglify())
//         .pipe(sourceMaps.write("./"))
//         .pipe(gulp.dest("dist"))
// }

// gulp.task("default", ["copy-html"], bundle);
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", gutil.log);

var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourceMaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var paths = {
    pages: [
        "src/*.html"
    ]
}

var watchedBrowserify = watchify(browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .transform("babelify", {
            presets: ["es2015"],
            extensions: [".ts"]
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourceMaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest("dist"))
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);