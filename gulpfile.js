"use strict";

import { deleteSync } from "del";
import { obj } from "through2";
import newer from "gulp-newer";
import babel from "gulp-babel";
import plumber from "gulp-plumber";
import gulp from "gulp";
import path, { win32 } from "path";

const scripts = "./packages/*/src/**/*.js";
const builds = "./packages/*/build";
const dest = "packages";

let srcEx, libFragment;

if (win32 === path) {
  srcEx = /(packages\\[^\\]+)\\src\\/;
  libFragment = "$1\\build\\";
} else {
  srcEx = new RegExp("(packages/[^/]+)/src/");
  libFragment = "$1/build/";
}

export function build() {
  return gulp
    .src(scripts)
    .pipe(plumber())
    .pipe(
      obj((file, enc, callback) => {
        file._path = file.path;
        file.path = file.path.replace(srcEx, libFragment);
        callback(null, file);
      }),
    )
    .pipe(newer(dest))
    .pipe(
      babel({
        presets: [["@babel/env"], "@babel/react"],
      }),
    )
    .pipe(gulp.dest(dest))
    .on("end", () => {
      console.log(`Finished build`);
    });
}

export function watch() {
  gulp.watch(scripts, { debounceDelay: 200 }, build);
}

export function clean() {
  return deleteSync(builds);
}
