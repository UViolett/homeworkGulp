var gulp = require('gulp'),
    //отлавливает все ошибки
    //plumber = require('gulp-plumber'), - sass нет в папке
    //делает из sass -> css
    //sass = require('gulp-sass'),
    //склеивает файлы js
    imagemin = require('gulp-imagemin'),
    //    imageResize = require('gulp-image-resize'),
    concat = require('gulp-concat'),
    //минимизирует css
    rename = require('gulp-rename'),
    concatCss = require('gulp-concat-css'),
    csso = require('gulp-csso'),
    //генерируется файл-маппер, который содержит информацию об исходных файлах
    sourcemaps = require('gulp-sourcemaps');

/*********************************************
 * Работа с изображениями
 ***********************************************/

gulp.task('imagemin', function () {
    gulp.src('app/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
});

/*********************************************
 * Объединение и минимизация JS
 ***********************************************/

gulp.task('concat', function () {
    return gulp.src('./app/**/*.js')
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('./dist'));
});

/*********************************************
 * Объединение и минимизация CSS
 ***********************************************/

gulp.task('concatCSS', function () {
    return gulp.src('./app/**/*.css')
        .pipe(concatCss('concat.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('csso', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(csso('project.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

//наблюдение за изменениями файлов
gulp.task('watch', function () {
    gulp.watch('app/**/*.css', ['concat']);
    gulp.watch('dist/concat.css', ['csso']);
});
