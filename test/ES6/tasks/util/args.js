// 处理命令行参数
import yargs from 'yargs';

const args = yargs
	
	// 提取命令行参数
	.option('production',{
		boolean: true,
		default: false,
		describe: 'min all scripts'
	})

	// 实时编译
	.option('watch',{
		boolean: true,
		default: false,
		describe: 'watch all files'
	})

	// log 日志
	.option('verbose',{
		boolean: true,
		default: false,
		describe: 'lop'
	})

	// 映射
	.option('sourcemaps',{
		describe: 'force the creation of sourcemaps'
	})

	// 设置服务端口
	.option('port', {
		string: true,
		default: 8080,
		describe: 'server port'
	})

	// 对命令行输入内容进行字符串形式解析
	.argv