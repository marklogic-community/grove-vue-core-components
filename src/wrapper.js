// Import vue component
import mlTreeFacet from './components/ml-tree-facet';
import searchquerybuilder from './components/searchquerybuilder';

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(mlTreeFacet.mlTreeFacet.name, mlTreeFacet.mlTreeFacet);
  Vue.component(mlTreeFacet.mlSubTree.name, mlTreeFacet.mlSubTree);
  Vue.component(
    searchquerybuilder.SearchQueryBuilder.name,
    searchquerybuilder.SearchQueryBuilder
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterQueryText.name,
    searchquerybuilder.SearchQueryFilterQueryText
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterRange.name,
    searchquerybuilder.SearchQueryFilterRange
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterSelection.name,
    searchquerybuilder.SearchQueryFilterSelection
  );
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  /* eslint no-undef: 0 */
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export { searchquerybuilder, mlTreeFacet };
