var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
//引入模块
var fs = require('fs');
var path = require('path');
var url = require('url');

var server = require('gulp-webserver');
// console.log(searchjson);
//编译sass  压缩
gulp.task('minCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch', function() {
        return gulp.watch('./src/scss/*.scss', gulp.series('minCss'))
    })
    //压缩js
gulp.task('minjs', function() {
        return gulp.src(['./src/js/**/*.js', '!/src/js/libs/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('./src/bulid'))
    })
    //起服务
gulp.task('devserver', function() {
        return gulp.src('./src')
            .pipe(server({
                port: 8080,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === "/favicon.ico") {
                        res.end("");
                        return;
                    }
                    if (pathname === "/") {
                        res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    }
                }
            }))
    })
    //整合
gulp.task('dev', gulp.series('minCss', 'minjs', 'devserver', 'watch'));