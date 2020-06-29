const fs = require('fs');
const path = require('path');
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  const outputDir = 'dist';
  const assetDir = 'assets';

  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));
  eleventyConfig.addPassthroughCopy({"src/assets/images": `images`});
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  eleventyConfig.addFilter('assetPath', function(value) {
    if (process.env.ELEVENTY_ENV === 'production') {
      const manifestPath = path.resolve(
        __dirname,
        outputDir,
        assetDir,
        'manifest.json'
      );
      const manifest = JSON.parse(fs.readFileSync(manifestPath));
      return manifest[value];
    }
    return `/${assetDir}/${value}`;
  });


  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    passthroughFileCopy: true
  };
};
