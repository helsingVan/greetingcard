import gulp from 'gulp';			// gulp
import gulpif from 'gulp-if'; 		// gulp语句中作if判断
import concat from 'gulp-concat';   // gulp中处理文件拼接
import webpack from 'webpack';      // 打包工具
import gulpWebpack from 'webpack-stream';	// gulp处理的都是文件流，现在处理都是webpack打包的文件流
import named from 'vinyl-named';	// 文件重命名标志
import livereload from 'gulp-livereload';	// 热更新包
import plumber from 'gulp-plumber';	// 处理文件信息流
import rename from 'gulp-rename';	// 文件重命名包
import uglify from 'gulp-uglify';   // 处理静态文件压缩
import {log,colors} from 'gulp-util';  // 命令行的一些包

import args from './util/args';		// 命令行参数解析包

// gulp一个任务：解析js文件
gulp.task('scripts',()=> {
	return gulp.src(['app/js/index.js'])
		.pipe(plumber({						// 读取文件
			errorHandle:function() {

			}
		}))
		.pipe(named())						// 重命名
		.pipe(gulpWebpack({					// 编译解析打包
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel'
					}
				]
			}
		}),null,(err,stats)=> {
			// 错误处理
			log(`finished '${colors.cyan('scripts')}'`,stats.toString({
				chunks: false
			}))
		})
		.pipe(gulp.dest('server/public/js'))	// 输出路径
		.pipe(rename({							// 重命名
			basename: 'cp',
			extname: '.min.js'
		}))
		.pipe(uglify({							// 压缩
			compress: {properties:false},
			output: {'quote_keys':true}
		}))
		.pipe(gulp.dest('server/public/js'))    // 输出路径
		.pipe(gulpif(args.watch),livereload())  // 热更新
})