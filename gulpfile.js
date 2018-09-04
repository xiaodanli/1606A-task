var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require('gulp-webserver');
var fs = require("fs");
var path = require("path");
var url = require("url");

var data = require("./mork/data.json");
var listJson = require('./mork/list.json');

//编译scss和压缩css
gulp.task('minJs', function() {
    return gulp.src('./src/common/*.js')
        .pipe(uglify())
})

gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"));
});

//监听
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
});

//压缩js
gulp.task("minJs", function() {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./src/common"));
});

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') { return res.end('') }
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/api/data") {
                    res.end(JSON.stringify({ code: 1, mes: data }));
                } else if (pathname === '/api/list') {
                    res.end(JSON.stringify(listJson));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }));
});

gulp.task("dev", gulp.series("sass", "minJs", 'server', "watch"));