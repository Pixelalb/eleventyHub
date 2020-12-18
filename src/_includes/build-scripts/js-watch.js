const fs = require('fs');
const path = require('path');
const js = require('uglify-js');

/**
 * Render and save the js to js.
 * @param  {string}  jsPath     The js input path.
 * @param  {string}  jsFilePath  The js output file path.
 */
const buildjs = (jsPath, jsFilePath) => {
  // Render js from js source path.
  // const rendered = js.writeFileSync({ file: jsPath });
  // Save js to output path.

  var code = fs.readFileSync(jsPath, "utf8");

  // UglifyJS.minify(code).code;


  fs.writeFileSync(jsFilePath, code, (writeErr) => {
    if (writeErr) throw writeErr;
    console.log(`Js file saved: ${jsFilePath}`);
  });
};

/**
 * Initialize and watch js for changes requiring a build.
 * @param  {string}  jsPath     The js input path.
 * @param  {string}  jsFilePath  The js output file path.
 */
module.exports = (jsPath, jsFilePath) => {
  // If js output directory doesn't already exist, make it.
  if (!fs.existsSync(path.dirname(jsFilePath))) {
    console.log(`Creating new JS directory: ${path.dirname(jsFilePath)}/`);
    // Create output directory.
    fs.mkdir(path.dirname(jsFilePath), { recursive: true }, (mkdirErr) => {
      if (mkdirErr) throw mkdirErr;
      console.log('js directory created.');
    });
  }
  // Build js on startup.
  buildjs(jsPath, jsFilePath);
  // Watch for changes to js directory.
  fs.watch(path.dirname(jsPath), (evType, filename) => {
    console.log(`js file changed: ${path.dirname(jsPath)}/${filename}`);
    // Rebuild the js.
    buildjs(jsPath, jsFilePath);
  });
};