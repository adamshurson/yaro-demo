const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task('default', ['css'], function () {
    gulp.watch(['./tailwind.css', './src/**/*.css'], ['css']);
});
gulp.task('css', function() {
    const postcss = require('gulp-postcss');
    const tailwindcss = require('tailwindcss');
    gulp.src(['./tailwind.css', './src/**/*.css'])
        .pipe(concat('style.css'))
        .pipe(postcss([
            tailwindcss('./tailwind-config.js'),
            require('autoprefixer'),
        ]))
        .pipe(gulp.dest('public/'));
});