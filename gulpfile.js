var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var bases = {
    app: '/',
    dist: 'dist/'
};

var paths = {
    scripts: ['src/**/*.js','!src/scripts/globals.js'],
    scriptsTarget: '/scripts',
    html: ['index.html']
};

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

gulp.task('jshint', ['clean'], function () {
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts-min', ['clean'], function () {
    gulp.src(paths.scripts)
        .pipe(concat('mag-8.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bases.dist + paths.scriptsTarget));
});

gulp.task('scripts', ['clean'], function () {
    gulp.src(paths.scripts)
        .pipe(concat('mag-8.js'))
        .pipe(gulp.dest(bases.dist + paths.scriptsTarget));
});

gulp.task('default', ['clean', 'jshint', 'scripts', 'scripts-min']);
