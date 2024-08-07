(self["webpackChunktelegram_t"] = self["webpackChunktelegram_t"] || []).push([["Highlight for parser3"],{

/***/ "./node_modules/highlight.js/lib/languages/parser3.js":
/*!************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/parser3.js ***!
  \************************************************************/
/***/ ((module) => {

/*
Language: Parser3
Requires: xml.js
Author: Oleg Volchkov <oleg@volchkov.net>
Website: https://www.parser.ru/en/
Category: template
*/

function parser3(hljs) {
  const CURLY_SUBCOMMENT = hljs.COMMENT(
    /\{/,
    /\}/,
    { contains: [ 'self' ] }
  );
  return {
    name: 'Parser3',
    subLanguage: 'xml',
    relevance: 0,
    contains: [
      hljs.COMMENT('^#', '$'),
      hljs.COMMENT(
        /\^rem\{/,
        /\}/,
        {
          relevance: 10,
          contains: [ CURLY_SUBCOMMENT ]
        }
      ),
      {
        className: 'meta',
        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',
        relevance: 10
      },
      {
        className: 'title',
        begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$'
      },
      {
        className: 'variable',
        begin: /\$\{?[\w\-.:]+\}?/
      },
      {
        className: 'keyword',
        begin: /\^[\w\-.:]+/
      },
      {
        className: 'number',
        begin: '\\^#[0-9a-fA-F]+'
      },
      hljs.C_NUMBER_MODE
    ]
  };
}

module.exports = parser3;


/***/ })

}]);
//# sourceMappingURL=Highlight for parser3.cba7305d0b573645cb96.js.map