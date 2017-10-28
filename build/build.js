var fs = require('fs');
var rollup = require('rollup');
var uglify = require('uglify-js');
var buble = require('rollup-plugin-buble');
var package = require('../package.json');
var banner =
    "/*!\n" +
    " * jwt-authenticate v" + package.version + "\n" +
    " * https://github.com/dgrubelic/jwt-authenticate\n" +
    " * Released under the MIT License.\n" +
    " */\n";

rollup.rollup({
  entry: 'src/index.js',
  plugins: [buble()]
})
.then(function (bundle) {
  return write('dist/jwt-authenticate.js', bundle.generate({
    format: 'umd',
    banner: banner,
    moduleName: 'JwtAuthenticate'
  }).code, bundle);
})
.then(function (bundle) {
  return write('dist/jwt-authenticate.min.js',
    banner + '\n' + uglify.minify('dist/jwt-authenticate.js').code,
  bundle);
})
.then(function (bundle) {
  return write('dist/jwt-authenticate.es2015.js', bundle.generate({
    format: 'es',
    banner: banner,
    footer: 'export { JwtAuthenticate };',
  }).code, bundle);
})
.then(function (bundle) {
  return write('dist/jwt-authenticate.common.js', bundle.generate({
    format: 'cjs',
    banner: banner
  }).code, bundle);
})
.catch(logError);

function write(dest, code, bundle) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}