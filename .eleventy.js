const CleanCSS = require('clean-css');
const {minify} = require('terser');
const Nunjucks = require('nunjucks');

module.exports = (eleventyConfig) => {
  // Use nunjucks for templating.
  let nunjucksEnvironment = new Nunjucks.Environment(
      new Nunjucks.FileSystemLoader('src/_includes'));
  eleventyConfig.setLibrary('njk', nunjucksEnvironment);

  // CSS minification.  
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  // JS minification.
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async (code, callback) => {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      callback(null, code); // Fail gracefully.
    }
  });

  // Static files.
  eleventyConfig.addPassthroughCopy('src/files/*.*');
  eleventyConfig.addPassthroughCopy('src/fonts/*.*');
  eleventyConfig.addPassthroughCopy('src/images/**/*.*');
  eleventyConfig.addPassthroughCopy({'src/root': '/'});

  // Show IP address for device testing.
  eleventyConfig.setServerOptions({
    showAllHosts: true,	
  });

  // Configuration options.
  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
  };
};
