(self["webpackChunktelegram_t"] = self["webpackChunktelegram_t"] || []).push([["Highlight for profile"],{

/***/ "./node_modules/highlight.js/lib/languages/profile.js":
/*!************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/profile.js ***!
  \************************************************************/
/***/ ((module) => {

/*
Language: Python profiler
Description: Python profiler results
Author: Brian Beck <exogen@gmail.com>
*/

function profile(hljs) {
  return {
    name: 'Python profiler',
    contains: [
      hljs.C_NUMBER_MODE,
      {
        begin: '[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}',
        end: ':',
        excludeEnd: true
      },
      {
        begin: '(ncalls|tottime|cumtime)',
        end: '$',
        keywords: 'ncalls tottime|10 cumtime|10 filename',
        relevance: 10
      },
      {
        begin: 'function calls',
        end: '$',
        contains: [ hljs.C_NUMBER_MODE ],
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\\(',
        end: '\\)$',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }
    ]
  };
}

module.exports = profile;


/***/ })

}]);
//# sourceMappingURL=Highlight for profile.1a16917db353963dcf6f.js.map