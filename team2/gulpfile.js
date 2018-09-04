var gulp = require('gulp');
var scss = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minjs = require('gulp-uglify')
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
//读取json文件
var swiperjson = require('./src/data/swiper.json');
gulp.task('devcss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devcss'))
})
gulp.task('devjs', function() {
    return gulp.src('./src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('./bulit'))
})
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }

                var pathname = pathname === '/' ? '/index.html' : pathname
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})
gulp.task('dev', gulp.series('devcss', 'devjs', 'server', 'watch'))