(()=>{"use strict";const e=window.wp.data,t=window.gb.stylesBuilder,r=(0,e.createReduxStore)("gb-block-styles-current-style",{reducer:t.currentStyleReducer,actions:t.currentStyleActions,selectors:t.currentStyleSelectors}),s=(0,e.createReduxStore)("gb-block-styles-at-rule",{reducer:t.atRuleReducer,actions:t.atRuleActions,selectors:t.atRuleSelectors}),c=(0,e.createReduxStore)("gb-block-styles-nested-rule",{reducer:t.nestedRuleReducer,actions:t.nestedRuleActions,selectors:t.nestedRuleSelectors}),l=(0,e.createReduxStore)("gb-block-styles",{reducer:t.styleReducer,actions:t.styleActions,selectors:t.styleSelectors});(0,e.register)(r),(0,e.register)(l),(0,e.register)(s),(0,e.register)(c)})();