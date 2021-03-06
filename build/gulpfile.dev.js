var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀
var fileinclude = require('gulp-file-include');
var gulpif = require('gulp-if');
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');

// 排除 js 
var condition = function (f) {
    if (f.path.endsWith('.min.js')) {
        return false;
    }
    return true;
};

//======= gulp dev 开发环境下 ===============
function dev() {
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src)
            .pipe(fileinclude({
                prefix: '@@', //变量前缀 @@include
                basepath: './src/_include', //引用文件路径
                indent: true //保留文件的缩进
            }))
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /** 
     * concat 
     */
    gulp.task('concat:dev', function () {
        gulp.src(Config.html.src)
            .pipe(fileinclude({
                prefix: Config.include.prefix, //变量前缀
                basepath: Config.include.dir, //引用文件路径
                indent: true //保留文件的缩进
            }))
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src)
            .pipe(gulp.dest(Config.css.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
            .pipe(plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            }))
            .pipe(sass())
            .on('error', function (err) {
                gutil.log(gutil.colors.red('[Compilation Error]'));
                gutil.log(gutil.colors.red(err.message));
                this.emit('end');
            })
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /** 
     * js处理 
     */
    // gulp.task('js:dev', function () {
    //     return gulp.src(Config.js.src)
    //     .pipe(gulpif(condition, jshint('.jshintrc')))
    //     .pipe(jshint.reporter('default'))
    //     .pipe(gulp.dest(Config.js.dist)).pipe(reload({
    //         stream: true
    //     }));
    // });

    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src)
            .pipe(gulp.dest(Config.js.dist)).pipe(reload({
                stream: true
            }));
    });

    /** 
     * 图片处理 
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src)
        .pipe(gulp.dest(Config.img.dist))
        .pipe(reload({
            stream: true
        }));
    });

    gulp.task('spritesmith:dev', function () {
        return gulp.src(Config.img.dir + '/icon/*.png') // 需要合并的图片地址
            .pipe(spritesmith({
                imgName: 'images/icons.png', // 保存合并后图片的地址
                cssName: 'css/sprite.css', // 保存合并后对于css样式的地址
                padding: 15, // 合并时两个图片的间距
                algorithm: 'binary-tree'
            }))
            .pipe(gulp.dest(Config.src)).pipe(reload({
                stream: true
            }));
    });

    /**
     * 字体处理
     */
    gulp.task('font:dev', function () {
        return gulp.src(Config.font.src)
            .pipe(gulp.dest(Config.font.dist)).pipe(reload({
                stream: true
            }));
    });


    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev', 'font:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            },
            notify: true
        });
        // Watch .html files  
        gulp.watch(Config.html.src, ['html:dev']);
        gulp.watch(Config.html.dir + '_include/*.html', ['html:dev']);
        // Watch .concat files  
        gulp.watch(Config.html.src, ['concat:dev']);
        // Watch .css files  
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files  
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch assets files  
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files  
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;