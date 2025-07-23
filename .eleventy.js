const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Copiar ficheiros estáticos para a pasta _site
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/json": "json" });

  // Markdown personalizado
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  // ⚠️ Forçar Eleventy a reconhecer ficheiros .html na raiz de src/
  eleventyConfig.addTemplateFormats("html");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk"], // Já está bem aqui!
  };
};
