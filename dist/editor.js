(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var r=e.n(t);const n=window.wp.data,o=window.gb.stylesBuilder,l=(0,n.createReduxStore)("gb-block-styles-current-style",{reducer:o.currentStyleReducer,actions:o.currentStyleActions,selectors:o.currentStyleSelectors}),c=(0,n.createReduxStore)("gb-block-styles-at-rule",{reducer:o.atRuleReducer,actions:o.atRuleActions,selectors:o.atRuleSelectors}),a=(0,n.createReduxStore)("gb-block-styles-nested-rule",{reducer:o.nestedRuleReducer,actions:o.nestedRuleActions,selectors:o.nestedRuleSelectors});(0,n.register)(l),(0,n.register)(c),(0,n.register)(a);const s=window.wp.hooks,i=["generateblocks/button","generateblocks/headline","generateblocks/container","generateblocks/grid","generateblocks/image","generateblocks/query-loop"];(0,s.addFilter)("blocks.registerBlockType","generateblocks/disableBlocks",(function(e,t){const r=generateBlocksEditor.useV1Blocks;return i.includes(t)&&!r||!i.includes(t)&&t.startsWith("generateblocks")&&r?{...e,supports:{...e.supports,inserter:!1}}:e}));const d=window.React,L=window.wp.components,u=window.wp.i18n,g=window.wp.blocks,k=window.wp.compose,w=window.wp.blockEditor,p=window.lodash;function b(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z",style:{fillOpacity:.5}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}),(0,d.createElement)("path",{d:"M1.993,9L7.701,9L7.701,10.268L1.993,10.268L1.993,9ZM14.993,13.439L13.725,13.439L13.725,10.268L10.554,10.268L10.554,9L14.359,9C14.709,9 14.993,9.284 14.993,9.634L14.993,13.439ZM13.725,16.292L14.993,16.292L14.993,22L13.725,22L13.725,16.292Z",style:{fillRule:"nonzero"}}))}function h(){return(0,d.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,d.createElement)("path",{d:"M21.375,22L17.625,22L17.625,20.75L20.75,20.75L20.75,17.625L22,17.625L22,21.375C22,21.72 21.72,22 21.375,22ZM9.188,20.75L14.813,20.75L14.813,22L9.188,22L9.188,20.75ZM6.375,22L2.625,22C2.282,22 2,21.718 2,21.375L2,17.625L3.25,17.625L3.25,20.75L6.375,20.75L6.375,22ZM2,9.187L3.25,9.187L3.25,14.812L2,14.812L2,9.187ZM3.25,6.375L2,6.375L2,2.625C2,2.28 2.28,2 2.625,2L6.375,2L6.375,3.25L3.25,3.25L3.25,6.375ZM9.188,2L14.813,2L14.813,3.25L9.188,3.25L9.188,2ZM22,6.375L20.75,6.375L20.75,3.25L17.625,3.25L17.625,2L21.375,2C21.72,2 22,2.28 22,2.625L22,6.375ZM20.75,9.187L22,9.187L22,14.812L20.75,14.812L20.75,9.187Z",style:{fillRule:"nonzero"}}),(0,d.createElement)("path",{d:"M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z"}))}const m=(0,k.createHigherOrderComponent)((e=>t=>{const{name:r}=t,{getBlocksByClientId:o,getSelectedBlockClientIds:l,getBlockRootClientId:c}=(0,n.useSelect)((e=>e("core/block-editor")),[]),{replaceBlocks:a,insertBlocks:i}=(0,n.useDispatch)("core/block-editor"),k=l(),m=k.length?k[0]:t.clientId,y=(e=>{const t=(0,n.useSelect)((t=>t("core/block-editor").getBlock(e)));return t?t.innerBlocks.length:0})(m),f=o(k),E=c(m);if(generateBlocksEditor.useV1Blocks)return(0,d.createElement)(e,{...t});let B="";return"generateblocks/element"!==r||E||0!==y||1!==k.length||(B=(0,d.createElement)(d.Fragment,null,B,(0,d.createElement)(L.ToolbarButton,{icon:b,label:(0,u.__)("Add Inner Container","generateblocks"),onClick:()=>{i((0,g.createBlock)("generateblocks/element",{styles:{maxWidth:"var(--gb-container-width)",marginLeft:"auto",marginRight:"auto"}}),void 0,m)},showTooltip:!0}))),B=(0,d.createElement)(d.Fragment,null,B,(0,d.createElement)(L.ToolbarButton,{icon:h,label:(0,u.__)("Add to Container","generateblocks"),onClick:()=>(()=>{if(!f.length)return;const e=f.map((e=>(0,g.createBlock)(e.name,e.attributes,e.innerBlocks))),t=(0,g.createBlock)("generateblocks/element",{},e);(0,p.isEmpty)(t)||a(k,t)})()})),B=(0,s.applyFilters)("generateblocks.editor.toolbarAppenders",B,t),(0,d.createElement)(d.Fragment,null,!!B&&(0,d.createElement)(w.BlockControls,{group:"parent"},B),(0,d.createElement)(e,{...t}))}),"withToolbarAppenders");function y({size:e,...t}){return(0,d.createElement)("svg",{viewBox:"0 0 256 256",width:e||24,height:e||24,"aria-hidden":"true",focusable:"false",...t},(0,d.createElement)("rect",{width:"256",height:"256",fill:"none"}),(0,d.createElement)("line",{x1:"32",y1:"128",x2:"224",y2:"128",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),(0,d.createElement)("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),(0,d.createElement)("path",{d:"M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}))}function f({value:e,onChange:t}){const r="var(--gb-container-width)";return(0,d.createElement)(L.Tooltip,{text:r===e?(0,u.__)("Remove global max-width","generateblocks"):(0,u.__)("Set global max-width","generateblocks")},(0,d.createElement)(L.Button,{icon:(0,d.createElement)(y,null),variant:r===e?"primary":"",onClick:()=>{t(r===e?"":r)}}))}(0,s.addFilter)("editor.BlockEdit","generateblocks/blockControls/containerAppenders",m),(0,s.addFilter)("generateblocks.control.props","generateblocks/add-global-max-width",(function(e,t){return"maxWidth"!==t.cssProp?e:{...e,overrideAction:t=>(0,d.createElement)(f,{value:e.value,onChange:t}),disabled:"var(--gb-container-width)"===e.value||e.disabled}}));const E=window.wp.apiFetch;var B=e.n(E);(0,s.addFilter)("generateblocks.editor.htmlAttributes.style","generateblocks/styleWithReplacements",(async(e,t)=>{const{context:r}=t;if(!e.includes("{{"))return e;const n=await async function(e,t={}){try{return await B()({path:"/generateblocks/v1/dynamic-tag-replacements",method:"POST",data:{content:e,context:(0,s.applyFilters)("generateblocks.editor.preview.context",t,{content:e})}})}catch(e){return console.error("Error fetching data:",e),""}}(e,r);if(!n.length)return e;return n.reduce(((e,{original:t,replacement:r,fallback:n})=>r?e.replaceAll(t,r):e.replaceAll(t,n)),e)||e})),r()((()=>{const e=new URLSearchParams(window.location.search);e.delete("gb-styles-search"),window.history.replaceState(null,"",`${window.location.pathname}?${e.toString()}`)}))})();