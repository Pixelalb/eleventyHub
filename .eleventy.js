const sassWatch = require('./src/_includes/build-scripts/sass-watch');
const jsWatch = require('./src/_includes/build-scripts/js-watch');
const fs = require('fs');

module.exports = function(eleventyConfig) {
  // maybe have this in external file
  const conf = {
    cname_content: "eleventyhub.com",
    path: {
      source: "./src",
      output: "./public",
      output_build: "./docs/"
    }
  }

  var outputPath = conf.path.output;

  // Copy the `images/` directory
  eleventyConfig.addPassthroughCopy(conf.path.source + "/images");

  // Run only when 11ty is in watch mode.
  if (process.argv.includes('--watch')) {
     // Watch Sass/js directories for updates.
    sassWatch(conf.path.source + '/scss/app.scss', conf.path.output + '/css/app.css');
    jsWatch(conf.path.source +'/js/app.js', conf.path.output + '/js/app.js');

    // Refresh the browser when there are updates in the sass/js directories.
    eleventyConfig.addWatchTarget(conf.path.source + '/scss/');
    eleventyConfig.addWatchTarget(conf.path.source +'/js/');
  }

  if (process.argv.includes('--quiet')) {
    outputPath = conf.path.output_build;

    fs.writeFileSync(outputPath + "CNAME", conf.cname_content, (writeErr) => {
      if (writeErr) throw writeErr;
    });
  }

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  return {
    // passthroughFileCopy: true,
    dir: {
      input: conf.path.source,
      output: outputPath,
      layouts: "_includes/layouts"
    }
  };
};