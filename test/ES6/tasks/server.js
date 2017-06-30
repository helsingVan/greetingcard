import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';    // gulp启动服务器

import args from './util/args';

gulp.task('server',(handle)=> {
	if(!args.watch) {
		return handle();
	}

	let server = liveserver.new(['--harmony','server/bin/www']);
	server.start();

	gulp.watch(['server/public/**/*.js','server/public/**/*.ejs'], (file)=> {
		server.notify.apply(server,[file]);		// 刷新浏览器
	})

	gulp.watch(['server/routes/**/*.js','server/app.js'], ()=>{
		server.start.bind(server)();	// 重启服务器
	})
})