(self.webpackChunktelegram_t=self.webpackChunktelegram_t||[]).push([[1348],{30379:e=>{e.exports=function(e){const n={variants:[e.COMMENT("--","$"),e.COMMENT(/\{-/,/-\}/,{contains:["self"]})]},a={className:"meta",begin:/\{-#/,end:/#-\}/},s={className:"meta",begin:"^#",end:"$"},i={className:"type",begin:"\\b[A-Z][\\w']*",relevance:0},t={begin:"\\(",end:"\\)",illegal:'"',contains:[a,s,{className:"type",begin:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},e.inherit(e.TITLE_MODE,{begin:"[_a-z][\\w']*"}),n]},l="([0-9]_*)+",c="([0-9a-fA-F]_*)+",o={className:"number",relevance:0,variants:[{match:`\\b(${l})(\\.(${l}))?([eE][+-]?(${l}))?\\b`},{match:`\\b0[xX]_*(${c})(\\.(${c}))?([pP][+-]?(${l}))?\\b`},{match:"\\b0[oO](([0-7]_*)+)\\b"},{match:"\\b0[bB](([01]_*)+)\\b"}]};return{name:"Haskell",aliases:["hs"],keywords:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",contains:[{beginKeywords:"module",end:"where",keywords:"module where",contains:[t,n],illegal:"\\W\\.|;"},{begin:"\\bimport\\b",end:"$",keywords:"import qualified as hiding",contains:[t,n],illegal:"\\W\\.|;"},{className:"class",begin:"^(\\s*)?(class|instance)\\b",end:"where",keywords:"class family instance where",contains:[i,t,n]},{className:"class",begin:"\\b(data|(new)?type)\\b",end:"$",keywords:"data family type newtype deriving",contains:[a,i,t,{begin:/\{/,end:/\}/,contains:t.contains},n]},{beginKeywords:"default",end:"$",contains:[i,t,n]},{beginKeywords:"infix infixl infixr",end:"$",contains:[e.C_NUMBER_MODE,n]},{begin:"\\bforeign\\b",end:"$",keywords:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",contains:[i,e.QUOTE_STRING_MODE,n]},{className:"meta",begin:"#!\\/usr\\/bin\\/env runhaskell",end:"$"},a,s,{scope:"string",begin:/'(?=\\?.')/,end:/'/,contains:[{scope:"char.escape",match:/\\./}]},e.QUOTE_STRING_MODE,o,i,e.inherit(e.TITLE_MODE,{begin:"^[_a-z][\\w']*"}),n,{begin:"->|<-"}]}}}}]);
//# sourceMappingURL=1348.f655ca346b82779f07c5.js.map
