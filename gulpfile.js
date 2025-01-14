"use strict";

import { deleteAsync } from "del";
import { obj } from "through2";
import babel from "gulp-babel";
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
    .pipe(
      obj((file, enc, callback) => {
        file._path = file.path;
        file.path = file.path.replace(srcEx, libFragment);
        callback(null, file);
      }),
    )

    .pipe(
      babel({
        presets: [
          ["@babel/env", { targets: { node: 20 }, modules: false }],
          ["@babel/react"],
        ],
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "classic",
              pragma: "utils.renderElement",
            },
          ],
        ],
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
  return deleteAsync(builds);
}
