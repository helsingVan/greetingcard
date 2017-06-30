import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

// 顺序执行编译脚本
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','server']));