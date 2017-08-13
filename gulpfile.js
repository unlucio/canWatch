const nodemon = require('gulp-nodemon');
const gulp = require('gulp');

gulp.task('dev-server', function(end) {
  const envOptions = {
    PORT: process.env.PORT,
    NODE_TLS_REJECT_UNAUTHORIZED: 0
  };

  nodemon({
      script: './src/server/index.js',
      ext: 'js',
      env: envOptions,
      legacyWatch: true
    });

  end();
});
