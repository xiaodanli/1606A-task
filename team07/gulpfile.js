var gulp = require("gulp")
var path = require("path")
var fs = require("fs")
var url = require("url")
var server = require("gulp-webserver")
var datalist = require("./mock/list.json")
var databuttom = require("./mock/buttom.json")

gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 8899,
            middleware: function(req, res, enxt) {
                var pathname = url.parse(req.url).pathname
                if (pathname === "/favicon.ico") {
                    res.end("")
                    return false;
                }

                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, data: datalist }))
                } else if (pathname === "/api/buttom") {
                    res.end(JSON.stringify({ code: 1, data: databuttom.buttom }))
                } else {
                    pathname = pathname === "/" ? "/index.html" : pathname
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})