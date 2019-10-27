import path from 'path';
import fs from 'fs';
import strip from 'gulp-strip-comments';
import stripCssComments from 'gulp-strip-css-comments';

export default function(gulp, $, args, config, taskTarget, browserSync) {
	const dirs = config.directories;
	const url = JSON.parse(fs.readFileSync('./plugins.json'));
	const destJs = `${taskTarget}/${dirs.scripts}`;
	const destCss = `${taskTarget}/${dirs.css}`;

	gulp.task('concatJs', () => {
		return gulp
			.src(url.scripts)
			.pipe($.if(args.production, strip()))
			.pipe($.concat('core.js'))
			.pipe($.if(args.production, $.terser()))
			.pipe(gulp.dest(destJs));
	});

	gulp.task('concatCss', () => {
		return gulp
			.src(url.styles)
			.pipe($.if(args.production, stripCssComments()))
			.pipe($.concat('core.css'))
			.pipe($.if(args.production, $.cssnano()))
			.pipe(gulp.dest(destCss));
	});
}
