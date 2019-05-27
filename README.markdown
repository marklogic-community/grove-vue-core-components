# MarkLogic Grove Vue Core Components

This library includes diverse search ui components. The library is part of the MarkLogic Grove project, but could work in any Vue application.

## QuickStart

First, add the `grove-vue-core-components` dependency via npm. (In a Grove Project, you will want to do this inside the `ui` directory, if not already included out of the box.)

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
