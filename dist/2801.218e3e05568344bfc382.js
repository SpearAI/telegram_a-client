(self.webpackChunktelegram_t=self.webpackChunktelegram_t||[]).push([[2801],{91496:e=>{function a(e){return e?"string"==typeof e?e:e.source:null}function t(e){return n("(?=",e,")")}function n(...e){return e.map((e=>a(e))).join("")}function i(...e){const t=function(e){const a=e[e.length-1];return"object"==typeof a&&a.constructor===Object?(e.splice(e.length-1,1),a):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>a(e))).join("|")+")"}const s=e=>n(/\b/,e,/\w$/.test(e)?/\b/:/\B/),u=["Protocol","Type"].map(s),c=["init","self"].map(s),r=["Any","Self"],o=["actor","any","associatedtype","async","await",/as\?/,/as!/,"as","break","case","catch","class","continue","convenience","default","defer","deinit","didSet","distributed","do","dynamic","else","enum","extension","fallthrough",/fileprivate\(set\)/,"fileprivate","final","for","func","get","guard","if","import","indirect","infix",/init\?/,/init!/,"inout",/internal\(set\)/,"internal","in","is","isolated","nonisolated","lazy","let","mutating","nonmutating",/open\(set\)/,"open","operator","optional","override","postfix","precedencegroup","prefix",/private\(set\)/,"private","protocol",/public\(set\)/,"public","repeat","required","rethrows","return","set","some","static","struct","subscript","super","switch","throws","throw",/try\?/,/try!/,"try","typealias",/unowned\(safe\)/,/unowned\(unsafe\)/,"unowned","var","weak","where","while","willSet"],l=["false","nil","true"],m=["assignment","associativity","higherThan","left","lowerThan","none","right"],p=["#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warn_unqualified_access","#warning"],d=["abs","all","any","assert","assertionFailure","debugPrint","dump","fatalError","getVaList","isKnownUniquelyReferenced","max","min","numericCast","pointwiseMax","pointwiseMin","precondition","preconditionFailure","print","readLine","repeatElement","sequence","stride","swap","swift_unboxFromSwiftValueWithType","transcode","type","unsafeBitCast","unsafeDowncast","withExtendedLifetime","withUnsafeMutablePointer","withUnsafePointer","withVaList","withoutActuallyEscaping","zip"],F=i(/[/=\-+!*%<>&|^~?]/,/[\u00A1-\u00A7]/,/[\u00A9\u00AB]/,/[\u00AC\u00AE]/,/[\u00B0\u00B1]/,/[\u00B6\u00BB\u00BF\u00D7\u00F7]/,/[\u2016-\u2017]/,/[\u2020-\u2027]/,/[\u2030-\u203E]/,/[\u2041-\u2053]/,/[\u2055-\u205E]/,/[\u2190-\u23FF]/,/[\u2500-\u2775]/,/[\u2794-\u2BFF]/,/[\u2E00-\u2E7F]/,/[\u3001-\u3003]/,/[\u3008-\u3020]/,/[\u3030]/),b=i(F,/[\u0300-\u036F]/,/[\u1DC0-\u1DFF]/,/[\u20D0-\u20FF]/,/[\uFE00-\uFE0F]/,/[\uFE20-\uFE2F]/),h=n(F,b,"*"),f=i(/[a-zA-Z_]/,/[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,/[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,/[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,/[\u1E00-\u1FFF]/,/[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,/[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,/[\u2C00-\u2DFF\u2E80-\u2FFF]/,/[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,/[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,/[\uFE47-\uFEFE\uFF00-\uFFFD]/),w=i(f,/\d/,/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),y=n(f,w,"*"),g=n(/[A-Z]/,w,"*"),E=["autoclosure",n(/convention\(/,i("swift","block","c"),/\)/),"discardableResult","dynamicCallable","dynamicMemberLookup","escaping","frozen","GKInspectable","IBAction","IBDesignable","IBInspectable","IBOutlet","IBSegueAction","inlinable","main","nonobjc","NSApplicationMain","NSCopying","NSManaged",n(/objc\(/,y,/\)/),"objc","objcMembers","propertyWrapper","requires_stored_property_inits","resultBuilder","testable","UIApplicationMain","unknown","usableFromInline"],v=["iOS","iOSApplicationExtension","macOS","macOSApplicationExtension","macCatalyst","macCatalystApplicationExtension","watchOS","watchOSApplicationExtension","tvOS","tvOSApplicationExtension","swift"];e.exports=function(e){const a={match:/\s+/,relevance:0},F=e.COMMENT("/\\*","\\*/",{contains:["self"]}),f=[e.C_LINE_COMMENT_MODE,F],A={match:[/\./,i(...u,...c)],className:{2:"keyword"}},N={match:n(/\./,i(...o)),relevance:0},C=o.filter((e=>"string"==typeof e)).concat(["_|0"]),k={variants:[{className:"keyword",match:i(...o.filter((e=>"string"!=typeof e)).concat(r).map(s),...c)}]},D={$pattern:i(/\b\w+/,/#\w+/),keyword:C.concat(p),literal:l},B=[A,N,k],_=[{match:n(/\./,i(...d)),relevance:0},{className:"built_in",match:n(/\b/,i(...d),/(?=\()/)}],S={match:/->/,relevance:0},M=[S,{className:"operator",relevance:0,variants:[{match:h},{match:`\\.(\\.|${b})+`}]}],x="([0-9]_*)+",$="([0-9a-fA-F]_*)+",I={className:"number",relevance:0,variants:[{match:`\\b(${x})(\\.(${x}))?([eE][+-]?(${x}))?\\b`},{match:`\\b0x(${$})(\\.(${$}))?([pP][+-]?(${x}))?\\b`},{match:/\b0o([0-7]_*)+\b/},{match:/\b0b([01]_*)+\b/}]},O=(e="")=>({className:"subst",variants:[{match:n(/\\/,e,/[0\\tnr"']/)},{match:n(/\\/,e,/u\{[0-9a-fA-F]{1,8}\}/)}]}),L=(e="")=>({className:"subst",match:n(/\\/,e,/[\t ]*(?:[\r\n]|\r\n)/)}),T=(e="")=>({className:"subst",label:"interpol",begin:n(/\\/,e,/\(/),end:/\)/}),P=(e="")=>({begin:n(e,/"""/),end:n(/"""/,e),contains:[O(e),L(e),T(e)]}),j=(e="")=>({begin:n(e,/"/),end:n(/"/,e),contains:[O(e),T(e)]}),K={className:"string",variants:[P(),P("#"),P("##"),P("###"),j(),j("#"),j("##"),j("###")]},z={match:n(/`/,y,/`/)},q=[z,{className:"variable",match:/\$\d+/},{className:"variable",match:`\\$${w}+`}],U=[{match:/(@|#(un)?)available/,className:"keyword",starts:{contains:[{begin:/\(/,end:/\)/,keywords:v,contains:[...M,I,K]}]}},{className:"keyword",match:n(/@/,i(...E))},{className:"meta",match:n(/@/,y)}],Z={match:t(/\b[A-Z]/),relevance:0,contains:[{className:"type",match:n(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/,w,"+")},{className:"type",match:g,relevance:0},{match:/[?!]+/,relevance:0},{match:/\.\.\./,relevance:0},{match:n(/\s+&\s+/,t(g)),relevance:0}]},V={begin:/</,end:/>/,keywords:D,contains:[...f,...B,...U,S,Z]};Z.contains.push(V);const W={begin:/\(/,end:/\)/,relevance:0,keywords:D,contains:["self",{match:n(y,/\s*:/),keywords:"_|0",relevance:0},...f,...B,..._,...M,I,K,...q,...U,Z]},G={begin:/</,end:/>/,contains:[...f,Z]},R={begin:/\(/,end:/\)/,keywords:D,contains:[{begin:i(t(n(y,/\s*:/)),t(n(y,/\s+/,y,/\s*:/))),end:/:/,relevance:0,contains:[{className:"keyword",match:/\b_\b/},{className:"params",match:y}]},...f,...B,...M,I,K,...U,Z,W],endsParent:!0,illegal:/["']/},X={match:[/func/,/\s+/,i(z.match,y,h)],className:{1:"keyword",3:"title.function"},contains:[G,R,a],illegal:[/\[/,/%/]},H={match:[/\b(?:subscript|init[?!]?)/,/\s*(?=[<(])/],className:{1:"keyword"},contains:[G,R,a],illegal:/\[|%/},J={match:[/operator/,/\s+/,h],className:{1:"keyword",3:"title"}},Q={begin:[/precedencegroup/,/\s+/,g],className:{1:"keyword",3:"title"},contains:[Z],keywords:[...m,...l],end:/}/};for(const e of K.variants){const a=e.contains.find((e=>"interpol"===e.label));a.keywords=D;const t=[...B,..._,...M,I,K,...q];a.contains=[...t,{begin:/\(/,end:/\)/,contains:["self",...t]}]}return{name:"Swift",keywords:D,contains:[...f,X,H,{beginKeywords:"struct protocol class extension enum actor",end:"\\{",excludeEnd:!0,keywords:D,contains:[e.inherit(e.TITLE_MODE,{className:"title.class",begin:/[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/}),...B]},J,Q,{beginKeywords:"import",end:/$/,contains:[...f],relevance:0},...B,..._,...M,I,K,...q,...U,Z,W]}}}}]);
//# sourceMappingURL=2801.218e3e05568344bfc382.js.map
