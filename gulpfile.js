            var gulp = require('gulp');

            const {
                src,
                dest,
                parallel,
                series,
            } = require('gulp');

            // Load plugins

            const rename = require('gulp-rename');
            const sass = require('gulp-sass')(require('node-sass'));
            const autoprefixer = require('gulp-autoprefixer');
            const cssnano = require('gulp-cssnano');
            const clean = require('gulp-clean');
            const changed = require('gulp-changed');

            // Clean assets

            function clear() {
                return src('./dist/*', {
                        read: false
                    })
                    .pipe(clean());
            }

            // CSS function 

            function css() {
                const source = './src/scss/main.scss';

                return src(source)
                    .pipe(changed(source))
                    .pipe(sass())
                    .pipe(autoprefixer({
                        overrideBrowserslist: ['last 2 versions'],
                        cascade: false
                    }))
                    .pipe(rename({
                        extname: '.min.css'
                    }))
                    .pipe(cssnano())
                    .pipe(dest('./dist/css/'))
            }

            exports.default = series(clear, parallel(css));