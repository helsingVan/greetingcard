import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';

import args from './util/args';

gulp.task('browser',(handle)=> {
	if(!args.watch) {
		return handle();
	}

	gulp.watch('app/**/*.js',['scripts']);	// app js发生改变。自动调用'scripts'处理脚本
	gulp.watch('app/**/*.ejs',['pages']);
	gulp.watch('app/**/*.css',['css']);
})