var gulp = require('gulp');
var Config = require('./gulpfile.config.js');
var spritesmith = require('gulp.spritesmith');

function unit() {
    gulp.task('spritesmith:unit', function () {
        return gulp.src(Config.img.dir + '/icon/*.png') // 需要合并的图片地址
            .pipe(spritesmith({
                imgName: 'images/icons.png', // 保存合并后图片的地址
                cssName: 'css/sprite.css', // 保存合并后对于css样式的地址
                padding: 15, // 合并时两个图片的间距
                algorithm: 'binary-tree'
            }))
            .pipe(gulp.dest(Config.src));
    });
    
    gulp.task('unit', ['spritesmith:unit']);
}

module.exports = unit;