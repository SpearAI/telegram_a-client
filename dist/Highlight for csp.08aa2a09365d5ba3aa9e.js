(self["webpackChunktelegram_t"] = self["webpackChunktelegram_t"] || []).push([["Highlight for csp"],{

/***/ "./node_modules/highlight.js/lib/languages/csp.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/csp.js ***!
  \********************************************************/
/***/ ((module) => {

/*
Language: CSP
Description: Content Security Policy definition highlighting
Author: Taras <oxdef@oxdef.info>
Website: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

vim: ts=2 sw=2 st=2
*/

/** @type LanguageFn */
function csp(hljs) {
  const KEYWORDS = [
    "base-uri",
    "child-src",
    "connect-src",
    "default-src",
    "font-src",
    "form-action",
    "frame-ancestors",
    "frame-src",
    "img-src",
    "manifest-src",
    "media-src",
    "object-src",
    "plugin-types",
    "report-uri",
    "sandbox",
    "script-src",
    "style-src",
    "trusted-types",
    "unsafe-hashes",
    "worker-src"
  ];
  return {
    name: 'CSP',
    case_insensitive: false,
    keywords: {
      $pattern: '[a-zA-Z][a-zA-Z0-9_-]*',
      keyword: KEYWORDS
    },
    contains: [
      {
        className: 'string',
        begin: "'",
        end: "'"
      },
      {
        className: 'attribute',
        begin: '^Content',
        end: ':',
        excludeEnd: true
      }
    ]
  };
}

module.exports = csp;


/***/ })

}]);
//# sourceMappingURL=Highlight for csp.08aa2a09365d5ba3aa9e.js.map