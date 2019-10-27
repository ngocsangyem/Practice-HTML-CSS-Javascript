import path from 'path';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;

	gulp.task('eslint', () => {
		gulp.src(`${dirs.source}/**/*.js`)
			.pipe(browserSync.reload({ stream: true, once: true }))
			.pipe(
				$.eslint({
					configFile: './eslintrc.json'
				})
			)
			.pipe($.eslint.format())
			.pipe($.if(!browserSync.active, $.eslint.failAfterError()))
			.on('error', function() {
				if (!browserSync.active) {
					process.exit(1);
				}
			});
	});
}
