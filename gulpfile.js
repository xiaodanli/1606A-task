var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url')

gulp.task('sass', function() {
    return gulp.src('./team03/src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./team03/src/css/'))
})

gulp.task('watch', function() {
    return gulp.watch('./team03/src/scss/*.scss', gulp.series('sass'))
})

gulp.task('server', function() {
    return gulp.src('./team03/src/')
        .pipe(server({
            port: 6789,
            open: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('')
                    return;
                }

                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'team03/src/', pathname)))
            }
        }))
})
gulp.task('default', gulp.series('sass', 'server', 'watch'))