const jshint = require('gulp-jshint');
const gulp = require('gulp');
const istanbul = require('gulp-babel-istanbul');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

var jsFiles = {
    source: [
        'src/components/*.jsx'

    ]
};

gulp.task('coverage', function (cb) {
    gulp.src('src/**/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src('test/**/*.js')
                .pipe(babel())
                .pipe(injectModules())
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({
                    thresholds: {
                        global: 90
                    }
                }))
                .on('end', cb);
        });
});

gulp.task('lint', function () {
    return gulp.src(['./src/auth/*.js', './src/components/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('eslint', function () {
    return gulp.src(jsFiles.source)
        .pipe(eslint({
            baseConfig: {
                "parserOptions": {
                    "ecmaFeatures": {
                        "jsx": true,
                        "modules": true
                    }
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});