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
    scripts: ['src/scripts/globals.js','src/**/*.js','!src/scripts/bootstrap.js'],
    scriptsTarget: '/scripts',
    copy: ['index.html','src/scripts/bootstrap.js','style.css']
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

gulp.task('copy', ['clean'], function () {
    gulp.src(paths.copy)
        .pipe(gulp.dest(bases.dist));
});

gulp.task('default', ['clean', 'jshint', 'scripts-min','copy']);
