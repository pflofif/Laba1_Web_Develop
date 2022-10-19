//Підключаємо gulp
const gulp = require ("gulp");
//додаткові плагіни Gulp
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const cssnano = require("gulp-cssnano");
const autoprefixer = require('gulp-autoprefixer');
//const imagemin = require('gulp-imagemin');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const include = require("gulp-file-include");
const rename = require("gulp-rename"); //перейменування файлів //Створюємо тестовий таск
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

async function html() {
    return gulp.src ('app/**.html')
        .pipe(include({
            prefix: `@@`
        }))
        .pipe(gulp.dest(`dist`));
}
async function scssTask() {
    return gulp.src ("app/scss/**.scss")
        .pipe(concat( 'styles.css'))
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/css"));
}
async function scripts(){
    return gulp.src ("app/js/*.js") //вихідна директорія файлів
        .pipe(concat( 'scripts.js')) // конкатенація js-файлів в один
        .pipe(uglify()) //стиснення коду
        .pipe(rename({suffix: '.min'})) //перейменування файлу з приставкою .min
        .pipe(gulp.dest ("dist/js")); // директорія продакшена
}
async function clear(){
    return gulp.src('dist', {read: false})
        .pipe(clean())
}
async function serve(){
    browserSync.init({
        server : './dist'
    })

    gulp.watch('app/**.html', gulp.series(html)).on('change', browserSync.reload);
    gulp.watch('app/common/**.html', gulp.series(html)).on('change', browserSync.reload);
    gulp.watch('app/scss/**.scss', gulp.series(scssTask)).on('change', browserSync.reload);
    gulp.watch('app/js/**.js', gulp.series(scripts)).on('change', browserSync.reload);
}

exports.clean = gulp.series(clear);
exports.build = gulp.series(scssTask, html, scripts, serve)