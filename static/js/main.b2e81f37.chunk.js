(this["webpackJsonpgeneric-graphql-explorer"]=this["webpackJsonpgeneric-graphql-explorer"]||[]).push([[0],{193:function(e,t,n){e.exports=n(290)},198:function(e,t,n){},286:function(e,t,n){},290:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(42),i=n.n(o),l=(n(198),n(132)),c=n(54),u=n(55),s=n(75),h=n(191),d=n(188),m=n(61),p=n(46),f=n(127),g=n(291),v=n(83),y=n.n(v),E=n(307),b=n(305),k=n(308),S=n(306),C=n(186),w=n(184),x=n(1);function O(e){for(var t=e;Object(x.U)(t);)t=t.ofType;return t}function q(e,t){var n=O(e.type);return!(!n.name.startsWith("GitHub")||!n.name.endsWith("Connection")||"first"!==t.name&&"orderBy"!==t.name)}function T(e,t,n){var a=O(e.type);switch(a.name){case"GitHubRepository":if("name"===t.name)return{kind:"StringValue",value:"graphql-js"};if("owner"===t.name)return{kind:"StringValue",value:"graphql"};break;case"NpmPackage":if("name"===t.name)return{kind:"StringValue",value:"graphql"};break;default:if(Object(x.E)(n)&&a.name.startsWith("GitHub")&&a.name.endsWith("Connection")){if("direction"===t.name&&n.getValues().map((function(e){return e.name})).includes("DESC"))return{kind:"EnumValue",value:"DESC"};if("field"===t.name&&n.getValues().map((function(e){return e.name})).includes("CREATED_AT"))return{kind:"EnumValue",value:"CREATED_AT"}}return y.a.defaultValue(n)}return y.a.defaultValue(n)}n(284),n(285),n(286);var j,P,A,_=["Bearer","Basic","Digest"];function B(e){return"Bearer"===A?P?fetch(j,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(P)},body:JSON.stringify(e)}).then((function(e){return e.text()})).then((function(e){try{return JSON.parse(e)}catch(t){return e}})):Promise.resolve(""):(console.log("'Authentication Method \"".concat(A,'" not yet implemented!')),Promise.resolve(""))}var I=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e))._graphiql=void 0,a.state={query:'# shift-option/alt-click on a query below to jump to it in the explorer\n# option/alt-click on a field in the explorer to select all subfields\nquery MyQuery {\n    organization(slug: "") {\n      name\n      teams(first: 10) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }',explorerIsOpen:!0,show:!1,token:"",endPoint:"",authenticationMethod:_[0]},a._handleInspectOperation=function(e,t){var n=Object(p.a)(a.state.query||"");if(!n)return console.error("Couldn't parse query document"),null;var r=e.getTokenAt(t),o={line:t.line,ch:r.start},i={line:t.line,ch:r.end},l={start:e.indexFromPos(o),end:e.indexFromPos(i)},c=n.definitions.find((function(e){if(!e.loc)return console.log("Missing location information for definition"),!1;var t=e.loc,n=t.start,a=t.end;return n<=l.start&&a>=l.end}));if(!c)return console.error("Unable to find definition corresponding to mouse position"),null;var u="OperationDefinition"===c.kind?c.operation:"FragmentDefinition"===c.kind?"fragment":"unknown",s="OperationDefinition"===c.kind&&c.name||"FragmentDefinition"===c.kind&&c.name?c.name.value:"unknown",h=".graphiql-explorer-root #".concat(u,"-").concat(s),d=document.querySelector(h);d&&d.scrollIntoView()},a._handleEditQuery=function(e){e=e||"",a.setState({query:e})},a._handleToggleExplorer=function(){a.setState({explorerIsOpen:!a.state.explorerIsOpen})},a.handleSelectedMethod=function(e){a.setState({authenticationMethod:e}),A=a.state.authenticationMethod},a._graphiql=new m.a({fetcher:B}),a.handleShowConfig=a.handleShowConfig.bind(Object(s.a)(a)),a.handleSave=a.handleSave.bind(Object(s.a)(a)),a.handleExit=a.handleExit.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleSave",value:function(){var e,t,n;A=(null===(e=this.state)||void 0===e?void 0:e.authenticationMethod)||"",P=(null===(t=this.state)||void 0===t?void 0:t.token)||"",j=(null===(n=this.state)||void 0===n?void 0:n.endPoint)||"","Bearer"===A&&(P.length<40||j.length<10||(this.setState({show:!1}),this.updateSchema()))}},{key:"handleShowConfig",value:function(){this.setState({show:!0})}},{key:"handleExit",value:function(){this.handleSave()}},{key:"onChange",value:function(e){e.preventDefault(),console.log("event.currentTarget.name",e.currentTarget.name),console.log("event.currentTarget.value",e.currentTarget.value),this.setState({[e.currentTarget.name]:e.currentTarget.value})}},{key:"updateSchema",value:function(){var e=this;P&&B({query:Object(f.a)()}).then((function(t){var n=e._graphiql.getQueryEditor();n.setOption("extraKeys",Object(l.a)(Object(l.a)({},n.options.extraKeys||{}),{},{"Shift-Alt-LeftClick":e._handleInspectOperation})),t.data&&e.setState({schema:Object(g.a)(t.data)})}))}},{key:"componentDidMount",value:function(){P?this.updateSchema():this.handleShowConfig()}},{key:"render",value:function(){var e=this,t=this.state,n=t.query,a=t.schema;return r.a.createElement("div",{className:"graphiql-container"},r.a.createElement(E.a,{show:this.state.show,onHide:this.handleSave,onExit:this.handleExit,backdrop:"static",keyboard:!1,centered:!0},r.a.createElement(E.a.Header,{closeButton:!0},r.a.createElement(E.a.Title,null,"Configuration")),r.a.createElement(E.a.Body,null,r.a.createElement(b.a,{className:"mb-3"},r.a.createElement(k.a,{name:"endPoint",placeholder:"Enter GraphQL API Endpoint","aria-label":"Enter GraphQL API Endpoint","aria-describedby":"basic-addon2",value:this.state.endPoint,onChange:function(t){return e.onChange(t)}})),r.a.createElement("br",null),r.a.createElement(b.a,{className:"mb-3"},r.a.createElement(S.a,{id:"authenticationMethods",title:this.state.authenticationMethod,onSelect:this.handleSelectedMethod},_.map((function(e,t){return r.a.createElement(C.a.Item,{key:t,eventKey:e},e)}))),r.a.createElement(k.a,{name:"token",placeholder:"Enter GraphQL API Access Token","aria-label":"Enter GraphQL API Access Token","aria-describedby":"basic-addon2",value:this.state.token,onChange:function(t){return e.onChange(t)}})),r.a.createElement("p",{className:"text-muted"},r.a.createElement("small",null,"Your token will be only shared with the GraphQL endpoint."))),r.a.createElement(E.a.Footer,null,r.a.createElement(w.a,{variant:"primary",onClick:this.handleSave},"Continue"))),r.a.createElement(y.a,{schema:a,query:n,onEdit:this._handleEditQuery,onRunOperation:function(t){return e._graphiql.handleRunQuery(t)},explorerIsOpen:this.state.explorerIsOpen,onToggleExplorer:this._handleToggleExplorer,getDefaultScalarArgValue:T,makeDefaultArg:q}),r.a.createElement(m.a,{ref:function(t){return e._graphiql=t},fetcher:B,schema:a,query:n,response:"No results yet..",onEditQuery:this._handleEditQuery},r.a.createElement(m.a.Toolbar,null,r.a.createElement(m.a.Button,{onClick:function(){return e._graphiql.handlePrettifyQuery()},label:"Prettify",title:"Prettify Query (Shift-Ctrl-P)"}),r.a.createElement(m.a.Button,{onClick:function(){return e._graphiql.handleToggleHistory()},label:"History",title:"Show History"}),r.a.createElement(m.a.Button,{onClick:this._handleToggleExplorer,label:"Explorer",title:"Toggle Explorer"}),r.a.createElement(m.a.Button,{onClick:this.handleShowConfig,label:"Configuration",title:"Change Configuration"}))))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[193,1,2]]]);
//# sourceMappingURL=main.b2e81f37.chunk.js.map