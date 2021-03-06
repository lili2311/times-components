const article = require("../component/article");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.article) {
  const { rootTag, makeArticleUrl, mapArticleToAdConfig } = window.nuk.ssr;
  const { articleId, debounceTimeMs, spotAccountId } = window.nuk.article;

  const data = {
    articleId,
    debounceTimeMs,
    makeArticleUrl,
    mapArticleToAdConfig,
    spotAccountId
  };

  const clientOptions = {
    rootTag,
    useGET: false
  };

  runClient(article, clientOptions, data);
}
