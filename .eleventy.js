const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Copiar ficheiros estáticos para a pasta _site
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/json": "json" }); // <-- NOVA LINHA para os .json

  // Markdown personalizado
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",         // Entrada principal do conteúdo
      includes: "_includes",// Layouts e includes
      data: "data",         // Dados globais (JSON, JS)
      output: "_site",      // Saída final
    },
    markdownTemplateEngine: "njk",  // Processa Markdown com Nunjucks
    htmlTemplateEngine: "njk",      // Processa HTML com Nunjucks
    templateFormats: ["html", "md", "njk"], // Tipos de ficheiros a usar
  };
};
