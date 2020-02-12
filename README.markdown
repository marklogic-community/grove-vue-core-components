# MarkLogic Grove Vue Core Components

This library includes diverse search ui components. The library is part of the MarkLogic Grove project, but could work in any Vue application.

## QuickStart SearchQueryBuilder

First, add the `@marklogic-community/grove-vue-core-components` dependency via npm. (In a Grove Project, you will want to do this inside the `ui` directory, if not already included out of the box.)

    npm install --save @marklogic-community/grove-vue-core-components

Then, in your Vue application, import the components you wish to use, and register them either globally or inside the component where you use it:

```javascript
// Either add this to ui/src/main.js to add it globally:
import { searchquerybuilder } from '@marklogic-community/grove-vue-core-components';
Vue.component(searchquerybuilder.SearchQueryBuilder.name, searchquerybuilder.SearchQueryBuilder);

// Or do this in a Vue page/component to add it there only:
import { searchquerybuilder } from '@marklogic-community/grove-vue-core-components';

export default {
  ...,
  components: {
    ...,
    SearchQueryBuilder: searchquerybuilder.SearchQueryBuilder
  },
  methods: {
    apply(query) {
      console.log(query);
    }
  }
  ...
};
```

After that you can start using the directly, which could look for example like this:

```html
            <search-query-builder :apply="apply"></search-query-builder>
```

## QuickStart mlTreeFacet

First, add the `@marklogic-community/grove-vue-core-components` dependency via npm. (In a Grove Project, you will want to do this inside the `ui` directory, if not already included out of the box.)

    npm install --save @marklogic-community/grove-vue-core-components

Then, in your Vue application, import the components you wish to use, and register them either globally or inside the component where you use it:

```javascript
// Either add this to ui/src/main.js to add it globally:
import { mlTreeFacet } from '@marklogic-community/grove-vue-core-components';
Vue.component(mlTreeFacet.mlTreeFacet.name, mlTreeFacet.mlTreeFacet);

// Or do this in a Vue page/component to add it there only:
import { mlTreeFacet } from '@marklogic-community/grove-vue-core-components';

export default {
  ...,
  components: {
    ...,
    mlTreeFacet: mlTreeFacet.mlTreeFacet
  },
  data() {
    return {
      ...,
      nodes: {},
      topNodes: [],
  },
  ...
};
```

After that you can start using the directly, which could look for example like this:

```html
            <ml-tree-facet
              v-if="facet.name === 'MyTreeFacet'"
              :facet="facet"
              :nodes="nodes"
              :start-ids="topNodes"
              :toggle="toggleFacet"
              :negate="toggleNegatedFacet"
            ></ml-tree-facet>
```

To hook it up with the backend:

Download a copy of OntologyApi.js from https://github.com/marklogic-community/grove-vue-core-components/tree/master/src, and drop it into ui/src/api/

Import this api client into the SearchPage:

```javascript
import OntologyApi from '@/api/OntologyApi.js';
```

And hook it up with loading of the page:

```javascript
 created() {
    if (this.isLoggedIn) {
      ...
      let self = this;
      OntologyApi.getHierarchy('MyHierarchy').then(response => {
        self.nodes = response.response.concepts;
        self.topNodes = response.response.topConcepts;
      });
```
